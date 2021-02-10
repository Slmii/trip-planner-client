import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import TripsWrapper from '@components/trips';
import { Trip, useMyTripsQuery } from '@generated/graphql';
import { selectRows } from '@lib/redux/filters';
import { url } from '@lib/utils';

const Trips = () => {
	const router = useRouter();
	const rows = useSelector(selectRows);

	const queryStringFilters = url.getQueryStringFilters(router.query);
	const queryVariables = url.apolloTripsQueryVariables({ ...queryStringFilters, rows });

	const { data, loading } = useMyTripsQuery({
		variables: queryVariables
	});

	const isLoading = loading && !data;
	const totalCount = data?.myTrips.totalCount ?? 0;
	const trips = (data?.myTrips.trips ?? []) as Trip[];

	return (
		<TripsWrapper
			heading='My trips'
			suffix={`(${totalCount} results)`}
			trips={trips}
			isLoading={isLoading}
			totalCount={totalCount}
		/>
	);
};

export default Trips;
