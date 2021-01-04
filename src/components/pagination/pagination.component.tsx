import MuiPagination from '@material-ui/lab/Pagination';
import { useRouter } from 'next/router';

import { PaginationProps } from '@components/pagination';
import { helpers } from '@lib/utils';

const Pagination = ({ count }: PaginationProps) => {
	const router = useRouter();

	const filters = helpers.getQueryStringFilters(router.query);

	const handleOnPageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
		// Append existing query strings (filters) to URL object
		// This way we dont lose the state of all chosen filters with pagination change
		const queryStrings = helpers.convertFiltersToRouterQueryObject({ filters });

		router.push({
			pathname: `/trips/${router.query.trips}`,
			query: {
				page,
				...queryStrings
			}
		});

		window.scrollTo({ top: 0, behavior: 'auto' });
	};

	return (
		<MuiPagination
			page={filters.page}
			count={count}
			color='standard'
			shape='rounded'
			showFirstButton
			showLastButton
			onChange={handleOnPageChange}
		/>
	);
};

export default Pagination;
