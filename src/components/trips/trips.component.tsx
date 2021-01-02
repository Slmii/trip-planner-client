import React, { useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useSelector } from 'react-redux';

import Cards from '@components/cards/cards';
import CardsSkeleton from '@components/cards/skeleton';
import Breadcrumbs from '@components/breadcrumbs';
import RowsView from '@components/trips/rows-view';
import Pagination from '@components/pagination';
import { TripsProps } from '@components/trips';
import { selectRows } from '@lib/redux/filters';

import { globalStyles } from '@styles/global-styled';

const Trips = ({ pageName, trips, loading, totalCount }: TripsProps) => {
	const rows = useSelector(selectRows);
	const [checked, setChecked] = useState(false);

	const { buttonMr } = globalStyles();

	return (
		<>
			<Box mb={1}>
				<Breadcrumbs />
			</Box>
			<Box display='flex' justifyContent='space-between' alignItems='center' mb={1}>
				<Typography variant='h5' component='h1'>
					{pageName} <Typography variant='overline'>({totalCount} results)</Typography>
				</Typography>
				<Box display='flex'>
					<FormControlLabel
						control={
							<Switch
								checked={checked}
								onChange={() => setChecked(prevState => !prevState)}
								name='checkedB'
								color='primary'
							/>
						}
						labelPlacement='start'
						label={<Typography variant='subtitle1'>Show past trips</Typography>}
						className={buttonMr}
					/>
					<RowsView />
				</Box>
			</Box>
			{loading ? <CardsSkeleton number={10} /> : <Cards trips={trips} />}
			<Box display='flex' justifyContent='center' mt={1}>
				<Pagination count={Math.ceil(totalCount / Number(rows))} />
			</Box>
		</>
	);
};

export default Trips;
