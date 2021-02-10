const colors = {
	transparent: 'transparent',
	current: 'currentColor',
	black: '#000000',
	text: '#000000',
	white: '#FFFFFF',
	border: '#E2E8F0',
	background: '#FFFFFF',
	action: {
		hover: 'rgba(0, 0, 0, 0.04)',
		hoverOpacity: '0.04',
		selected: 'rgba(0, 0, 0, 0.08)',
		selectedOpacity: '0.08',
		disabled: 'rgba(0, 0, 0, 0.26)',
		disabledBackground: 'rgba(0, 0, 0, 0.12)',
		disabledOpacity: '0.38'
	},
	primary: {
		50: '#e0f9f9',
		100: '#c6e6e6',
		200: '#a8d3d4',
		300: '#89bfc1',
		400: '#69adaf',
		500: '#509496',
		600: '#3c7374',
		700: '#275354',
		800: '#123234',
		900: '#001316'
	},
	secondary: {
		50: '#fff9dc',
		100: '#fbecb2',
		200: '#f6e085',
		300: '#f3d357',
		400: '#efc729',
		500: '#d6ad10',
		600: '#a68708',
		700: '#776003',
		800: '#483a00',
		900: '#1b1300'
	}
};

export type Colors = typeof colors;
export interface ColorHues {
	50: string;
	100: string;
	200: string;
	300: string;
	400: string;
	500: string;
	600: string;
	700: string;
	800: string;
	900: string;
}
export default colors;
