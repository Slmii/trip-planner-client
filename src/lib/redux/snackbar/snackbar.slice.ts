/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { SnackbarProps, SnackbarState } from './snackbar.types';

export const initialState: SnackbarState = {
	open: false,
	message: '',
	severity: 'error'
};

const snackbarSlice = createSlice({
	name: 'dialog',
	initialState,
	reducers: {
		setSnackbar: (state, action: PayloadAction<SnackbarProps>) => {
			return {
				...state,
				...action.payload
			};
		}
	},
	extraReducers: {
		[HYDRATE]: (state, action) => ({
			...state,
			...action.payload
		})
	}
});

export const { setSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
