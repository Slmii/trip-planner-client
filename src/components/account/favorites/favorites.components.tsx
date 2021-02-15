import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import TripsWrapper from '@components/trips';
import { SortOrder, Trip, useMyFavoritesQuery } from '@generated/graphql';
import { selectRows } from '@lib/redux/filters';
import { url } from '@lib/utils';

const Favorites = () => {
	const router = useRouter();
	const rows = useSelector(selectRows);

	const queryStringFilters = url.getQueryStringFilters(router.query);
	const queryVariables = url.apolloTripsQueryVariables({ ...queryStringFilters, past: true, rows });

	const { data, loading } = useMyFavoritesQuery({
		variables: {
			...queryVariables,
			orderBy: {
				createdAt: SortOrder.Desc
			}
		}
	});

	const isLoading = loading && !data;
	const totalCount = data?.myFavorites.totalCount ?? 0;
	const trips = (data?.myFavorites.trips ?? []) as Trip[];

	return (
		<TripsWrapper
			heading='My favorites'
			suffix={`(${totalCount} results)`}
			trips={trips}
			isLoading={isLoading}
			totalCount={totalCount}
			hasFilters={false}
		/>
	);
};

export default Favorites;
