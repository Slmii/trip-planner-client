import { styled } from '@material-ui/core/styles';
const MuiAccordion = require('@material-ui/core/Accordion').default;
const MuiAccordionSummary = require('@material-ui/core/AccordionSummary').default;
const { createStyles, withStyles, makeStyles } = require('@material-ui/core/styles');

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
	root: {
		'& > div:first-child': {
			margin: '12px 0',
			minHeight: 'unset'
		},
		'&$expanded': {
			minHeight: 48
		}
	},
	expanded: {
		minHeight: 48
	}
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
			paddingBottom: 0,
			paddingTop: 8
		}
	})
);
