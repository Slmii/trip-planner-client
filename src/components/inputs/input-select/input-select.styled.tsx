const MuiSelect = require('@material-ui/core/Select').default;
const { withStyles, createStyles } = require('@material-ui/core');

import { Theme } from '@theme/index';

export const Select = withStyles((_theme: Theme) =>
	createStyles({
		root: {
			backgroundColor: 'white'
		}
	})
)(MuiSelect);
