import Head from 'next/head';
import { useRouter } from 'next/router';

import Layout from '@components/common/layout';
import { withApollo } from '@lib/apollo';
import { url } from '@lib/utils';

const ExplorePage = () => {
	const router = useRouter();

	const { 1: subPath } = url.getCurrentRoute(router);

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
