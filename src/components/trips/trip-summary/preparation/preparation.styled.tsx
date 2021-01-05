import { makeStyles, createStyles } from '@material-ui/core';

import { Theme } from '@theme/index';

export const activityStyles = makeStyles((theme: Theme) =>
	createStyles({
		preparationHeading: {
			fontSize: 16,
			flexShrink: 0,
			textTransform: 'uppercase',
			fontWeight: theme.typography.fontWeightBold,
			marginRight: theme.spacing(0.5)
		},
		preparationComplete: {
			textDecoration: 'line-through',
			textDecorationColor: theme.palette.text.primary,
			color: theme.palette.text.disabled
		},
		subPreparationHeading: {
			fontSize: 14,
			flexShrink: 0,
			fontWeight: theme.typography.fontWeightBold
		},
		nested: {
			paddingLeft: theme.spacing(4)
		},
		listItemIcon: {
			minWidth: 46
		}
	})
);
