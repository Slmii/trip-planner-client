// import storage from 'redux-persist/lib/storage';
// import { persistReducer } from 'redux-persist';
import { logger } from 'redux-logger';
// import { combineReducers, configureStore, MiddlewareArray } from '@reduxjs/toolkit';
// import { useDispatch } from 'react-redux';

// import filtersReducer from './filters/filters.slice';

// const persistConfig = {
// 	key: 'primary',
// 	storage,
// 	whitelist: ['filters'] // place to select which state you want to persist
// };

// const reducers = combineReducers({
// 	filters: filtersReducer
// });

// const persistedReducer = persistReducer(persistConfig, reducers);

import { configureStore, MiddlewareArray } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import filtersReducer from './filters/filters.slice';
import dialogReducer from './dialog/dialog.slice';
import snackbarReducer from './snackbar/snackbar.slice';
import { IS_DEVELOPMENT } from '@lib/constants';

export const makeStore = () =>
	configureStore({
		reducer: {
			filters: filtersReducer,
			dialog: dialogReducer,
			snackbar: snackbarReducer
		},
		middleware: new MiddlewareArray().concat(logger),
		devTools: IS_DEVELOPMENT
	});

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;

// export default store;
export const wrapper = createWrapper(() => store);
