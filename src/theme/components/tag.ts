const sizes = {
	md: {
		container: {
			minH: 7,
			maxH: 7,
			px: '10px',
			fontSize: 'md'
		},
		closeButton: {
			'& > svg': {
				width: 4,
				height: 4,
				bg: 'rgba(0,0,0,0.5)',
				rounded: 'full'
			}
		}
	}
};

const baseStyle = {
	container: {
		bg: 'white'
	},
	closeButton: {
		cursor: 'pointer',
		opacity: 1
	}
};

export default {
	baseStyle,
	sizes
};

// Tag: {
//     parts: string[];
//     variants: {
//         subtle: (props: Record<string, any>) => {
//             container: {
//                 bg: any;
//                 color: any;
//             };
//         };
//         solid: (props: Record<string, any>) => {
//             container: {
//                 bg: any;
//                 color: any;
//             };
//         };
//         outline: (props: Record<string, any>) => {
//             container: {
//                 color: any;
//                 boxShadow: string;
//             };
//         };
//     };
//     baseStyle: {
//         container: {
//             fontWeight: string;
//             lineHeight: number;
//             outline: number;
//             _focus: {
//                 boxShadow: string;
//             };
//         };
//         label: {
//             lineHeight: number;
//         };
//         closeButton: {
//             fontSize: string;
//             w: string;
//             h: string;
//             borderRadius: string;
//             ms: string;
//             me: string;
//             opacity: number;
//             _disabled: {
//                 opacity: number;
//             };
//             _focus: {
//                 boxShadow: string;
//                 bg: string;
//             };
//             _hover: {
//                 opacity: number;
//             };
//             _active: {
//                 opacity: number;
//             };
//         };
//     };
//     sizes: {
//         sm: {
//             container: {
//                 minH: string;
//                 minW: string;
//                 fontSize: string;
//                 px: number;
//                 borderRadius: string;
//             };
//             closeButton: {
//                 me: string;
//                 ms: string;
//             };
//         };
//         md: {
//             container: {
//                 minH: string;
//                 minW: string;
//                 fontSize: string;
//                 borderRadius: string;
//                 px: number;
//             };
//         };
//         lg: {
//             container: {
//                 minH: number;
//                 minW: number;
//                 fontSize: string;
//                 borderRadius: string;
//                 px: number;
//             };
//         };
//     };
//     defaultProps: {
//         size: string;
//         variant: string;
//         colorScheme: string;
//     };
// };
