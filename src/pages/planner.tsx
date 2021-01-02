import Head from 'next/head';

import Layout from '../components/common/layout';
import { withApollo } from '@lib/apollo';

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
