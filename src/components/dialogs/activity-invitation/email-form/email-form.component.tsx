import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import ChipInput from 'material-ui-chip-input';

import Button from '@components/buttons/button';
import { EmailFormProps } from '@components/dialogs/activity-invitation';

const EmailForm = ({
	emailInvitations,
	maxInvitations,
	error,
	loading,
	onClose,
	onChipAdd,
	onChipDelete,
	onConfirm
}: EmailFormProps) => {
	const hasMaximumInvitations = emailInvitations.length > maxInvitations;

	return (
		<>
			<DialogTitle id='activity-invitation-title'>
				Invite people to join your activity
				<Typography variant='subtitle1'>
					People who join can see your activity in their upcoming activities list.
				</Typography>
			</DialogTitle>
			<DialogContent style={{ overflowY: 'unset' }}>
				<Box display='flex' flexDirection='column'>
					<ChipInput
						value={emailInvitations}
						onAdd={onChipAdd}
						onDelete={onChipDelete}
						newChipKeyCodes={[32, 13, 188, 9]}
						helperText={error ? error : ''}
						error={Boolean(error)}
						variant='outlined'
						label='Email address(es)'
						fullWidth={true}
						blurBehavior='ignore'
						allowDuplicates={true}
						chipRenderer={({ value, text, handleDelete, className }, _key) => (
							<Chip
								key={value}
								label={text}
								color='secondary'
								className={className}
								size='small'
								onDelete={handleDelete}
							/>
						)}
					/>
					{emailInvitations.length ? (
						<Box mt={1.5} display='flex' flexDirection='column'>
							<Typography variant='body1' gutterBottom={hasMaximumInvitations}>
								Invite <Chip label={emailInvitations.length} color='secondary' size='small' />{' '}
								{emailInvitations.length > 1 ? 'people' : 'person'}.{' '}
							</Typography>
							{hasMaximumInvitations && (
								<Typography variant='subtitle1' color='error'>
									Please note that a maximum of {maxInvitations} people can join. If you sent out more
									than {maxInvitations} invitations it will be dealt with on a first come, first
									served basis.
								</Typography>
							)}
						</Box>
					) : null}
				</Box>
			</DialogContent>
			<Box padding='8px 16px 8px 16px'>
				<DialogActions>
					<Button onClick={onClose} variant='outlined' color='default' fullWidth={false}>
						Cancel
					</Button>
					<Button
						variant='contained'
						fullWidth={false}
						onClick={onConfirm}
						loading={loading}
						disabled={!emailInvitations.length}
					>
						Send invitations
					</Button>
				</DialogActions>
			</Box>
		</>
	);
};

export default EmailForm;
