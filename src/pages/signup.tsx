import Head from 'next/head';

import { SignUp } from '../components/signup';
import { withApollo } from '@lib/apollo';

function SignUpPage() {
	return (
		<>
			<Head>Sign Up Page</Head>
			<SignUp />
		</>
	);
}

export default withApollo({ ssr: false })(SignUpPage);
