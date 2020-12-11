import { SortOrder, TripSortByInput } from '@generated/graphql';

export const SET_VIEW = 'SET_VIEW';
export const SET_ROWS = 'SET_ROWS';

export type View = 'list' | 'grid';
export type Rows = '10' | '25' | '50';
export type SortBy = keyof TripSortByInput;
export type OrderBy = SortOrder;

export type FiltersState = {
	view: View;
	rows: Rows;
	orderSort: {
		sort: SortBy;
		order: OrderBy;
	};
};

type SetView = {
	type: typeof SET_VIEW;
	payload: View;
};

type SetRows = {
	type: typeof SET_ROWS;
	payload: Rows;
};

export type FilterActionTypes = SetView | SetRows;
