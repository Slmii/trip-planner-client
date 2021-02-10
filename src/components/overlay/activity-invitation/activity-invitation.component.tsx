import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EmailForm, Successful } from '@components/overlay/activity-invitation';
import { useAddInvitationsMutation } from '@generated/graphql';
import { selectActivityInvitation, setActivityInivitation } from '@lib/redux/activityInvitation';
import { helpers } from '@lib/utils';

const ActivityInvitation = () => {
	const dispatch = useDispatch();
	const activityInvitation = useSelector(selectActivityInvitation);
	const { open, size, activity } = activityInvitation;

	const [email, setEmail] = useState('');
	const [emailInvitations, setEmailInvitations] = useState<string[]>([]);
	const [inputFieldError, setInputFieldError] = useState('');
	const [emailsSent, setEmailsSent] = useState(false);

	const [addInvitations, { loading }] = useAddInvitationsMutation();

	const closeDialog = () => {
		dispatch(
			setActivityInivitation({
				...activityInvitation,
				activity: null,
				open: false
			})
		);
		setEmailsSent(false);
		setInputFieldError('');
		setEmailInvitations([]);
	};

	const handleOnDeleteChip = (removeEmail: string) => {
		setEmailInvitations(prevState => [...prevState.filter(email => email !== removeEmail)]);
	};

	const handleOnSendInvitations = async () => {
		// Sent invite to user, insert into prisma Model
		// userId of the invited user
		// activityId of the activity
		// Show in notifications
		// * name of activity creator (can ony create public activities if user has public profile)
		// * activity details
		// * activity type = ACTIVITY_INVITATION,  because email
		// 		 ACTIVITY_JOIN_REQUEST is only when someone requests in the explore page
		// read/unread indicator
		// upon clicking on joining email check if is full or not
		// with requesting check if full or not as well

		if (emailInvitations.length) {
			setInputFieldError('');

			const response = await addInvitations({
				variables: {
					data: {
						activityId: activity?.id ?? 0,
						emails: emailInvitations
					}
				}
			});

			if (!response.errors?.length) {
				setEmailsSent(true);
			} else {
				console.error(response.errors);
			}
		}
	};

	const handleOnAddChip = (e: React.KeyboardEvent<Element>) => {
		if (['Enter', 'Tab', ',', ' '].includes(e.key)) {
			e.preventDefault();

			const error = helpers.isInvitationEmailValid(email, emailInvitations);

			if (error === null) {
				setInputFieldError('');
				setEmailInvitations(prevState => [...prevState, email.toLowerCase()]);
				setEmail('');
			} else {
				setInputFieldError(error);
			}
		}
	};

	return (
		<Modal isCentered onClose={closeDialog} isOpen={open} motionPreset='slideInBottom' size={size}>
			<ModalOverlay />
			<ModalContent>
				{!emailsSent ? (
					<EmailForm
						emailInvitations={emailInvitations}
						value={email}
						maxInvitations={activity?.maxPeople ?? 0}
						error={inputFieldError}
						loading={loading}
						onClose={closeDialog}
						onChipAdd={handleOnAddChip}
						onChipDelete={handleOnDeleteChip}
						onConfirm={handleOnSendInvitations}
						onChange={e => setEmail(e.target.value)}
					/>
				) : (
					<Successful onClose={closeDialog} />
				)}
			</ModalContent>
		</Modal>
	);
};

export default ActivityInvitation;
