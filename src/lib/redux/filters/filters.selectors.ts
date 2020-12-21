import { createSelector } from 'reselect';

import { RootState } from '..';

const selectFiltersState = (state: RootState) => state.filters;

export const selectRows = createSelector([selectFiltersState], filters => filters.rows);

export const selectView = createSelector([selectFiltersState], filters => filters.view);

export const selectFilters = createSelector([selectFiltersState], filters => filters);
