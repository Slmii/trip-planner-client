import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const dashboardMenuStyles = makeStyles((theme: Theme) =>
	createStyles({
		onHover: {
			'&:hover': {
				color: `${theme.palette.primary.main} !important`
			}
		},
		textDecorationNone: {
			'&:hover': {
				textDecoration: 'none !important'
			}
		},
		active: {
			color: `${theme.palette.primary.main} !important`
		}
	})
);
