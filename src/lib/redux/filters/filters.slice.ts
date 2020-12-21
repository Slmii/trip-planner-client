import { SortOrder } from '@generated/graphql';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { FiltersState, View, Rows, Extended } from './filters.types';

const initialState: FiltersState = {
	view: 'list',
	rows: '10',
	extended: {
		search: '',
		departureDate: null,
		returnDate: null,
		activityDate: null,
		activityType: null,
		transportationType: null,
		sort: 'dateFrom',
		order: SortOrder.Asc
	}
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
		},
		setExtended: (state, action: PayloadAction<Extended>) => {
			const extended = action.payload;
			state.extended = extended;
		},
		resetExtended: (state, _action: PayloadAction<void>) => {
			state.extended = initialState.extended;
		}
	},
	extraReducers: {
		[HYDRATE]: (state, action) => ({
			...state,
			...action.payload
		})
	}
});

export const { setView, setRows, setExtended, resetExtended } = filtersSlice.actions;

export default filtersSlice.reducer;
