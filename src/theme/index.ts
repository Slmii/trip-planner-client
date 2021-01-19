import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme({
	palette: {
		primary: {
			main: '#4A898B'
		},
		secondary: {
			main: '#EEC218'
		},
		error: {
			main: '#ED4949'
		},
		background: {
			default: '#FFFFFF'
		},
		text: {
			primary: '#000000'
		},
		action: {
			disabled: '#AAA',
			disabledBackground: '#EEE'
		},
		monochromatic: '#5EA7AA',
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
			fontWeight: 500
			// opacity: 0.6
		}
	},
	shape: {
		borderRadius: 4
	},
	boxShadow: '0 2px 4px 1px rgba(17,34,68,0.4)',
	spacing: 16,
	overrides: {
		MuiTextField: {
			root: {
				backgroundColor: 'white'
			}
		},
		MuiChip: {
			outlined: {
				backgroundColor: 'white'
			},
			sizeSmall: {
				height: 28
			},
			labelSmall: {
				paddingLeft: 10,
				paddingRight: 10
			}
		},
		MuiBreadcrumbs: {
			root: {
				fontSize: 14
			}
		},
		MuiButton: {
			root: {
				minHeight: 40
			},
			sizeSmall: {
				minHeight: 33
			},
			sizeLarge: {
				minHeight: 45
			},
			colorInherit: {
				borderColor: 'rgba(0, 0, 0, 0.23)',
				backgroundColor: 'white',
				'&:hover': {
					borderColor: '#444444'
				}
			}
		}
	}
});

theme = responsiveFontSizes(theme);

export type Theme = typeof theme;

export default theme;
