import { ArrayValues, ChipsPrefixMapping, SearchInCheckboxes } from '@components/filters/extended-filters';
import { SortOrder } from '@generated/graphql';



type POPOVER_FILTER_DATES = 'dateFrom' | 'dateTo' | 'activityDate';

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
export const CHIPS_PREFIX_MAPPING: Partial<Record<keyof ChipsPrefixMapping, string>> = {
	search: 'Search',
	searchIn: 'Search in',
	dateFrom: 'Date from',
	dateTo: 'Date to',
	activityDate: 'Activity date',
	activityType: 'Activity',
	transportationType: 'Transportation',
	sort: 'Sort by',
	order: 'Order by'
};
export const SEARCH_IN: SearchInCheckboxes[] = [
	{
		label: 'Trips',
		value: 'trips'
	},
	{
		label: 'Activities',
		value: 'activities'
	},
	{
		label: 'Preparations',
		value: 'preparations'
	}
];
export const POPOVER_FILTER_DATES: POPOVER_FILTER_DATES[] = ['dateFrom', 'dateTo', 'activityDate'];
