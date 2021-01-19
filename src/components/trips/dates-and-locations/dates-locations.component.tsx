import React from 'react';

import { date } from '@lib/utils';

import { globalStyles } from '@styles/index';

const Box = require('@material-ui/core/Box').default;
const Typography = require('@material-ui/core/Typography').default;
const DateRangeIcon = require('@material-ui/icons/DateRange').default;
const PublicIcon = require('@material-ui/icons/Public').default;

const TripDatesAndLocations = ({
	dateFrom,
	dateTo,
	timezone,
	locations
}: {
	dateFrom: Date;
	dateTo?: Date;
	timezone?: string;
	locations: string[];
}) => {
	const { iconMr } = globalStyles();

	return (
		<>
			<Box display='flex' alignItems='center'>
				<DateRangeIcon className={iconMr} fontSize='inherit' />
				<Typography variant='subtitle1' color='textSecondary'>
					{date.formatDate({
						date: dateFrom,
						format: date.isCurrentYear(dateFrom as Date) ? 'DD MMM' : 'DD MMM YYYY',
						timezone
					})}{' '}
					{dateTo
						? `- ${date.formatDate({
								date: dateTo,
								format: date.isCurrentYear(dateTo as Date) ? 'DD MMM' : 'DD MMM YYYY',
								timezone
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  })}`
						: null}
				</Typography>
			</Box>
			<Box display='flex' alignItems='center'>
				<PublicIcon fontSize='inherit' className={iconMr} />
				<Typography variant='subtitle1' color='textSecondary'>
					{locations.length ? locations.join(' - ') : '-'}
				</Typography>
			</Box>
		</>
	);
};

export default React.memo(TripDatesAndLocations);
