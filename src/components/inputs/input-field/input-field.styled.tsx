const MuiTextField = require('@material-ui/core/TextField').default;
const { withStyles, createStyles } = require('@material-ui/core');

import { Theme } from '@theme/index';

export const TextField = withStyles((theme: Theme) =>
	createStyles({
		root: {
			backgroundColor: 'white'
		}
	})
)(MuiTextField);
