import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { MdDateRange, MdPublic } from 'react-icons/md';

import Icon from '@components/icon';
import { date } from '@lib/utils';

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
	return (
		<Flex flexDirection='column'>
			<Flex alignItems='center'>
				<Icon as={MdDateRange} size='sm' mr />
				<Text textStyle='subtitle'>
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
				</Text>
			</Flex>
			<Flex alignItems='center'>
				<Icon as={MdPublic} size='sm' mr />
				<Text textStyle='subtitle'>{locations.length ? locations.join(' - ') : '-'}</Text>
			</Flex>
		</Flex>
	);
};

export default React.memo(TripDatesAndLocations);
