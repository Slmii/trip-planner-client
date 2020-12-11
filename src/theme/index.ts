import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme({
	palette: {
		primary: {
			main: '#3885E9'
		},
		secondary: {
			main: '#4A898B'
		},
		error: {
			main: '#ED4949'
		},
		success: {
			main: '#4A8B7D'
		},
		background: {
			default: '#F9FAFC'
		},
		text: {
			primary: '#444444'
		},
		action: {
			disabled: '#AAA',
			disabledBackground: '#EEE'
		},
		divider: '#DDD',
		borderColor: '#DDD',
		borderHover: '#BBB',
		// Used by `getContrastText()` to maximize the contrast between
		// the background and the text.
		contrastThreshold: 3,
		// Used by the functions below to shift a color's luminance by approximately
		// two indexes within its tonal palette.
		// E.g., shift from Red 500 to Red 300 or Red 700.
		tonalOffset: 0.2
	},
	typography: {
		fontFamily: '"Cairo", serif',
		fontSize: 16,
		fontWeightLight: 400,
		fontWeightRegular: 500,
		fontWeightBold: 600,
		htmlFontSize: 16,
		button: {
			textTransform: 'none'
		},
		subtitle1: {
			fontSize: 14,
			fontWeight: 600
		},
		subtitle2: {
			fontSize: 12,
			fontWeight: 550,
			opacity: 0.6
		}
	},
	shape: {
		borderRadius: 4
	},
	boxShadow: '0 2px 4px 0 rgba(17,34,68,0.4)',
	spacing: 16,
	overrides: {
		MuiButton: {
			containedSizeLarge: {
				minHeight: 45
			},
			containedSizeSmall: {
				minHeight: 33
			},
			contained: {
				minHeight: 40
			},
			outlinedSizeLarge: {
				minHeight: 45
			},
			outlinedSizeSmall: {
				minHeight: 33
			},
			outlined: {
				minHeight: 40
			}
		}
	}
});

theme = responsiveFontSizes(theme);

export type Theme = typeof theme;

export default theme;