import { useSelector } from 'react-redux';
const Typography = require('@material-ui/core/Typography').default;
const Box = require('@material-ui/core/Box').default;

import { Cards, Skeleton } from '@components/card';
import { Breadcrumbs } from '@components/breadcrumbs';
import { Filters } from '@components/filters';
import { Pagination } from '@components/pagination';
import { TripsProps } from '@lib/types';
import { selectRows } from '@lib/redux/filters';

const Trips = ({ pageName, trips, loading, totalCount }: TripsProps) => {
	const rows = useSelector(selectRows);

	return (
		<>
			<Box mb={1}>
				<Breadcrumbs />
			</Box>
			<Box display='flex' justifyContent='space-between' alignItems='center' mb={1}>
				<Typography variant='h5' component='h1'>
					{pageName} <Typography variant='overline'>({totalCount} results)</Typography>
				</Typography>
				<Filters />
			</Box>
			{loading ? <Skeleton number={10} /> : <Cards trips={trips} />}
			<Box display='flex' justifyContent='center' mt={1}>
				<Pagination count={Math.ceil(totalCount / Number(rows))} />
			</Box>
		</>
	);
};

export default Trips;
