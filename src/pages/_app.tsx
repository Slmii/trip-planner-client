import '@lib/dayjs';
import 'focus-visible/dist/focus-visible';
import 'react-calendar/dist/Calendar.css';

import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { IconContext } from 'react-icons';

import { wrapper } from '@lib/redux';

import theme from '@theme/index';

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
	return (
		<>
			<Head>
				<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
			</Head>
			<ChakraProvider resetCSS theme={theme}>
				<IconContext.Provider value={{ size: '1.75rem' }}>
					<Component {...pageProps} />
				</IconContext.Provider>
			</ChakraProvider>
		</>
	);
}

// export function reportWebVitals(metric: NextWebVitalsMetric) {
// 	console.log(metric);
// }

export default wrapper.withRedux(MyApp);
