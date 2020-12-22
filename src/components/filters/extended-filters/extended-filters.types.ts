import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { SortOrder, TripSortByInput } from '@generated/graphql';

import { ActivityType, KeyOf, TransportationType, ValueOf } from '@lib/types';

export type SortBy = keyof TripSortByInput;
export type OrderBy = SortOrder;

export interface FiltersState {
	search?: string;
	departureDate?: MaterialUiPickersDate;
	returnDate?: MaterialUiPickersDate;
	activityDate?: MaterialUiPickersDate;
	activityType?: ActivityType;
	transportationType?: TransportationType;
	sort: SortBy;
	order: OrderBy;
}
export interface AnchorElementState {
	departureDate: null | HTMLElement;
	returnDate: null | HTMLElement;
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

export interface FilterChange {
	queryString: KeyOf<FiltersState>;
	value: ValueOf<FiltersState>;
	closeMenu?: boolean;
}

export type ChipsPrefixMapping = FiltersState & { sort: string; order: string };
