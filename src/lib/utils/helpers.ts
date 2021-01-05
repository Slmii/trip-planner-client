import dayjs, { Dayjs, OpUnitType } from 'dayjs';
import isEmail from 'validator/lib/isEmail';
import isIn from 'validator/lib/isIn';
import trim from 'validator/lib/trim';
import { NextRouter } from 'next/router';
import { BaseQueryOptions } from '@apollo/client';
import { ParsedUrlQuery } from 'querystring';

import { QueryStringFilters, OrderBy, SearchIn, SortBy } from '@components/filters/extended-filters';
import { EU_DATE_FORMAT_SLASHES, SERVER_DATE_FORMAT } from '@lib/constants';
import { KeyOf, ValueOf, FiltersRouterQueryObject, ActivityType, TransportationType } from '@lib/types';
import { Exact, PaginationInput, SortOrder, SubPreparationFragment, TripSortByInput, TripWhereInput } from '@generated/graphql';

export const formatDate = ({
	date,
	timezone,
	format = EU_DATE_FORMAT_SLASHES
}: {
	date: Date | Dayjs;
	timezone?: string;
	format?: string;
}) => {
	if (!date) {
		return;
	}

	if (timezone) {
		return dayjs(date).tz(timezone).format(format);
	}

	return dayjs(date).format(format);
};

export const isCurrentYear = (date: Date | Dayjs) => {
	if (!date) {
		return;
	}

	return dayjs(date).year() === dayjs().year();
};

export const addUnitToCurrentDate = (value: number, unit: OpUnitType = 'day') => {
	return dayjs().add(value, unit);
};

export const getEndOfWeek = (date?: Dayjs) => {
	if (date) {
		return dayjs(date).endOf('week');
	}

	return dayjs().endOf('week');
};

export const getEndOfMonth = (date?: Dayjs) => {
	if (date) {
		return dayjs(date).endOf('month');
	}

	return dayjs().endOf('month');
};

export const getCurrentPage = (query: ParsedUrlQuery) => {
	const page = Number(query.page) || 1;
	return page;
};
/**
 * Return the current existing query strings (filters) in the URL to the type of FiltersState.
 */
export const getQueryStringFilters = (query: ParsedUrlQuery): Readonly<QueryStringFilters & { page: number }> => {
	const dateFrom = query.dateFrom ? dayjs(query.dateFrom as string, EU_DATE_FORMAT_SLASHES) : null;
	const dateTo = query.dateTo ? dayjs(query.dateTo as string, EU_DATE_FORMAT_SLASHES) : null;
	const activityDate = query.activityDate ? dayjs(query.activityDate as string, EU_DATE_FORMAT_SLASHES) : null;

	const queryStringFilters = Object.freeze({
		search: (query.search as string) || undefined,
		searchIn: query.searchIn
			? ((query.searchIn as string).split(',') as SearchIn[])
			: (['trips', 'activities', 'preparations'] as SearchIn[]),
		sort: (query.sort as SortBy) ?? 'dateFrom',
		order: (query.order as OrderBy) ?? SortOrder.Asc,
		dateFrom,
		dateTo,
		activityDate,
		activityType: (query.activityType as ActivityType) ?? undefined,
		transportationType: (query.transportationType as TransportationType) ?? undefined,
		page: query.page ? Number(query.page as string) : 1
	});

	return queryStringFilters;
};

export const hasQueryStrings = <T>(object: Partial<Record<KeyOf<T>, ValueOf<T>>>, properties: Array<KeyOf<T>>) => {
	return Object.entries(object)
		.filter(([key, _value]) => properties.includes(key as KeyOf<T>))
		.some(([_key, value]) => value);
};

/**
 * If only `filters` property is defined then only check for current existing query strings (filters) in the URL.
 * If `queryString` is defined then so should `value` be. This then will replace the existing query string (filter) with the new chosen value.
 * `filter` will then be a fallback if a query string (filter) is already present in the URL. This way we dont lose the state of all chosen filters.
 */
export const convertFiltersToRouterQueryObject = ({
	filters,
	queryString,
	value,
	removeQueryStrings
}: Readonly<FiltersRouterQueryObject>) => {
	const filtersRouterObject: Partial<Record<KeyOf<QueryStringFilters>, string>> = {};
	const valueToString = value as string;

	// All current query strings in the URL
	const {
		search: qsSearch,
		searchIn: qsSearchIn,
		dateFrom: qsDateFrom,
		dateTo: qsDateTo,
		activityDate: qsActivityDate,
		activityType: qsActivityType,
		transportationType: qsTransportationType,
		sort: qsSort,
		order: qsOrder
	} = filters;

	if (queryString === 'search') {
		if ((value as SearchIn).length) {
			filtersRouterObject[queryString] = valueToString;
		}
	} else if (qsSearch) {
		filtersRouterObject.search = qsSearch;
	}

	if (queryString === 'searchIn') {
		const [searchIn, checked] = (value as string).split('-') as [SearchIn, string];

		const checkedAsBoolean = checked === 'true';

		if (checkedAsBoolean) {
			filtersRouterObject[queryString] = [...qsSearchIn, searchIn].join(',');
		} else {
			const existingQueryStringIdx = qsSearchIn.findIndex(queryString => queryString === searchIn);
			qsSearchIn.splice(existingQueryStringIdx, 1);
			filtersRouterObject[queryString] = qsSearchIn.join(',');
		}
	} else if (qsSearchIn?.length) {
		filtersRouterObject.searchIn = qsSearchIn.join(',');
	}

	if (queryString === 'dateFrom') {
		filtersRouterObject[queryString] = formatDate({ date: value as Dayjs });
	} else if (qsDateFrom) {
		filtersRouterObject.dateFrom = formatDate({ date: qsDateFrom as Dayjs });
	}

	if (queryString === 'dateTo') {
		filtersRouterObject[queryString] = formatDate({ date: value as Dayjs });
	} else if (qsDateTo) {
		filtersRouterObject.dateTo = formatDate({ date: qsDateTo as Dayjs });
	}

	if (queryString === 'activityDate') {
		filtersRouterObject[queryString] = formatDate({ date: value as Dayjs });
	} else if (qsActivityDate) {
		filtersRouterObject.activityDate = formatDate({ date: qsActivityDate as Dayjs });
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

	if (removeQueryStrings) {
		const filteredFiltersRouterObject = Object.entries(filtersRouterObject).reduce((accum, [key, value]) => {
			if (!removeQueryStrings.includes(key as KeyOf<QueryStringFilters>)) {
				accum[key as KeyOf<QueryStringFilters>] = value;
			}

			return accum;
		}, {} as Partial<Record<KeyOf<QueryStringFilters>, string>>);

		return Object.freeze(filteredFiltersRouterObject);
	}

	return Object.freeze(filtersRouterObject);
};

export const hasNotProperties = <T>(object: Record<KeyOf<T>, ValueOf<T>>, properties: Array<KeyOf<T>>) => {
	return Object.keys(object).every(key => !properties.includes(key as KeyOf<T>));
};

export const tripsQueryVariables = (
	filters: QueryStringFilters & { page: number },
	rows: string
): BaseQueryOptions<Exact<{ where?: TripWhereInput; pagination: PaginationInput; orderBy?: TripSortByInput }>> => {
	const { search, searchIn, dateFrom, dateTo, activityDate, activityType, transportationType, sort, order, page } = filters;

	return {
		variables: {
			orderBy: {
				[sort]: order
			},
			pagination: {
				skip: (page - 1) * Number(rows),
				take: Number(rows)
			},
			where: {
				search: {
					contains: search
				},
				searchIn,
				activityType: {
					equals: activityType
				},
				transportationType: {
					equals: transportationType
				},
				from: {
					gte: dateFrom
						? formatDate({
								date: dateFrom,
								format: SERVER_DATE_FORMAT
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  })
						: undefined
				},
				to: {
					lte: dateTo
						? formatDate({
								date: dateTo,
								format: SERVER_DATE_FORMAT
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  })
						: undefined
				},
				activityDate: {
					equals: activityDate
						? formatDate({
								date: activityDate,
								format: SERVER_DATE_FORMAT
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  })
						: undefined
				}
			}
		}
	};
};

export const getCurrentRoute = (router: NextRouter) => {
	const [pathWithoutQueryStrings] = router.asPath ? router.asPath.split('?') : [];

	return pathWithoutQueryStrings ? pathWithoutQueryStrings.split('/').filter(Boolean) : [];
};

export const calculatePreperationsCompletionPercentage = (subPreparations: SubPreparationFragment[]) => {
	const completedSubPreparations = subPreparations.filter(({ status }) => status).length;
	const percentageCompletion = (completedSubPreparations / subPreparations.length) * 100;

	return Math.round(percentageCompletion);
};

export const isInvitationEmailValid = (email: string, emailInvitations: string[]) => {
	const trimmedEmail = trim(email);

	if (!trimmedEmail.length) {
		return 'Provide an email address';
	}

	if (!isEmail(trimmedEmail)) {
		return `${trimmedEmail} is not a valid email address`;
	}

	if (isIn(trimmedEmail, emailInvitations)) {
		return `${trimmedEmail} has already been added`;
	}

	return null;
};
