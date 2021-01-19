import Box from '@material-ui/core/Box';
import { useSelector } from 'react-redux';

import AccountTitle from '@components/account/account-title';
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
			<AccountTitle title={pageName} subTitle={`(${totalCount} results)`} />
			<Box mb={1}>
				<ExtendedFilters />
			</Box>
			{loading ? (
				<CardsSkeleton number={10} />
			) : trips.length > 0 ? (
				<>
					<Cards trips={trips} />
					<Pagination count={Math.ceil(totalCount / Number(rows))} />
				</>
			) : (
				'Nothing'
			)}
		</>
	);
};

export default Trips;
