import { theme } from '@chakra-ui/react';
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
export type Size = 'lg' | 'md' | 'sm' | 'xs';
export type Severity = 'error' | 'warning' | 'success' | 'info';
export type ActivityType = 'hiking' | 'beach' | 'tour' | 'nature';
export type TransportationType = 'taxi' | 'bus' | 'foot' | 'motorbike';
export type ColorKeys = KeyOf<typeof theme.colors> | 'primary' | 'secondary' | 'text';
export type ValueOf<T> = T[keyof T];
export type KeyOf<T> = keyof T;

export interface User {
	userId: number;
	role: string;
}
