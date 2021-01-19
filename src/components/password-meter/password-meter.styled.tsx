import styled from 'styled-components';

import theme from '@theme/index';

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	background-color: ${theme.palette.background.default};
	height: 5px;
	width: 100%;
`;

export const StrengthMeter = styled.span<{ value: string }>`
	height: 5px;
	transition: width 0.2s;

	&[value='1'] {
		background-color: transparent;
		width: 0;
	}

	&[value='2'] {
		background-color: ${theme.palette.error.main};
		width: 25%;
	}

	&[value='3'] {
		background-color: ${theme.palette.warning.main};
		width: 50%;
	}

	&[value='4'] {
		background-color: ${theme.palette.warning.main};
		width: 75%;
	}

	&[value='5'] {
		background-color: ${theme.palette.success.main};
		width: 100%;
	}
`;
