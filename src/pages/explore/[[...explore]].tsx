import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Layout from '@components/common/layout';
import { withApollo } from '@lib/apollo';

const ExplorePage = () => {
	const router = useRouter();

	const exploreUrlQuery = router.query.explore ? router.query.explore[0] : undefined;

	return (
		<>
			<Head>
				<title>Explore</title>
			</Head>
			<Layout>Explore {exploreUrlQuery}</Layout>
		</>
	);
};

export default withApollo({ ssr: true })(ExplorePage);
