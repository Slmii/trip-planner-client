import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useSelector } from 'react-redux';

import { Trips } from '@components/trips';
import { filters } from '@lib/redux';
import { helpers } from '@lib/utils';
import { Trip, useMyFavoritesQuery } from '@generated/graphql';

const MyFavorites = () => {
	const router = useRouter();
	const { rows } = useSelector(filters.selectFilters);

	const { search, activityType, transportationType, sort, order } = helpers.getQueryStringFilters(router.query);

	const { data, loading } = useMyFavoritesQuery({
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
			pageName='My favorites'
			trips={data?.myFavorites.trips as Trip[]}
			loading={loading || !data}
			totalCount={data?.myFavorites.totalCount ?? 0}
		/>
	);
};

export default MyFavorites;
