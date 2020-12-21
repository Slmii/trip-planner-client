import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { Trips } from '@components/trips';
import { selectFilters } from '@lib/redux/filters';
import { helpers } from '@lib/utils';
import { Trip, useMyTripsQuery } from '@generated/graphql';

const MyTrips = () => {
	const router = useRouter();
	const { rows } = useSelector(selectFilters);

	const { search, activityType, transportationType, sort, order } = helpers.getQueryStringFilters(router.query);

	const { data, loading } = useMyTripsQuery({
		variables: {
			orderBy: {
				[sort]: order
			},
			pagination: {
				skip: (helpers.getCurrentPage(router.query) - 1) * Number(rows),
				take: Number(rows)
			},
			where: {
				search: {
					contains: search
				},
				activityType: {
					equals: activityType
				},
				transportationType: {
					equals: transportationType
				}
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
