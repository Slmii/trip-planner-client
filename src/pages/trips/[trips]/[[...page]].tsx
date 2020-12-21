import { useRouter } from 'next/router';

import { MyTrips, MyFavorites } from '@components/trips';
import { Layout } from '@components/common';
import { withApollo } from '@lib/apollo';

function TripsPage() {
	const { trips } = useRouter().query;

	let body: JSX.Element = <></>;

	if (trips === 'my-trips') {
		body = <MyTrips />;
	} else if (trips === 'favorites') {
		body = <MyFavorites />;
	}

	return <Layout>{body}</Layout>;
}

export default withApollo({ ssr: true })(TripsPage);
