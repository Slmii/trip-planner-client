import { SortOrder, TripSortByInput } from '@generated/graphql';
import { ActivityType, KeyOf, TransportationType, ValueOf } from '@lib/types';

export type SortBy = keyof TripSortByInput;
export type OrderBy = SortOrder;

export type SearchIn = 'trips' | 'activities' | 'preparations';

export interface QueryStringFilters {
	search?: string;
	searchIn: SearchIn[];
	dateFrom: Date | null;
	dateTo: Date | null;
	activityDate: Date | null;
	activityType?: ActivityType;
	transportationType?: TransportationType;
	past: boolean;
	sort: SortBy;
	order: OrderBy;
}
export interface FilterMenusState {
	quickFilters: boolean;
	dateFrom: boolean;
	dateTo: boolean;
	activityDate: boolean;
	activityType: boolean;
	transportationType: boolean;
	sort: boolean;
}

export interface ArrayValues {
	value: SortBy | OrderBy;
	label: string;
}

export interface QueryStringFilterChange {
	queryString: KeyOf<QueryStringFilters>;
	value: ValueOf<QueryStringFilters>;
}

export interface SearchInCheckboxes {
	label: string;
	value: SearchIn;
}

export type ChipsPrefixMapping = QueryStringFilters & { sort: string; order: string };
