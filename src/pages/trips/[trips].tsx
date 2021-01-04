import { useRouter } from 'next/router';

import MyTrips from '@components/trips/my-trips';
import MyFavorites from '@components/trips/my-favorites';
import Layout from '@components/common/layout';
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
