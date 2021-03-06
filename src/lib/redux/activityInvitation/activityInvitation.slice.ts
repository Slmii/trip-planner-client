/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ActivityInvitationProps, ActivityInvitationState } from './activityInvitation.types';

export const initialState: ActivityInvitationState = {
	open: false,
	activity: null,
	size: 'xl'
};

const activityInvitationSlice = createSlice({
	name: 'activityInvitation',
	initialState,
	reducers: {
		setActivityInivitation: (state, action: PayloadAction<ActivityInvitationProps>) => {
			return {
				...state,
				...action.payload
			};
		}
	}
});

export const { setActivityInivitation } = activityInvitationSlice.actions;

export default activityInvitationSlice.reducer;
