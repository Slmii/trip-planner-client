const MuiBreadcrumbs = require('@material-ui/core/Breadcrumbs').default;
const { createStyles, makeStyles } = require('@material-ui/core/styles');

import { Theme } from '@theme/index';

export const breadcrumbsStyles = makeStyles((theme: Theme) =>
	createStyles({
		inactive: {
			color: `${theme.palette.action.disabled} !important`,
			opacity: `${theme.palette.action.disabledOpacity} !important`
		},
		hoverOnBreadcrumb: {
			'&:hover': {
				color: `${theme.palette.secondary.main} !important`
			}
		},
		separator: {
			margin: '0 4px'
		}
	})
);
