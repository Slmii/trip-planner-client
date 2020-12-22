import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
const MuiPagination = require('@material-ui/lab/Pagination').default;

import { helpers } from '@lib/utils';

import { PaginationProps } from './pagination.types';

const Pagination = ({ count }: PaginationProps) => {
	const router = useRouter();

	const filters = helpers.getQueryStringFilters(router.query);
	const page = helpers.getCurrentPage(router.query);

	const handleOnPageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
		// Append existing query strings (filters) to URL object
		// This way we dont lose the state of all chosen filters with pagination change
		const queryStrings = helpers.convertToFiltersRouterQueryObject({ filters });

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
			page={Number(page)}
			count={count}
			color='secondary'
			shape='rounded'
			showFirstButton
			showLastButton
			onChange={handleOnPageChange}
		/>
	);
};

export default Pagination;
