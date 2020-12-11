import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { SortOrder } from '@generated/graphql';
import { FiltersState, View, Rows, SortBy, OrderBy } from './filters.types';

export const initialState: FiltersState = {
	view: 'list',
	rows: '10',
	orderSort: {
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
		setSortBy: (state, action: PayloadAction<SortBy>) => {
			const sortBy = action.payload;
			state.orderSort.sort = sortBy;
		},
		setOrderBy: (state, action: PayloadAction<OrderBy>) => {
			const orderby = action.payload;
			state.orderSort.order = orderby;
		}
	},
	extraReducers: {
		[HYDRATE]: (state, action) => ({
			...state,
			...action.payload
		})
	}
});

export const { setView, setRows, setSortBy, setOrderBy } = filtersSlice.actions;

export default filtersSlice.reducer;
