const baseStylePopper = {
	w: '100%',
	maxW: 'xs'
};

const baseStyle = props => ({
	content: {
		borderRadius: 'base',
		boxShadow: 'base'
	},
	popper: {
		zIndex: 10,
		maxW: props.width ? props.width : 'xs',
		w: '100%'
	},
	body: {
		p: 0
	}
});

export default {
	parts: ['popper'],
	baseStyle
};

// Popover: {
//     parts: string[];
//     baseStyle: (props: Record<string, any>) => {
//         popper: {
//             w: string;
//             maxW: string;
//             zIndex: number;
//         };
//         content: {
//             bg: any;
//             border: string;
//             borderColor: string;
//             borderRadius: string;
//             boxShadow: string;
//             zIndex: string;
//             _focus: {
//                 outline: number;
//                 boxShadow: string;
//             };
//         };
//         header: {
//             px: number;
//             py: number;
//             borderBottomWidth: string;
//         };
//         body: {
//             px: number;
//             py: number;
//         };
//         footer: {
//             px: number;
//             py: number;
//             borderTopWidth: string;
//         };
//         arrow: {
//             bg: any;
//         };
//     };
// };
