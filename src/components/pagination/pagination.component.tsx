import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import { PaginationProps } from '@components/pagination';
import { REMOVE_QUERY_STRINGS_ON_ACCOUNT_PAGE } from '@lib/constants';
import { url } from '@lib/utils';

const Pagination = ({ count }: PaginationProps) => {
	const router = useRouter();

	const filters = url.getQueryStringFilters(router.query);
	const [path, subPath] = useMemo(() => url.getCurrentRoute(router), [router]);

	const isAccountPage = url.isPage('account', router);
	const isExplorePage = url.isPage('explore', router);

	const handleOnPageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
		// Append existing query strings (filters) to URL object
		// This way we dont lose the state of all chosen filters with pagination change
		const queryStrings = url.convertFiltersToRouterQueryObject({
			filters,
			removeQueryStrings: isAccountPage
				? REMOVE_QUERY_STRINGS_ON_ACCOUNT_PAGE
				: isExplorePage
				? ['past']
				: undefined
		});

		router.push({
			pathname: `/${path}/${subPath}`,
			query: {
				page,
				...queryStrings
			}
		});

		window.scrollTo({ top: 0, behavior: 'auto' });
	};

	return (
		<Flex justifyContent='center' mt={8}>
			{/* <MuiPagination
				page={filters.page}
				count={count}
				color='standard'
				shape='rounded'
				showFirstButton
				showLastButton
				onChange={handleOnPageChange}
			/> */}
			TODO Pagination
		</Flex>
	);
};

export default Pagination;
