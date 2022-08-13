import { authSaga } from 'features/auth/authSaga';
import citySaga from 'features/city/citySaga';
import { dashboardSaga } from 'features/dashboard/dashboardSaga';
import { studentsSaga } from 'features/students/studentsSaga';
import { all } from 'redux-saga/effects';

function* rootSaga() {
  yield all([authSaga(), dashboardSaga(), studentsSaga(), citySaga()]);
}

export default rootSaga;
