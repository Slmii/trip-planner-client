/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { DialogProps, DialogState } from './dialog.types';

export const initialState: DialogState = {
	open: false,
	size: 'lg',
	severity: 'error',
	title: '',
	body: '',
	onConfirm: () => {},
	onConfirmText: 'Confirm',
	onCancel: () => {},
	onCancelText: 'Cancel'
};

const dialogSlice = createSlice({
	name: 'dialog',
	initialState,
	reducers: {
		setDialog: (state, action: PayloadAction<DialogProps>) => {
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

export const { setDialog } = dialogSlice.actions;

export default dialogSlice.reducer;
