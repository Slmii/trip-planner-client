import { useContext } from 'react';
import { useSelector } from 'react-redux';

import { Trips } from '@components/trips';
import { PaginationContext } from '@lib/context';
import { Trip, useMyFavoritesQuery } from '@generated/graphql';
import { selectFilters } from '@lib/redux/filters';

const MyFavorites = () => {
	const { page } = useContext(PaginationContext);
	const { rows, orderSort } = useSelector(selectFilters);

	const { data, loading } = useMyFavoritesQuery({
		variables: {
			orderBy: {
				[orderSort.order]: orderSort.sort
			},
			pagination: {
				skip: page * Number(rows),
				take: Number(rows)
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
