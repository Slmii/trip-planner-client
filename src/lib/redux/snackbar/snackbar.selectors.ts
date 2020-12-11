import { createSelector } from 'reselect';

import { RootState } from '..';

const setSnackbarState = (state: RootState) => state.snackbar;

export const selectSnackbar = createSelector([setSnackbarState], filters => filters);
