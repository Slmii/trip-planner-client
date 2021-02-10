import { Styles } from '@chakra-ui/theme-tools';

const styles: Styles = {
	global: props => ({
		body: {
			fontFamily: "'Cairo', serif",
			margin: 0,
			fontSize: '1rem',
			backgroundColor: 'white',
			color: 'black',
			WebkitFontSmoothing: 'antialiased',
			MozOsxFontSmoothing: 'grayscale'
		},
		'*': {
			boxSizing: 'border-box'
		},
		'*:disabled': {
			cursor: 'not-allowed !important'
		},
		code: {
			fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace"
		},
		a: {
			color: 'text',
			textDecoration: 'none',
			cursor: 'pointer',
			'&:hover': {
				textDecoration: 'underline'
			}
		},
		'.btr-0': {
			borderTopLeftRadius: '0 !important',
			borderTopRightRadius: '0 !important'
		},
		'.white': {
			color: 'white'
		},
		'.underline-animation': {
			pos: 'relative',
			'& > div': {
				_after: {
					content: '""',
					pos: 'absolute',
					bottom: 0,
					left: 0,
					display: 'block',
					width: 0,
					height: '3px',
					background: 'primary.500',
					transition: 'width .2s'
				},
				_hover: {
					_after: {
						width: '100%'
					}
				}
			}
		},
		'.underline-animation-secondary': {
			pos: 'relative',
			'& > div': {
				_after: {
					content: '""',
					pos: 'absolute',
					bottom: 0,
					left: 0,
					display: 'block',
					width: 0,
					height: '3px',
					background: 'secondary.500',
					transition: 'width .2s'
				},
				_hover: {
					_after: {
						width: '100%'
					}
				}
			}
		}
	})
};

export default styles;
