const MuiSnackbar = require('@material-ui/core/Snackbar').default;
const { withStyles, createStyles } = require('@material-ui/core');

import { Theme } from '@theme/index';

export const Snackbar = withStyles((_theme: Theme) =>
	createStyles({
		root: {
			top: 100
		}
	})
)(MuiSnackbar);
