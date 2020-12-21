import { useContext } from 'react';
import { useSelector } from 'react-redux';

import { Trips } from '@components/trips';
import { PaginationContext } from '@lib/context';
import { Trip, useMyFavoritesQuery } from '@generated/graphql';
import { selectFilters } from '@lib/redux/filters';

const MyFavorites = () => {
	const { page } = useContext(PaginationContext);
	const { rows, orderSort, extendedFilters } = useSelector(selectFilters);

	const { data, loading } = useMyFavoritesQuery({
		variables: {
			orderBy: {
				[orderSort.sort]: orderSort.order
			},
			pagination: {
				skip: page * Number(rows),
				take: Number(rows)
			},
			where: {
				search: {
					contains: extendedFilters.search || undefined
				},
				activityType: {
					equals: extendedFilters.activityType ?? undefined
				},
				transportationType: {
					equals: extendedFilters.transportationType ?? undefined
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
