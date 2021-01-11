import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const iconButtonStyles = makeStyles((theme: Theme) =>
	createStyles({
		isDisabled: {
			color: theme.palette.action.disabled,
			opacity: theme.palette.action.disabledOpacity
		}
	})
);
