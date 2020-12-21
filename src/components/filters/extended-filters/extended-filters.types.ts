import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { SortOrder, TripSortByInput } from '@generated/graphql';

import { ActivityType, KeyOf, TransportationType, ValueOf } from '@lib/types';

export type SortBy = keyof TripSortByInput;
export type OrderBy = SortOrder;

export interface FiltersState {
	search: string | null;
	departureDate: MaterialUiPickersDate;
	returnDate: MaterialUiPickersDate;
	activityDate: MaterialUiPickersDate;
	activityType: ActivityType | null;
	transportationType: TransportationType | null;
	sort: SortBy;
	order: OrderBy;
}
export interface AnchorElementState {
	filters: null | HTMLElement;
	activityType: null | HTMLElement;
	transportationType: null | HTMLElement;
	sort: null | HTMLElement;
}

export interface ArrayValues {
	value: SortBy | OrderBy;
	label: string;
}

export interface MenuItemClick {
	type: KeyOf<FiltersState>;
	value: ValueOf<FiltersState>;
	closeMenu?: boolean;
}

export type ChipsPrefixMapping = FiltersState & { sort: string; order: string };
