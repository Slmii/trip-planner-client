import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const AccountTitle = ({ title, subTitle }: { title: string; subTitle?: string }) => {
	return (
		<Box mb={2}>
			<Typography variant='h5' component='h1'>
				{title} {subTitle && <Typography variant='overline'>{subTitle}</Typography>}
			</Typography>
		</Box>
	);
};

export default AccountTitle;
