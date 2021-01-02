import Head from 'next/head';

import SignIn from '@components/signin';
import { withApollo } from '@lib/apollo';

function SignInPage() {
	return (
		<>
			<Head>
				<title>Sign In</title>
			</Head>
			<SignIn />
		</>
	);
}

export default withApollo({ ssr: false })(SignInPage);
