import { styled } from '@material-ui/core/styles';

export const Footer = styled('footer')(({ theme }) => ({
	width: '100%',
	height: 300,
	fontSize: 14,
	marginTop: 200,
	backgroundColor: theme.palette.text.primary,
	color: '#FFFFFF'
}));

export const FooterContent = styled('div')(props => ({
	display: 'flex',
	alignItems: 'center',
	margin: '0 auto',
	height: '100%',
	minWidth: '20.85714rem',
	maxWidth: '79.42857rem'
}));
