const MuiBadge = require('@material-ui/core/Badge').default;
import { styled, Theme as MuiTheme, createStyles, withStyles } from '@material-ui/core/styles';

export const NavbarItem = styled('div')({
	padding: 12,
	cursor: 'pointer',
	position: 'relative'
});

export const ProfileMenu = styled('div')(({ theme }) => ({
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	maxWidth: 150,
	height: 50,
	borderRadius: 4,
	marginLeft: 12,
	padding: '0 15px',
	border: `1px solid ${theme.palette.borderColor}`,
	'&:hover': {
		cursor: 'pointer',
		boxShadow: theme.boxShadow
	}
}));

export const PulseBadge = withStyles(theme =>
	createStyles({
		badge: {
			backgroundColor: theme.palette.secondary.main,
			color: theme.palette.secondary.main,
			boxShadow: `0 0 0 2px ${theme.boxShadow}`,
			'&::after': {
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				borderRadius: '50%',
				animation: '$ripple 1.2s infinite ease-in-out',
				border: '1px solid currentColor',
				content: '""'
			}
		},
		'@keyframes ripple': {
			'0%': {
				transform: 'scale(.8)',
				opacity: 1
			},
			'100%': {
				transform: 'scale(2.4)',
				opacity: 0
			}
		}
	})
)(MuiBadge);

export const Badge = withStyles((theme: MuiTheme) =>
	createStyles({
		badge: {
			right: -10,
			color: theme.palette.secondary.contrastText
		}
	})
)(MuiBadge);
