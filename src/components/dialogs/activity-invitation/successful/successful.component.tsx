import Box from '@material-ui/core/Box';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import Button from '@components/buttons/button';
import { date } from '@lib/utils';

import theme from '@theme/index';

import { successfullStyles } from './successfull.styled';

const Successful = ({ onClose }: { onClose: () => void }) => {
	const { check } = successfullStyles();

	return (
		<>
			<DialogTitle id='activity-invitation-title'>
				Invitations are sent succesfully!
				<Typography variant='subtitle1'>
					Invitations are valid for one hour and will expire after{' '}
					{date.formatDate({
						date: date.addUnitToCurrentDate(1, 'hour'),
						format: 'HH:mm'
					})}
					.
				</Typography>
			</DialogTitle>
			<DialogContent>
				<Box
					bgcolor={theme.palette.success.main}
					display='flex'
					justifyContent='center'
					p={0.5}
					width='100px'
					height='100px'
					borderRadius='50px'
					margin='0 auto'
				>
					<Box className={check} />
				</Box>
			</DialogContent>
			<Box padding='8px 16px 8px 16px'>
				<DialogActions>
					<Button variant='contained' fullWidth={false} onClick={onClose}>
						Close
					</Button>
				</DialogActions>
			</Box>
		</>
	);
};

export default Successful;
