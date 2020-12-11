import { useSelector } from 'react-redux';
import { useContext } from 'react';

import { Trips } from '@components/trips';
import { PaginationContext } from '@lib/context';
import { Trip, useMyTripsQuery } from '@generated/graphql';
import { selectFilters } from '@lib/redux/filters';

const MyTrips = () => {
	const { page } = useContext(PaginationContext);
	const { rows, orderSort } = useSelector(selectFilters);

	const { data, loading } = useMyTripsQuery({
		variables: {
			orderBy: {
				[orderSort.sort]: orderSort.order
			},
			pagination: {
				skip: page * Number(rows),
				take: Number(rows)
			}
		}
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
