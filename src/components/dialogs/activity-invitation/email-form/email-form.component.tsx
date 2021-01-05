import React from 'react';
import cn from 'classnames';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';

import InputField from '@components/inputs/input-field';
import Button from '@components/buttons/button';
import { EmailFormProps } from '@components/dialogs/activity-invitation';

import { globalStyles } from '@styles/global-styled';

const EmailForm = ({
	email,
	emailInvitations,
	maxInvitations,
	error,
	onClose,
	onInputChange,
	onChipDelete,
	onInputKeyDown,
	onConfirm
}: EmailFormProps) => {
	const { buttonMr, buttonMb } = globalStyles();

	const hasMaximumInvitations = emailInvitations.length === maxInvitations;

	return (
		<>
			<DialogTitle id='activity-invitation-title'>
				Invite people to join your activity
				<Typography variant='subtitle1'>People who join can see your activity in their upcoming activities list.</Typography>
			</DialogTitle>
			<DialogContent>
				<Box display='flex' flexDirection='column'>
					<InputField
						label='Email address'
						name='emailAdress'
						type='text'
						onChange={onInputChange}
						onKeyDown={onInputKeyDown}
						value={email}
						error={error}
						touched={true}
						disabled={hasMaximumInvitations}
						// eslint-disable-next-line jsx-a11y/no-autofocus
						autoFocus={true}
					/>
					{emailInvitations.length ? (
						<>
							<Box mt={1.5}>
								{emailInvitations.map(email => (
									<Chip
										key={email}
										label={email}
										color='secondary'
										className={cn(buttonMr, buttonMb)}
										size='small'
										onDelete={() => onChipDelete(email)}
									/>
								))}
							</Box>
							<Box mt={0.5} display='flex' alignItems='center'>
								<Typography variant='body1'>
									Invite <Chip label={`${emailInvitations.length}/${maxInvitations}`} color='secondary' size='small' />{' '}
									people.
								</Typography>
							</Box>
						</>
					) : null}
				</Box>
			</DialogContent>
			<Box padding='8px 16px 8px 16px'>
				<DialogActions>
					<Button onClick={onClose} variant='outlined' color='default' fullWidth={false}>
						Cancel
					</Button>
					<Button variant='contained' fullWidth={false} disabled={!emailInvitations.length} onClick={onConfirm}>
						Send invitations
					</Button>
				</DialogActions>
			</Box>
		</>
	);
};

export default EmailForm;
