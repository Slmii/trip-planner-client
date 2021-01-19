import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

import theme from '@theme/index';

export const MarkAllAsRead = styled(Typography)`
	color: ${theme.palette.secondary.main};
	font-weight: ${theme.typography.caption.fontWeight};
	line-height: ${theme.typography.caption.lineHeight};
	font-family: ${theme.typography.caption.fontFamily};

	&:hover {
		color: ${theme.palette.secondary.dark};
	}
`;
