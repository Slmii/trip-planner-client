import Head from 'next/head';

import { withApollo } from '@lib/apollo';
import { Layout } from '../components/common';

function PlannerPage() {
	return (
		<>
			<Head>
				<title>Plan a Trip</title>
			</Head>
			<Layout>Planner Page</Layout>
		</>
	);
}

export default withApollo({ ssr: true })(PlannerPage);
/*
    Social Acticity
    - meetups
    - place
    - time
    - max people
    Social Media
    - share on social media
*/
