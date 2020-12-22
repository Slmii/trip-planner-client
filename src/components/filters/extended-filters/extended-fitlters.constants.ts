import { SortOrder } from '@generated/graphql';

import { ArrayValues, ChipsPrefixMapping, FiltersState } from '@components/filters';

export const SORT_BY_VALUES: ArrayValues[] = [
	{
		value: 'dateFrom',
		label: 'Departure date'
	},
	{
		value: 'dateTo',
		label: 'Return date'
	},
	{
		value: 'createdAt',
		label: 'Date added'
	}
];

export const ORDER_BY_VALUES: ArrayValues[] = [
	{
		value: SortOrder.Asc,
		label: 'Asc'
	},
	{
		value: SortOrder.Desc,
		label: 'Desc'
	}
];

export const CHIPS_PREFIX_MAPPING: Record<keyof ChipsPrefixMapping, string> = {
	search: 'Search',
	departureDate: 'Departure date',
	returnDate: 'Return date',
	activityDate: 'Activity date',
	activityType: 'Activity',
	transportationType: 'Transportation',
	sort: 'Sort by',
	order: 'Order by'
};

export const QUERY_STRINGS = ['search', 'departureDate', 'returnDate', 'activityDate', 'activityType', 'transportationType'];
