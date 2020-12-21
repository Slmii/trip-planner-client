export const SET_VIEW = 'SET_VIEW';
export const SET_ROWS = 'SET_ROWS';

export type View = 'list' | 'grid';
export type Rows = '10' | '25' | '50';

export type FiltersState = {
	view: View;
	rows: Rows;
};
