import Box from '@material-ui/core/Box';
import MuiPagination from '@material-ui/lab/Pagination';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { PaginationProps } from '@components/pagination';
import { REMOVE_QUERY_STRINGS_ON_ACCOUNT_PAGE } from '@lib/constants';
import { helpers } from '@lib/utils';

const Pagination = ({ count }: PaginationProps) => {
	const router = useRouter();

	const filters = helpers.getQueryStringFilters(router.query);
	const [path, subPath] = useMemo(() => helpers.getCurrentRoute(router), [router]);

	const isAccountPage = helpers.isPage('account', router);

	const handleOnPageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
		// Append existing query strings (filters) to URL object
		// This way we dont lose the state of all chosen filters with pagination change
		const queryStrings = helpers.convertFiltersToRouterQueryObject({
			filters,
			removeQueryStrings: isAccountPage ? REMOVE_QUERY_STRINGS_ON_ACCOUNT_PAGE : undefined
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
		<Box display='flex' justifyContent='center' mt={2}>
			<MuiPagination
				page={filters.page}
				count={count}
				color='standard'
				shape='rounded'
				showFirstButton
				showLastButton
				onChange={handleOnPageChange}
			/>
		</Box>
	);
};

export default Pagination;
