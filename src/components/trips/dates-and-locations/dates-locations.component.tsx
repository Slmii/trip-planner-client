import React from 'react';
const Box = require('@material-ui/core/Box').default;
const Typography = require('@material-ui/core/Typography').default;
const DateRangeIcon = require('@material-ui/icons/DateRange').default;
const PublicIcon = require('@material-ui/icons/Public').default;

import { helpers } from '@lib/utils';

import { globalStyles } from '@styles/global-styled';

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
					{helpers.formatDate({
						date: dateFrom,
						format: helpers.isCurrentYear(dateFrom as Date) ? 'DD MMM' : 'DD MMM YYYY',
						timezone
					})}{' '}
					{dateTo
						? `- ${helpers.formatDate({
								date: dateTo,
								format: helpers.isCurrentYear(dateTo as Date) ? 'DD MMM' : 'DD MMM YYYY',
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
