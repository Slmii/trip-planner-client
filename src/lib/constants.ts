export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const IS_SERVER = typeof window === 'undefined';

export const STRENGTH = {
	1: 'Very weak',
	2: 'Weak',
	3: 'So-so',
	4: 'Good',
	5: 'Strong'
};

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
