import { SortOrder, TripSortByInput } from '@generated/graphql';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

import { ActivityType, TransportationType } from '@lib/types';

export const SET_VIEW = 'SET_VIEW';
export const SET_ROWS = 'SET_ROWS';

export type View = 'list' | 'grid';
export type Rows = '10' | '25' | '50';

export type SortBy = keyof TripSortByInput;
export type OrderBy = SortOrder;

export interface Extended {
	search: string;
	departureDate: MaterialUiPickersDate;
	returnDate: MaterialUiPickersDate;
	activityDate: MaterialUiPickersDate;
	activityType: ActivityType | null;
	transportationType: TransportationType | null;
	sort: SortBy;
	order: OrderBy;
}

export type FiltersState = {
	view: View;
	rows: Rows;
	extended: Extended;
};
