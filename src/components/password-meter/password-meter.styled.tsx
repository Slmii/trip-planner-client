import styled from '@emotion/styled';

import theme from '@theme/index';

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #ffffff;
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
		background-color: ${theme.colors.red[500]};
		width: 25%;
	}

	&[value='3'] {
		background-color: ${theme.colors.orange[500]};
		width: 50%;
	}

	&[value='4'] {
		background-color: ${theme.colors.orange[500]};
		width: 75%;
	}

	&[value='5'] {
		background-color: ${theme.colors.primary[500]};
		width: 100%;
	}
`;
