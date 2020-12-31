import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { Trips } from '@components/trips';
import { selectFilters } from '@lib/redux/filters';
import { helpers } from '@lib/utils';
import { Trip, useMyTripsQuery } from '@generated/graphql';

const MyTrips = () => {
	const router = useRouter();
	const { rows } = useSelector(selectFilters);

	const queryStringFilters = helpers.getQueryStringFilters(router.query);
	const queryVariables = helpers.tripsQueryVariables(queryStringFilters, rows);

	const { data, loading } = useMyTripsQuery({
		...queryVariables
	});

	return (
		<Trips
			pageName='My trips'
			trips={data?.myTrips.trips as Trip[]}
			loading={loading && !data}
			totalCount={data?.myTrips.totalCount ?? 0}
		/>
	);
};

export default MyTrips;
