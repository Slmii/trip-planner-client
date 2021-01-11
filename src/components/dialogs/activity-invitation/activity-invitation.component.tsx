import MuiDialog from '@material-ui/core/Dialog';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EmailForm, Successful } from '@components/dialogs/activity-invitation';
import { Transition } from '@components/dialogs/dialog';
import { useAddInvitationsMutation } from '@generated/graphql';
import { selectActivityInvitation, setActivityInivitation } from '@lib/redux/activityInvitation';
import { helpers } from '@lib/utils';

const ActivityInvitation = () => {
	const dispatch = useDispatch();
	const activityInvitation = useSelector(selectActivityInvitation);
	const { open, fullWidth, maxWidth, maxInvitations } = activityInvitation;

	const [emailInvitations, setEmailInvitations] = useState<string[]>([]);
	const [inputFieldError, setInputFieldError] = useState('');
	const [emailsSent, setEmailsSent] = useState(false);
	const [expiresAt, setExpiredAt] = useState<Date | null>(null);

	const [addInvitations, { loading }] = useAddInvitationsMutation();

	const closeDialog = () => {
		dispatch(
			setActivityInivitation({
				...activityInvitation,
				open: false
			})
		);
		setEmailsSent(false);
		setExpiredAt(null);
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
			const response = await addInvitations({
				variables: {
					data: {
						activityId: 4,
						emails: emailInvitations
					}
				}
			});

			if (!response.errors?.length) {
				setExpiredAt(response.data?.addInvitations[0].expiresAt);
				setEmailsSent(true);
			} else {
				console.error(response.errors);
			}
		}
	};

	const handleOnAddChip = (inputField: string) => {
		const email = inputField;
		const error = helpers.isInvitationEmailValid(email, emailInvitations);

		if (error === null) {
			setInputFieldError('');
			setEmailInvitations(prevState => [...prevState, email.toLowerCase()]);
		} else {
			setInputFieldError(error);
		}
	};

	return (
		<MuiDialog
			open={open}
			onClose={closeDialog}
			aria-labelledby='activity-invitation-title'
			aria-describedby='activity-invitation-description'
			fullWidth={fullWidth}
			maxWidth={maxWidth}
			TransitionComponent={Transition}
		>
			{!emailsSent ? (
				<EmailForm
					emailInvitations={emailInvitations}
					maxInvitations={maxInvitations}
					error={inputFieldError}
					loading={loading}
					onClose={closeDialog}
					onChipAdd={handleOnAddChip}
					onChipDelete={handleOnDeleteChip}
					onConfirm={handleOnSendInvitations}
				/>
			) : (
				<Successful onClose={closeDialog} expiresAt={expiresAt ?? new Date()} />
			)}
		</MuiDialog>
	);
};

export default ActivityInvitation;
