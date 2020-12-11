import { createSelector } from 'reselect';

import { RootState } from '..';

const setDialogState = (state: RootState) => state.dialog;

export const selectDialog = createSelector([setDialogState], filters => filters);
