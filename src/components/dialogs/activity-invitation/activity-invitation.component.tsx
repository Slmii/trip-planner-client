import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const MuiDialog = require('@material-ui/core/Dialog').default;

import { EmailForm, Successful } from '@components/dialogs/activity-invitation';
import { Transition } from '@components/dialogs/dialog';
import { selectActivityInvitation, setActivityInivitation } from '@lib/redux/activityInvitation';

import { helpers } from '@lib/utils';

const ActivityInvitation = () => {
	const dispatch = useDispatch();
	const activityInvitation = useSelector(selectActivityInvitation);
	const { open, fullWidth, maxWidth, maxInvitations } = activityInvitation;

	const [emailInvitations, setEmailInvitations] = useState<string[]>([]);
	const [inputField, setInputField] = useState('');
	const [inputFieldError, setInputFieldError] = useState('');
	const [emailsSent, setEmailsSent] = useState(false);

	const handleOnClose = () => {
		closeDialog();
	};

	const closeDialog = () => {
		dispatch(
			setActivityInivitation({
				...activityInvitation,
				open: false
			})
		);
		setInputField('');
		setEmailsSent(false);
		setEmailInvitations([]);
	};

	const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputField(e.target.value);
	};

	const handleOnDeleteChip = (removeEmail: string) => {
		setEmailInvitations(prevState => [...prevState.filter(email => email !== removeEmail)]);
	};

	const handleOnInputKeyDown = (e: React.KeyboardEvent) => {
		if (['Enter', 'Tab', ',', ' '].includes(e.key)) {
			e.preventDefault();

			const email = inputField;
			const error = helpers.isInvitationEmailValid(email, emailInvitations);

			if (error === null) {
				setInputFieldError('');
				setInputField('');
				setEmailInvitations(prevState => [...prevState, email]);
			} else {
				setInputFieldError(error);
			}
		}
	};

	const handleOnSendInvitations = () => {
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

		setEmailsSent(true);
	};

	return (
		<MuiDialog
			open={open}
			onClose={handleOnClose}
			aria-labelledby='activity-invitation-title'
			aria-describedby='activity-invitation-description'
			fullWidth={fullWidth}
			maxWidth={maxWidth}
			TransitionComponent={Transition}
		>
			{!emailsSent ? (
				<EmailForm
					email={inputField}
					emailInvitations={emailInvitations}
					maxInvitations={maxInvitations}
					error={inputFieldError}
					onClose={handleOnClose}
					onInputChange={handleOnInputChange}
					onInputKeyDown={handleOnInputKeyDown}
					onChipDelete={handleOnDeleteChip}
					onConfirm={handleOnSendInvitations}
				/>
			) : (
				<Successful onClose={handleOnClose} />
			)}
		</MuiDialog>
	);
};

export default ActivityInvitation;
