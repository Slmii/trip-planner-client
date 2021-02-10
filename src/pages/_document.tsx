import { ColorModeScript } from '@chakra-ui/react';
import Document, { Head, Html, Main, NextScript } from 'next/document';

import theme from '@theme/index';

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head>
					{/* PWA primary color */}
					<meta name='theme-color' content={theme.colors.primary[500]} />
					<link
						href='https://fonts.googleapis.com/css?family=Cairo:600,500,400'
						rel='stylesheet'
						type='text/css'
					/>
				</Head>
				<body>
					<ColorModeScript />
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
