import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // dependent on utc plugin
import timezonePlugin from 'dayjs/plugin/timezone';
import { ParsedUrlQuery } from 'querystring';
dayjs.extend(utc);
dayjs.extend(timezonePlugin);

import { FiltersState } from '@components/filters';
import { KeyOf, ValueOf, FiltersRouterQueryObject } from '@lib/types';
import { PreparationFragment, SortOrder } from '@generated/graphql';

export const formatDate = ({ date, timezone, format = 'DD-MM-YYY' }: { date: Date; timezone?: string; format?: string }) => {
	if (timezone) {
		return dayjs(date).tz(timezone).format(format);
	}

	return dayjs(date).format(format);
};

export const calculatePreperationsCompletionPercentage = (preparations: PreparationFragment[]) => {
	return Math.round((preparations.filter(preparation => preparation.status).length / preparations.length) * 100);
};

export const getCurrentPage = (query: ParsedUrlQuery) => {
	const page = Number(query.page) || 1;
	return page;
};

export const getQueryStringFilters = (query: ParsedUrlQuery): FiltersState => {
	const queryStrings = (query as unknown) as FiltersState;

	return {
		search: queryStrings.search || undefined,
		departureDate: queryStrings.departureDate ?? undefined,
		returnDate: queryStrings.returnDate ?? undefined,
		activityDate: queryStrings.activityDate ?? undefined,
		activityType: queryStrings.activityType ?? undefined,
		transportationType: queryStrings.transportationType ?? undefined,
		sort: queryStrings.sort ?? 'dateFrom',
		order: queryStrings.order ?? SortOrder.Asc
	};
};

export const hasQueryStrings = <T>(object: Partial<Record<KeyOf<T>, ValueOf<T>>>, properties: Array<KeyOf<T>>) => {
	return Object.entries(object)
		.filter(([key, _value]) => properties.includes(key as KeyOf<T>))
		.some(([_key, value]) => value);
};

/**
 * If only `filters` property is defined then only check for existing query strings (filters) in the URL.
 * If `queryString` is defined then so should `value` be. This then will replace the existing query string (filter) with the new chosen value.
 * `filter` will then be a fallback if a query string (filter) is already present in the URL. This way we dont lose the state of all chosen filters.
 */
export const convertToFiltersRouterQueryObject = ({ filters, queryString, value, removeQueryStrings }: FiltersRouterQueryObject) => {
	const filtersRouterObject: Partial<Record<KeyOf<FiltersState>, string>> = {};
	const valueToString = value as string;

	const {
		search: qsSearch,
		departureDate: qsDepartureDate,
		returnDate: qsReturnDate,
		activityDate: qsActivityDate,
		activityType: qsActivityType,
		transportationType: qsTransportationType,
		sort: qsSort,
		order: qsOrder
	} = filters;

	if (queryString === 'search') {
		if ((value as string).length) {
			filtersRouterObject[queryString] = valueToString;
		}
	} else if (qsSearch) {
		filtersRouterObject.search = qsSearch;
	}

	if (queryString === 'activityType') {
		filtersRouterObject[queryString] = valueToString;
	} else if (qsActivityType) {
		filtersRouterObject.activityType = qsActivityType;
	}

	if (queryString === 'transportationType') {
		filtersRouterObject[queryString] = valueToString;
	} else if (qsTransportationType) {
		filtersRouterObject.transportationType = qsTransportationType;
	}

	if (queryString === 'sort') {
		filtersRouterObject[queryString] = valueToString;
	} else if (qsSort) {
		filtersRouterObject.sort = qsSort;
	}

	if (queryString === 'order') {
		filtersRouterObject[queryString] = valueToString;
	} else if (qsOrder) {
		filtersRouterObject.order = qsOrder;
	}

	console.log('before', filtersRouterObject);

	if (removeQueryStrings) {
		return Object.entries(filtersRouterObject).reduce((accum, [key, value]) => {
			if (!removeQueryStrings.includes(key as KeyOf<FiltersState>)) {
				accum[key as KeyOf<FiltersState>] = value;
			}

			return accum;
		}, {} as Partial<Record<KeyOf<FiltersState>, string>>);
	}

	return filtersRouterObject;
};

export const hasNotProperties = <T>(object: Record<KeyOf<T>, ValueOf<T>>, properties: Array<KeyOf<T>>) => {
	return Object.keys(object).every(key => !properties.includes(key as KeyOf<T>));
};
