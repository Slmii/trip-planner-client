import { styled } from '@material-ui/core/styles';

export const Filters = styled('div')(({ theme }) => ({
	display: 'flex',
	marginBottom: 20,
	'& > *': {
		marginRight: theme.spacing(1),
		width: '20%',
		'&:last-of-type': {
			marginRight: 0
		}
	}
}));
