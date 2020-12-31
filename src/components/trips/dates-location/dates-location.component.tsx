import React from 'react';
const Box = require('@material-ui/core/Box').default;
const Typography = require('@material-ui/core/Typography').default;
const DateRangeIcon = require('@material-ui/icons/DateRange').default;
const PublicIcon = require('@material-ui/icons/Public').default;

import { helpers } from '@lib/utils';
import { TripFragment } from '@generated/graphql';

import { globalStyles } from '@styles/global-styled';

const TripDateLocation = ({ trip }: { trip: TripFragment }) => {
	const { iconMr } = globalStyles();

	return (
		<>
			<Box display='flex' alignItems='center'>
				<DateRangeIcon className={iconMr} fontSize='inherit' />
				<Typography variant='subtitle1' color='textSecondary'>
					{helpers.formatDate({
						date: trip.dateFrom,
						format: helpers.isCurrentYear(trip.dateFrom as Date) ? 'DD MMM' : 'DD MMM YYYY'
					})}{' '}
					-{' '}
					{helpers.formatDate({
						date: trip.dateTo,
						format: helpers.isCurrentYear(trip.dateTo as Date) ? 'DD MMM' : 'DD MMM YYYY'
					})}
				</Typography>
			</Box>
			<Box display='flex' alignItems='center'>
				<PublicIcon fontSize='inherit' className={iconMr} />
				<Typography variant='subtitle1' color='textSecondary'>
					{trip.locations.length ? trip.locations.map(location => location.name).join(' - ') : '-'}
				</Typography>
			</Box>
		</>
	);
};

export default React.memo(TripDateLocation);
