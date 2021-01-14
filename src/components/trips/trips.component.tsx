import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';

import Cards from '@components/cards/cards';
import CardsSkeleton from '@components/cards/skeleton';
import ExtendedFilters from '@components/filters/extended-filters';
import Pagination from '@components/pagination';
import { TripsProps } from '@components/trips';
import { selectRows } from '@lib/redux/filters';

const Trips = ({ pageName, trips, loading, totalCount }: TripsProps) => {
	const rows = useSelector(selectRows);

	return (
		<>
			<Box display='flex' justifyContent='space-between' alignItems='center' mb={1}>
				<Typography variant='h5' component='h1'>
					{pageName} <Typography variant='overline'>({totalCount} results)</Typography>
				</Typography>
			</Box>
			{loading ? (
				<CardsSkeleton number={10} />
			) : trips && trips.length > 0 ? (
				<>
					<Box mb={2}>
						<ExtendedFilters />
					</Box>
					<Cards trips={trips} />
					<Box display='flex' justifyContent='center' mt={2}>
						<Pagination count={Math.ceil(totalCount / Number(rows))} />
					</Box>
				</>
			) : (
				'Nothing'
			)}
		</>
	);
};

export default Trips;
