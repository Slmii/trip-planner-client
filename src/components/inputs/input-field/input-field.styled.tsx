import MuiTextField from '@material-ui/core/TextField';
const { withStyles, createStyles } = require('@material-ui/core');

import { Theme } from '@theme/index';

export const TextField = withStyles((theme: Theme) =>
	createStyles({
		root: {
			backgroundColor: 'white'
		}
	})
)(MuiTextField);
