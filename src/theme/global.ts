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
		// ':focus:not(:focus-visible):not([role="dialog"]):not([role="menu"])': {
		// 	boxShadow: 'none !important'
		// },
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
		},
		'.react-calendar': {
			fontFamily: 'unset'
		}
		// '.react-datepicker': {
		// },
		// '.react-datepicker-wrapper': {
		// 	width: '100%'
		// },
		// '.react-datepicker__day--today': {
		// 	color: 'primary.500',
		// 	fontWeight: 'bold'
		// },
		// '.react-datepicker__day--selected, .react-datepicker__day--keyboard-selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range, .react-datepicker__month-text--selected, .react-datepicker__month-text--in-selecting-range, .react-datepicker__month-text--in-range, .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected': {
		// 	background: 'primary.500',
		// 	color: 'white',
		// 	'&:hover': {
		// 		background: 'primary.600'
		// 	}
		// },
		// '.react-datepicker__header': {
		// 	background: 'primary.500',
		// 	color: 'white'
		// },
		// '.react-datepicker__header, .react-datepicker__time-container': {
		// 	borderColor: 'border'
		// },
		// '.react-datepicker__current-month, .react-datepicker-time__header, .react-datepicker-year-header': {
		// 	color: 'white'
		// },
		// '.react-datepicker__day-name': {
		// 	color: 'white'
		// }
	})
};

export default styles;
