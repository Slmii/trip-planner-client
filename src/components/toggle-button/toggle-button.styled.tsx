const MuiToggleButtonGroup = require('@material-ui/lab/ToggleButtonGroup').default;
import { Theme as MuiTheme, createStyles, withStyles } from '@material-ui/core/styles';

export const ToggleButtonGroup = withStyles((_theme: MuiTheme) =>
	createStyles({
		root: {
			minHeight: 44,
			backgroundColor: 'white'
		}
	})
)(MuiToggleButtonGroup);
