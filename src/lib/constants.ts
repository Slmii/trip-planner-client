import { QueryStringFilters } from '@components/filters/extended-filters';
import { KeyOf } from '@lib/types';

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const IS_SERVER = typeof window === 'undefined';

export const CHIPS_PREFIX_MAPPING: Record<string, string> = {
	search: 'Search',
	departureDate: 'Departure date',
	returnDate: 'Return date',
	activityDate: 'Activity date',
	activityType: 'Activity',
	transportationType: 'Transportation'
};

export const EU_DATE_FORMAT_SLASHES = 'DD/MM/YYYY';
export const EU_DATE_FORMAT_DASHES = 'DD-MM-YYYY';
export const US_DATE_FORMAT_SLASHES = 'MM/DD/YYYY';
export const US_DATE_FORMAT_DASHES = 'MM-DD-YYYY';
export const SERVER_DATE_FORMAT = 'YYYY-MM-DD';

export const REMOVE_QUERY_STRINGS_ON_ACCOUNT_PAGE: Array<KeyOf<QueryStringFilters>> = [
	'activityDate',
	'activityType',
	'transportationType',
	'searchIn',
	'order',
	'sort'
];
