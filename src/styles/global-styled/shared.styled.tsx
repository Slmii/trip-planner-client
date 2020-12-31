import { createStyles, makeStyles, styled } from '@material-ui/core/styles';

import { Theme } from '@theme/index';

// import { device } from '../device.sizes';

export const Content = styled('div')(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	margin: '0 auto',
	marginTop: 80,
	border: `1px solid ${theme.palette.borderColor}`,
	borderRadius: theme.shape.borderRadius,
	padding: 30,
	width: 450,
	backgroundColor: 'white',
	boxShadow: theme.boxShadow
}));

export const globalStyles = makeStyles((theme: Theme) =>
	createStyles({
		transparantOverlay: {
			animation: 'show-underlay .25s ease-in-out',
			display: 'block',
			backgroundColor: 'rgba(0,0,0)',
			height: '100%',
			left: 0,
			opacity: '.5',
			position: 'fixed',
			top: 0,
			width: '100%'
		},
		errorButtonOutlined: {
			backgroundColor: 'white',
			borderColor: theme.palette.error.light,
			color: theme.palette.error.main,
			'&:hover': {
				borderColor: theme.palette.error.main
			}
		},
		errorButtonContained: {
			backgroundColor: theme.palette.error.main,
			borderColor: theme.palette.error.main,
			color: 'white',
			'&:hover': {
				borderColor: theme.palette.error.dark,
				backgroundColor: theme.palette.error.dark
			}
		},
		errorChipContained: {
			backgroundColor: theme.palette.error.main,
			borderColor: theme.palette.error.main,
			color: 'white',
			'&:hover': {
				borderColor: theme.palette.error.dark,
				backgroundColor: theme.palette.error.dark
			},
			'&:focus': {
				borderColor: theme.palette.error.dark,
				backgroundColor: theme.palette.error.dark
			}
		},
		iconMr: {
			marginRight: 8
		},
		iconMl: {
			marginLeft: 8
		},
		buttonMr: {
			marginRight: 8
		},
		buttonMt: {
			marginTop: 8
		},
		buttonMb: {
			marginBottom: 8
		},
		buttonMl: {
			marginLeft: 8
		},
		divider: {
			margin: '20px 0'
		},
		avatarSmall: {
			'& > *': {
				width: theme.spacing(2),
				height: theme.spacing(2),
				fontSize: 16
			}
		},
		avatarLarge: {
			'& > *': {
				width: theme.spacing(7),
				height: theme.spacing(7),
				fontSize: 54
			}
		},
		bold: {
			fontWeight: theme.typography.fontWeightBold
		},
		primary: {
			color: theme.palette.primary.dark
		},
		secondary: {
			color: theme.palette.secondary.dark
		},
		error: {
			color: theme.palette.error.dark
		},
		success: {
			color: theme.palette.success.dark
		},
		warning: {
			color: theme.palette.warning.dark
		},
		activeButton: {
			borderColor: theme.palette.text.primary
		},
		noPadding: {
			padding: 0
		}
	})
);

/* display: flex;
	justify-content: center;
	margin: 0 auto;
	margin-top: 80px;
	border: 1px solid ${({ theme }: Theme) => theme.border};
	background-color: #ffffff;
	border-radius: ${({ theme }: Theme) => `${theme.shape.borderRadius}px`};
	padding: 30px;
	width: 450px;
	box-shadow: ${({ theme }: Theme) => theme.boxShadow};

	@media (min-width: ${device.mobileS}) and (max-width: ${device.mobileL}) {
		width: 90%;
	} */
// `;
