import { makeStyles, Theme, createStyles } from '@material-ui/core';

export const successfullStyles = makeStyles((_theme: Theme) =>
	createStyles({
		check: {
			display: 'inline-block',
			transform: 'rotate(45deg)',
			height: 60,
			width: 25,
			borderBottom: '7px solid white',
			borderRight: '7px solid white',
			marginTop: 7
		}
	})
);
