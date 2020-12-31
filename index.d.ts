import { Theme } from '@material-ui/core/styles/createMuiTheme';

declare module '@material-ui/core/styles/createMuiTheme' {
	interface Theme {
		boxShadow: React.CSSProperties['color'];
	}
	// allow configuration using `createMuiTheme`
	interface ThemeOptions {
		boxShadow: React.CSSProperties['color'];
	}
}

declare module '@material-ui/core/styles/createPalette' {
	interface Palette {
		borderColor: React.CSSProperties['color'];
		borderHover: React.CSSProperties['color'];
		monochromatic: React.CSSProperties['color'];
	}
	interface PaletteOptions {
		borderColor: React.CSSProperties['color'];
		borderHover: React.CSSProperties['color'];
		monochromatic: React.CSSProperties['color'];
	}
}
