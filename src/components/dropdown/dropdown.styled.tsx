import { styled } from '@material-ui/core/styles';

export const Dropdown = styled('div')(({ theme }) => ({
	display: 'flex',
	position: 'absolute',
	zIndex: 999,
	marginTop: 35,
	top: '50%',
	right: 12,
	width: 250,
	maxHeight: 250,
	backgroundColor: '#FFFFFF',
	borderRadius: theme.shape.borderRadius,
	boxShadow: theme.boxShadow
}));

export const DropdownItems = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	margin: '10px 0px'
});

export const DropdownItem = styled('a')({
	width: '100%',
	padding: '10px 25px',
	'&:hover': {
		backgroundColor: '#F7F7F7',
		textDecoration: 'none'
	}
});
