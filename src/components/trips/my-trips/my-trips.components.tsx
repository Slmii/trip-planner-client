import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import Trips from '@components/trips';
import Button from '@components/buttons/button';
import { selectFilters } from '@lib/redux/filters';
import { helpers } from '@lib/utils';
import { Trip, useMyTripsQuery } from '@generated/graphql';

const MyTrips = () => {
	const router = useRouter();
	const { rows } = useSelector(selectFilters);

	const queryStringFilters = helpers.getQueryStringFilters(router.query);
	const queryVariables = helpers.tripsQueryVariables(queryStringFilters, rows);

	const { data, loading, error } = useMyTripsQuery({
		...queryVariables
	});

	if (error) {
		return (
			<Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
				<Typography variant='h6' component='h1'>
					Oops, looks like you are not logged in!
				</Typography>
				<Image src='/assets/illustrations/auth-required.jpg' width={450} height={450} />
			</Box>
		);
	}

	if (data?.myTrips.totalCount === 0) {
		return (
			<Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
				<Typography variant='h6' component='h1' gutterBottom>
					No trips yet. Let&apos;s start planning!
				</Typography>
				<Button fullWidth={false} onClick={() => router.push('/planner')} color='secondary'>
					Plan a trip
				</Button>
				<Box mt={0.5}>
					<Image src='/assets/illustrations/no-data.jpg' width={500} height={450} />
				</Box>
			</Box>
		);
	} else {
		return (
			<Trips
				pageName='My trips'
				trips={data?.myTrips.trips as Trip[]}
				loading={loading && !data}
				totalCount={data?.myTrips.totalCount ?? 0}
			/>
		);
	}
};

export default MyTrips;
