import { createSelector } from 'reselect';

import { RootState } from '..';

const setActivityInvitationState = (state: RootState) => state.activityInvitation;

export const selectActivityInvitation = createSelector([setActivityInvitationState], filters => filters);
