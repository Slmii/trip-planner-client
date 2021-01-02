import { ReactNode } from 'react';

import { QueryStringFilters } from '@components/filters/extended-filters';

export type WithChildren<T = Record<string, unknown>> = T & { children?: ReactNode };

export interface MenuItemOnClick<T> {
	label: string;
	value: T;
}

export interface FiltersRouterQueryObject {
	filters: QueryStringFilters;
	queryString?: KeyOf<QueryStringFilters>;
	value?: ValueOf<QueryStringFilters>;
	removeQueryStrings?: Array<KeyOf<QueryStringFilters>>;
}

export type Color = 'inherit' | 'default' | 'primary' | 'secondary';
export type Size = 'small' | 'medium' | 'large';
export type Severity = 'error' | 'warning' | 'success' | 'info';
export type ActivityType = 'hiking' | 'beach' | 'tour' | 'nature';
export type TransportationType = 'taxi' | 'bus' | 'foot' | 'motorbike';
export type ValueOf<T> = T[keyof T];
export type KeyOf<T> = keyof T;

export interface User {
	userId: number;
	role: string;
}
