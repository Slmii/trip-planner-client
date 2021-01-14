import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import Trips from '@components/trips';
import { SortOrder, Trip, useMyFavoritesQuery } from '@generated/graphql';
import { filters } from '@lib/redux';
import { helpers } from '@lib/utils';

const MyFavorites = () => {
	const router = useRouter();
	const { rows } = useSelector(filters.selectFilters);

	const queryStringFilters = helpers.getQueryStringFilters(router.query);
	const queryVariables = helpers.tripsQueryVariables(queryStringFilters, rows);

	const { data, loading, error } = useMyFavoritesQuery({
		variables: {
			...queryVariables,
			orderBy: {
				createdAt: SortOrder.Desc
			}
		}
	});

	return (
		<Trips
			pageName='My favorites'
			trips={data?.myFavorites.trips as Trip[]}
			loading={loading && !data}
			totalCount={data?.myFavorites.totalCount ?? 0}
		/>
	);
};

export default MyFavorites;
