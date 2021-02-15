import spacing from '@theme/spacing';

const baseStyle = {
	container: {
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderWidth: '1px',
		borderColor: 'border',
		_last: {
			borderBottomWidth: 0,
			borderBottomLeftRadius: 'base',
			borderBottomRightRadius: 'base'
		},
		boxShadow: 'base',
		_first: {
			borderTopLeftRadius: 'base',
			borderTopRightRadius: 'base'
		}
	},
	button: {
		p: spacing.INNER_PADDING,
		_hover: {
			bg: 'gray.100'
		}
	},
	panel: {
		p: spacing.INNER_PADDING
	}
};

export default {
	baseStyle
};

// Accordion: {
//     parts: string[];
//     baseStyle: {
//         container: {
//             borderTopWidth: string;
//             borderColor: string;
//             _last: {
//                 borderBottomWidth: string;
//             };
//         };
//         button: {
//             fontSize: string;
//             _focus: {
//                 boxShadow: string;
//             };
//             _hover: {
//                 bg: string;
//             };
//             _disabled: {
//                 opacity: number;
//                 cursor: string;
//             };
//             px: number;
//             py: number;
//         };
//         panel: {
//             pt: number;
//             px: number;
//             pb: number;
//         };
//     };
// };
