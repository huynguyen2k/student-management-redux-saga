import { authSaga } from 'features/auth/authSaga';
import { dashboardSaga } from 'features/dashboard/dashboardSaga';
import { all } from 'redux-saga/effects';

function* rootSaga() {
  yield all([authSaga(), dashboardSaga()]);
}

export default rootSaga;
