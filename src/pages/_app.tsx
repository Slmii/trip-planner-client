import React, { useEffect } from 'react';
import Head from 'next/head';
import DayJsUtils from '@date-io/dayjs';
import { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { wrapper } from '@lib/redux';
import '@lib/dayjs';

import theme from '@theme/index';
import '../styles/global.scss';

if (process.env.NODE_ENV === 'development') {
	if (typeof window !== 'undefined') {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const whyDidYouRender = require('@welldone-software/why-did-you-render');

		whyDidYouRender(React, {
			trackAllPureComponents: true
		});
	}
}

function MyApp({ Component, pageProps }: AppProps) {
	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles && jssStyles.parentElement) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	return (
		<>
			<Head>
				<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
			</Head>
			<StylesProvider injectFirst>
				<MuiThemeProvider theme={theme}>
					<CssBaseline />
					<MuiPickersUtilsProvider utils={DayJsUtils}>
						<Component {...pageProps} />
					</MuiPickersUtilsProvider>
				</MuiThemeProvider>
			</StylesProvider>
		</>
	);
}

// export function reportWebVitals(metric: NextWebVitalsMetric) {
// 	console.log(metric);
// }

export default wrapper.withRedux(MyApp);
