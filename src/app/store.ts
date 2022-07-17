import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import dashboardReducer from 'features/dashboard/dashboardSlice';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
});

const rootReducer = combineReducers({
  router: routerReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware);
  },
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const history = createReduxHistory(store);
