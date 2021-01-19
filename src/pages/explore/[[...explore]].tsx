import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Layout from '@components/common/layout';
import { helpers } from '@lib/utils';
import { withApollo } from '@lib/apollo';

const ExplorePage = () => {
	const router = useRouter();

	const { 1: subPath } = helpers.getCurrentRoute(router);

	return (
		<>
			<Head>
				<title>Explore</title>
			</Head>
			<Layout>Explore {subPath}</Layout>
		</>
	);
};

export default withApollo({ ssr: true })(ExplorePage);
