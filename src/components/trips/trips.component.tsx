import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
const Typography = require('@material-ui/core/Typography').default;
const Box = require('@material-ui/core/Box').default;

import { Cards, Skeleton } from '@components/card';
import { Filters } from '@components/filters';
import { Pagination } from '@components/pagination';
import { TripsProps } from '@lib/types';
import { PaginationContext } from '@lib/context';
import { selectRows } from '@lib/redux/filters';

const Trips = ({ pageName, trips, loading, totalCount }: TripsProps) => {
	const rows = useSelector(selectRows);
	const { page, setPage } = useContext(PaginationContext);
	const router = useRouter();

	const handleOnPageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
		setPage(page - 1);

		router.push(`/trips/${router.query.trips}/${page}`);

		window.scrollTo({ top: 0, behavior: 'auto' });
	};

	return (
		<>
			<Box display='flex' justifyContent='space-between' alignItems='flex-end' mb={1}>
				<Typography variant='h5' component='h1' gutterBottom>
					{pageName} <Typography variant='overline'>({totalCount} results)</Typography>
				</Typography>
				<Filters />
			</Box>
			{loading ? <Skeleton number={10} /> : <Cards trips={trips} />}
			<Box display='flex' justifyContent='center' mt={1}>
				<Pagination page={page} count={Math.ceil(totalCount / Number(rows))} onChange={handleOnPageChange} />
			</Box>
		</>
	);
};

export default Trips;
