import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import { createStyles, makeStyles, styled, withStyles } from '@material-ui/core/styles';

import { Theme } from '@theme/index';

export const Accordion = withStyles({
	root: {
		border: '1px solid rgba(0, 0, 0, .125)',
		'&:not(:last-child)': {
			borderBottom: 0
		},
		'&:before': {
			display: 'none'
		},
		'&$expanded': {
			margin: '10px 0'
		}
	},
	expanded: {}
})(MuiAccordion);

export const AccordionSummary = withStyles({
	root: ({ ispage }: { ispage?: string }) => ({
		padding: ispage === 'true' ? 0 : '0 32px',
		'&.Mui-expanded': {
			minHeight: 48
		}
	}),
	content: ({ ispage }: { ispage?: string }) => ({
		margin: ispage === 'true' ? 0 : '12px 0',
		minHeight: 'unset',
		'&.Mui-expanded': {
			margin: 0
		}
	}),
	expandIcon: ({ ispage }: { ispage?: string }) => ({
		position: ispage === 'true' ? 'absolute' : 'unset',
		right: ispage === 'true' ? 32 : 0
	})
})(MuiAccordionSummary);

export const AccordionTitle = styled('div')({
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	display: '-webkit-box',
	'-webkit-box-orient': 'vertical',
	'-webkit-line-clamp': 1
});

export const activityStyles = makeStyles((theme: Theme) =>
	createStyles({
		accordionHeading: {
			fontSize: 16,
			flexShrink: 0,
			textTransform: 'uppercase',
			fontWeight: theme.typography.fontWeightBold
		},
		accordionLocation: {
			flexBasis: '21%'
		},
		accordionDetails: {
			display: 'block',
			paddingBottom: theme.spacing(1),
			paddingTop: theme.spacing(0.5)
		}
	})
);
