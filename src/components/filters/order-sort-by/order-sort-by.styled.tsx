const MuiFormControl = require('@material-ui/core/FormControl').default;
const MuiSelect = require('@material-ui/core/Select').default;
const { createStyles, withStyles } = require('@material-ui/core/styles');

import { Theme } from '@theme/index';

export const FormControl = withStyles((_theme: Theme) =>
	createStyles({
		root: {
			minHeight: 44,
			minWidth: 230
		}
	})
)(MuiFormControl);

export const Select = withStyles((_theme: Theme) =>
	createStyles({
		root: {
			backgroundColor: 'white'
		}
	})
)(MuiSelect);
