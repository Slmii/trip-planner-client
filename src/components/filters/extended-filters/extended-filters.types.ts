import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

import { SortOrder, TripSortByInput } from '@generated/graphql';
import { ActivityType, KeyOf, TransportationType, ValueOf } from '@lib/types';

export type SortBy = keyof TripSortByInput;
export type OrderBy = SortOrder;

export type SearchIn = 'trips' | 'activities' | 'preparations';

export interface QueryStringFilters {
	search?: string;
	searchIn: SearchIn[];
	dateFrom: MaterialUiPickersDate;
	dateTo: MaterialUiPickersDate;
	activityDate: MaterialUiPickersDate;
	activityType?: ActivityType;
	transportationType?: TransportationType;
	past: boolean;
	sort: SortBy;
	order: OrderBy;
}
export interface AnchorElementState {
	quickFilters: null | HTMLElement;
	dateFrom: null | HTMLElement;
	dateTo: null | HTMLElement;
	activityDate: null | HTMLElement;
	filters: null | HTMLElement;
	activityType: null | HTMLElement;
	transportationType: null | HTMLElement;
	sort: null | HTMLElement;
}

export interface ArrayValues {
	value: SortBy | OrderBy;
	label: string;
}

export interface QueryStringFilterChange {
	queryString: KeyOf<QueryStringFilters>;
	value: ValueOf<QueryStringFilters>;
	closeMenu?: boolean;
	otherMenus?: KeyOf<AnchorElementState>[];
}

export interface SearchInCheckboxes {
	label: string;
	value: SearchIn;
}

export type ChipsPrefixMapping = QueryStringFilters & { sort: string; order: string };
