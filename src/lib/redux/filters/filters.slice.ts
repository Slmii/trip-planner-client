import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { FiltersState, View, Rows } from './filters.types';

const initialState: FiltersState = {
	view: 'list',
	rows: '10'
};

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setView: (state, action: PayloadAction<View>) => {
			const view = action.payload;
			state.view = view;
		},
		setRows: (state, action: PayloadAction<Rows>) => {
			const rows = action.payload;
			state.rows = rows;
		}
	},
	extraReducers: {
		[HYDRATE]: (state, action) => ({
			...state,
			...action.payload
		})
	}
});

export const { setView, setRows } = filtersSlice.actions;

export default filtersSlice.reducer;
