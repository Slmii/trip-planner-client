import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { SortOrder, TripSortByInput } from '@generated/graphql';

import { ActivityType, KeyOf, TransportationType, ValueOf } from '@lib/types';

export type ISortBy = keyof TripSortByInput;
export type IOrderBy = SortOrder;

export type SearchIn = 'trips' | 'activities' | 'preparations';

export interface IFiltersState {
	search?: string;
	searchIn: SearchIn[];
	dateFrom: MaterialUiPickersDate;
	dateTo: MaterialUiPickersDate;
	activityDate: MaterialUiPickersDate;
	activityType?: ActivityType;
	transportationType?: TransportationType;
	sort: ISortBy;
	order: IOrderBy;
}
export interface IAnchorElementState {
	quickFilters: null | HTMLElement;
	dateFrom: null | HTMLElement;
	dateTo: null | HTMLElement;
	activityDate: null | HTMLElement;
	filters: null | HTMLElement;
	activityType: null | HTMLElement;
	transportationType: null | HTMLElement;
	sort: null | HTMLElement;
}

export interface IArrayValues {
	value: ISortBy | IOrderBy;
	label: string;
}

export interface IFilterChange {
	queryString: KeyOf<IFiltersState>;
	value: ValueOf<IFiltersState>;
	closeMenu?: boolean;
	otherMenus?: KeyOf<IAnchorElementState>[];
}

export interface ISearchInCheckboxes {
	label: string;
	value: SearchIn;
}

export type ChipsPrefixMapping = IFiltersState & { sort: string; order: string };
