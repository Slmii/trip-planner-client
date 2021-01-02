import { styled } from '@material-ui/core/styles';

export const Content = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	backgroundColor: theme.palette.background.default,
	height: 5,
	width: '100%'
}));

export const StrengthMeter = styled('span')(({ theme }) => ({
	height: 5,
	transition: 'width 0.2s',
	'&[value="1"]': {
		backgroundColor: 'transparant',
		width: '0%'
	},
	'&[value="2"]': {
		backgroundColor: theme.palette.error.main,
		width: '25%'
	},
	'&[value="3"]': {
		backgroundColor: theme.palette.warning.main,
		width: '50%'
	},
	'&[value="4"]': {
		backgroundColor: theme.palette.warning.main,
		width: '75%'
	},
	'&[value="5"]': {
		backgroundColor: theme.palette.success.main,
		width: '100%'
	}
}));
