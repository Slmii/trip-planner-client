import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
const MuiPagination = require('@material-ui/lab/Pagination').default;

import { getCurrentPage } from '@lib/utils/helpers';

import { PaginationProps } from './pagination.types';

const Pagination = ({ count }: PaginationProps) => {
	const router = useRouter();
	const [page, setPage] = useState(1);

	useEffect(() => {
		if (router.query.page) {
			const page = getCurrentPage(router.query);
			setPage(page);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleOnPageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
		setPage(page);
		router.push(`/trips/${router.query.trips}?page=${page}`);

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
