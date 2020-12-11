import { useRouter } from 'next/router';

import { MyTrips, MyFavorites } from '@components/trips';
import { Layout } from '@components/common';
import { PaginationContextProvider } from '@lib/context';
import { withApollo } from '@lib/apollo';

function TripsPage() {
	const { trips } = useRouter().query;

	let body: JSX.Element = <></>;

	if (trips === 'my-trips') {
		body = <MyTrips />;
	} else if (trips === 'favorites') {
		body = <MyFavorites />;
	}

	return (
		<PaginationContextProvider>
			<Layout>{body}</Layout>
		</PaginationContextProvider>
	);
}

export default withApollo({ ssr: true })(TripsPage);
