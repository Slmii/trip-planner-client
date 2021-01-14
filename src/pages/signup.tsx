import Head from 'next/head';

import { withApollo } from '@lib/apollo';

import SignUp from '../components/signup';

function SignUpPage() {
	return (
		<>
			<Head>Sign Up Page</Head>
			<SignUp />
		</>
	);
}

export default withApollo({ ssr: true })(SignUpPage);
