import { styled } from '@material-ui/core/styles';

export const Content = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	backgroundColor: theme.palette.background.default,
	height: 5,
	width: '100%'
}));

export const StrengthMeter = styled('span')(({ theme }) => ({
	height: 5,
	transition: 'width 0.2s',
	'&[value="1"]': {
		backgroundColor: 'transparant',
		width: '0%'
	},
	'&[value="2"]': {
		backgroundColor: theme.palette.error.main,
		width: '25%'
	},
	'&[value="3"]': {
		backgroundColor: theme.palette.warning.main,
		width: '50%'
	},
	'&[value="4"]': {
		backgroundColor: theme.palette.warning.main,
		width: '75%'
	},
	'&[value="5"]': {
		backgroundColor: theme.palette.success.main,
		width: '100%'
	}
}));

// export const StrengthLabel = styled.div<{ value: string }>`
// 	position: absolute;
// 	right: 0px;
// 	font-size: 12px;
// 	font-weight: 550;
// 	margin-top: 5px;
// 	&[value='1'],
// 	&[value='2'] {
// 		color: ${({ theme }: Theme) => theme.palette.error.main};
// 	}
// 	&[value='3'] {
// 		color: ${({ theme }: Theme) => theme.palette.warning.main};
// 	}
// 	&[value='4'] {
// 		color: ${({ theme }: Theme) => theme.palette.warning.main};
// 	}
// 	&[value='5'] {
// 		color: ${({ theme }: Theme) => theme.palette.success.main};
// 	}
// `;
