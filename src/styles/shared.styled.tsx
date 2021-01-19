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
		errorButtonOutlined: {
			backgroundColor: 'white',
			border: `1px solid ${theme.palette.error.light}`,
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
		errorButtonText: {
			color: theme.palette.error.main,
			'&:hover': {
				backgroundColor: 'rgba(237, 73, 73, 0.04)'
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
		iconMb: {
			marginBottom: 8
		},
		iconMt: {
			marginTop: 8
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
		noBorderRadius: {
			borderRadius: 0
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
