import MuiBadge from '@material-ui/core/Badge';
import { createStyles, withStyles } from '@material-ui/core/styles';

export const UnreadNotificationBadge = withStyles(theme =>
	createStyles({
		badge: {
			backgroundColor: theme.palette.secondary.main,
			color: theme.palette.secondary.main,
			boxShadow: `0 0 0 2px ${theme.boxShadow}`,
			// bottom: 13,
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

export const ReadNotificationBadge = withStyles(theme =>
	createStyles({
		badge: {
			backgroundColor: theme.palette.action.disabled,
			color: theme.palette.action.disabled
		}
	})
)(MuiBadge);
