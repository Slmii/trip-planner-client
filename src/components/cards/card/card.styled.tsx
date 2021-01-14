import { styled } from '@material-ui/core/styles';
import Image from 'next/image';

export const Card = styled('div')(({ theme }) => ({
	display: 'flex',
	width: '100%',
	height: 260,
	borderRadius: `${theme.shape.borderRadius}px`,
	boxShadow: '0 1px 3px 0 rgba(37,32,31,.3)',
	backgroundColor: '#FFFFFF',
	marginBottom: 20,
	transition: 'all 0.1s ease-out',
	'&.selected-card': {
		// transform: 'translateX(15px)',
		zIndex: 2
	},
	'&:hover': {
		boxShadow: '0 0 11px rgba(37,32,31,.3)'
	}
}));

export const CardHeader = styled('div')(({ theme }) => ({
	position: 'relative',
	width: 600,
	height: '100%',
	overflow: 'hidden',
	backgroundColor: theme.palette.primary.light,
	borderTopLeftRadius: `${theme.shape.borderRadius}px`,
	borderBottomLeftRadius: `${theme.shape.borderRadius}px`
}));

export const Img = styled(Image)({
	width: '100%'
	// height: 250
});

export const Description = styled('div')({
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	display: '-webkit-box',
	'-webkit-box-orient': 'vertical',
	'-webkit-line-clamp': 1
});
