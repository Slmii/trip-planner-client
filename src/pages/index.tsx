import Head from 'next/head';

import Layout from '@components/common/layout';
import { useMyTripsQuery } from '@generated/graphql';
import { withApollo } from '@lib/apollo';

function Home() {
	const { data, loading } = useMyTripsQuery({
		variables: {
			pagination: {
				skip: 0,
				take: 10
			}
		}
	});

	return (
		<>
			<Head>
				<title>Home</title>
			</Head>
			<Layout>{data?.myTrips.totalCount}</Layout>
		</>
	);
}

export default withApollo({ ssr: true })(Home);
