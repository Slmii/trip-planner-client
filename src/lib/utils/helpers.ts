import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // dependent on utc plugin
import timezonePlugin from 'dayjs/plugin/timezone';
import { ParsedUrlQuery } from 'querystring';
dayjs.extend(utc);
dayjs.extend(timezonePlugin);

import { filters } from '@lib/redux';
import { PreparationFragment } from '@generated/graphql';

export const formatDate = ({ date, timezone, format = 'DD-MM-YYY' }: { date: Date; timezone?: string; format?: string }) => {
	if (timezone) {
		return dayjs(date).tz(timezone).format(format);
	}

	return dayjs(date).format(format);
};

export const calculatePreperationCompletionPercentage = (preparations: PreparationFragment[]) => {
	return Math.round((preparations.filter(preparation => preparation.status).length / preparations.length) * 100);
};

export const getCurrentPage = (query: ParsedUrlQuery) => {
	const page = Number(query.page) || 1;
	return page;
};

// export const removeProperties = <T extends keyof FiltersState>(object: T, properties: string[]) => {
// 	const transformedObject = Object.entries(object).reduce((accum, [key, value]) => {
// 		if (!properties.includes(key)) {
// 			accum[key as T] = value as FiltersState[T];
// 		}

// 		return accum;
// 	}, {} as Record<T, FiltersState[T]>);

// 	return transformedObject;
// };

export const getQueryStringFilters = (query: ParsedUrlQuery) => {
	return (query as unknown) as filters.Extended;
};

export const hasProperties = <T>(object: Record<keyof T, T[keyof T]>, properties: Array<keyof T>) => {
	return Object.entries(object).some(([key, _value]) => properties.includes(key as keyof T));
};

export const hasNotProperties = <T>(object: Record<keyof T, T[keyof T]>, properties: Array<keyof T>) => {
	return Object.keys(object).every(key => !properties.includes(key as keyof T));
};
