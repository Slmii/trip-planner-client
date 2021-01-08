import { styled } from '@material-ui/core/styles';

import theme from '@theme/index';

// export const Dropdown = styled('div')(({ theme }) => ({
// 	display: 'flex',
// 	position: 'absolute',
// 	zIndex: 999,
// 	marginTop: 35,
// 	top: '50%',
// 	right: 50,
// 	width: 250,
// 	maxHeight: 250,
// 	backgroundColor: '#FFFFFF',
// 	borderRadius: theme.shape.borderRadius,
// 	boxShadow: theme.boxShadow
// }));

export const DropdownItems = styled('div')({
	display: 'flex',
	width: 250,
	maxHeight: 250,
	flexDirection: 'column',
	margin: '10px 0px'
});

export const DropdownItem = styled('a')({
	width: '100%',
	padding: '10px 25px',
	cursor: 'pointer',
	fontSize: 14,
	'&:hover': {
		backgroundColor: theme.palette.action.hover,
		textDecoration: 'none'
	}
});
