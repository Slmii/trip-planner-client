const MuiSnackbar = require('@material-ui/core/Snackbar').default;
import { withStyles, createStyles, makeStyles } from '@material-ui/core';

import { Theme } from '@theme/index';

export const Snackbar = withStyles((_theme: Theme) =>
	createStyles({
		root: {
			top: 100
		}
	})
)(MuiSnackbar);

export const snackbarStyles = makeStyles((theme: Theme) =>
	createStyles({
		undoErrorColor: {
			color: 'rgb(94, 29, 29)'
		}
	})
);
