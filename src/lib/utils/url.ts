import dayjs, { Dayjs } from 'dayjs';
import { NextRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

import { OrderBy, QueryStringFilters, SearchIn, SortBy } from '@components/filters/extended-filters';
import {
    Exact,
    NotificationType,
    PaginationInput,
    SortOrder,
    TripSortByInput,
    TripWhereInput
} from '@generated/graphql';
import { EU_DATE_FORMAT_SLASHES, SERVER_DATE_FORMAT } from '@lib/constants';
import { ActivityType, FiltersRouterQueryObject, KeyOf, TransportationType } from '@lib/types';
import { date } from '@lib/utils';

/**
 * Return the current existing query strings (filters) in the URL to the type of FiltersState.
 */
const getQueryStringFilters = (query: ParsedUrlQuery): Readonly<QueryStringFilters & { page: number }> => {
	const dateFrom = query.dateFrom ? dayjs(query.dateFrom as string, EU_DATE_FORMAT_SLASHES).toDate() : null;
	const dateTo = query.dateTo ? dayjs(query.dateTo as string, EU_DATE_FORMAT_SLASHES).toDate() : null;
	const activityDate = query.activityDate
		? dayjs(query.activityDate as string, EU_DATE_FORMAT_SLASHES).toDate()
		: null;

	const queryStringFilters = Object.freeze({
		search: (query.search as string) || undefined,
		searchIn: query.searchIn
			? ((query.searchIn as string).split(',') as SearchIn[]).filter(Boolean)
			: (['trips', 'activities', 'preparations'] as SearchIn[]), // default when there is no query string
		sort: (query.sort as SortBy) ?? 'dateFrom',
		order: (query.order as OrderBy) ?? SortOrder.Asc,
		dateFrom,
		dateTo,
		activityDate,
		activityType: (query.activityType as ActivityType) ?? undefined,
		transportationType: (query.transportationType as TransportationType) ?? undefined,
		past: query.past ? (query.past as string) === 'true' : false,
		page: query.page ? Number(query.page as string) : 1
	});

	return queryStringFilters;
};

/**
 * If only `filters` property is defined then only check for current existing query strings (filters) in the URL.
 * If `queryString` is defined then so should `value` be. This then will replace the existing query string (filter) with the new chosen value.
 * `filter` will then be a fallback if a query string (filter) is already present in the URL. This way we dont lose the state of all chosen filters.
 */
const convertFiltersToRouterQueryObject = ({
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
		past: qsPast,
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
		filtersRouterObject[queryString] = date.formatDate({ date: value as Dayjs });
	} else if (qsDateFrom) {
		filtersRouterObject.dateFrom = date.formatDate({ date: qsDateFrom as Dayjs });
	}

	if (queryString === 'dateTo') {
		filtersRouterObject[queryString] = date.formatDate({ date: value as Dayjs });
	} else if (qsDateTo) {
		filtersRouterObject.dateTo = date.formatDate({ date: qsDateTo as Dayjs });
	}

	if (queryString === 'activityDate') {
		filtersRouterObject[queryString] = date.formatDate({ date: value as Dayjs });
	} else if (qsActivityDate) {
		filtersRouterObject.activityDate = date.formatDate({ date: qsActivityDate as Dayjs });
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

	if (queryString === 'past') {
		// value for query past will come in as a boolean
		filtersRouterObject[queryString] = (value as boolean) === true ? 'true' : 'false';
	} else if (typeof qsPast !== 'undefined') {
		filtersRouterObject.past = qsPast === true ? 'true' : 'false';
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

const getCurrentRoute = (router: NextRouter) => {
	const [pathWithoutQueryStrings] = router.asPath ? router.asPath.split('?') : [];

	return pathWithoutQueryStrings ? pathWithoutQueryStrings.split('/').filter(Boolean) : [];
};

const isPage = (page: string, router: NextRouter) => {
	return page === getCurrentRoute(router)[0];
};

const isSubPage = (page: string | string[], router: NextRouter) => {
	if (Array.isArray(page)) {
		const pages = page;
		return pages.includes(getCurrentRoute(router)[1]);
	}

	return page === getCurrentRoute(router)[1];
};

const transformToNotificationRedirectUrl = (type: NotificationType, uuid: string) => {
	let url = '';

	if (type === NotificationType.ActivityInvitationSent) {
		url = `/account/invitations#${uuid}`;
	} else if (type === NotificationType.ActivityJoinRequest) {
		url = `/account/requests#${uuid}`;
	} else if (type === NotificationType.UpcomingActivity) {
		url = `/activities/my-activities#${uuid}`;
	} else if (type === NotificationType.UpcomingTrip) {
		url = `/trips/my-trips#${uuid}`;
	}

	return url;
};

const apolloTripsQueryVariables = (
	filters: QueryStringFilters & { page: number; rows: string }
): Exact<{ where?: TripWhereInput; pagination: PaginationInput; orderBy?: TripSortByInput }> => {
	const {
		search,
		searchIn,
		dateFrom,
		dateTo,
		activityDate,
		activityType,
		transportationType,
		past,
		sort,
		order,
		page,
		rows
	} = filters;

	return {
		orderBy: {
			[sort]: order
		},
		pagination: {
			skip: (page ? page - 1 : 0) * Number(rows),
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
				gte: !dateFrom // if dateFrom fiter is not set
					? !past // if past trips must not be shown
						? date.formatDate({
								// show trips starting from current date
								date: new Date(),
								format: SERVER_DATE_FORMAT
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  })
						: undefined // show also past trips
					: date.formatDate({
							// dateFrom filter is set, use that as starting point
							date: dateFrom,
							format: SERVER_DATE_FORMAT
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  })
			},
			to: {
				lte: dateTo
					? date.formatDate({
							date: dateTo,
							format: SERVER_DATE_FORMAT
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  })
					: undefined
			},
			activityDate: {
				equals: activityDate
					? date.formatDate({
							date: activityDate,
							format: SERVER_DATE_FORMAT
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  })
					: undefined
			}
		}
	};
};

export const url = {
	isPage,
	isSubPage,
	getCurrentRoute,
	transformToNotificationRedirectUrl,
	apolloTripsQueryVariables,
	convertFiltersToRouterQueryObject,
	getQueryStringFilters
};
