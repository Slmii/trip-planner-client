import { styled } from '@material-ui/core/styles';

export const Divider = styled('div')(({ theme }) => ({
	textAlign: 'center',
	width: '100%',
	borderBottom: `1px solid ${theme.palette.borderColor}`,
	lineHeight: '0.1rem',
	margin: '10px 0'
}));

export const DividerWithText = styled('span')({
	backgroundColor: '#ffffff',
	padding: '0 10px',
	fontSize: 12
});
