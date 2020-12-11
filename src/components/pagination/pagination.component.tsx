const MuiPagination = require('@material-ui/lab/Pagination').default;

import { PaginationProps } from '@lib/types';

const Pagination = ({ page, count, onChange }: PaginationProps) => {
	return (
		<MuiPagination page={page + 1} count={count} color='primary' shape='rounded' showFirstButton showLastButton onChange={onChange} />
	);
};

export default Pagination;
