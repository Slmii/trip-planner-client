// const sizes = {
// 	lg: {
// 		height: '45px'
// 	},
// 	md: {
// 		height: '40px'
// 	},
// 	sm: {
// 		height: '33px'
// 	}
// };

const variants = {
	'error-solid': {},
	'error-outlined': {}
};

const defaultProps = {
	variant: 'solid',
	size: 'md',
	colorScheme: 'primary'
};

const baseStyle = {
	borderRadius: 'base'
};

export default {
	baseStyle,
	// sizes,
	variants,
	defaultProps
};
