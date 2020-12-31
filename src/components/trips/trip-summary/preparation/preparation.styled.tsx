const { createStyles, makeStyles } = require('@material-ui/core/styles');

import { Theme } from '@theme/index';

export const activityStyles = makeStyles((theme: Theme) =>
	createStyles({
		preparationHeading: {
			fontSize: 16,
			flexShrink: 0,
			textTransform: 'uppercase',
			fontWeight: theme.typography.fontWeightBold
		},
		preparationComplete: {
			textDecoration: 'line-through',
			textDecorationColor: theme.palette.text.primary,
			color: theme.palette.text.disabled
		}
	})
);
