import { PayloadAction } from '@reduxjs/toolkit';
import studentApi from 'api/studentApi';
import { ListParams, ListResponse, Student } from 'models';
import { call, debounce, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { selectStudentsFilter, studentsActions } from './studentsSlice';

function* fetchStudentList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload);
    yield put(studentsActions.fetchStudentListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch student list: ', error);
    yield put(studentsActions.fetchStudentListFailed());
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(studentsActions.setFilter(action.payload));
}

function* deleteStudent(action: PayloadAction<Student['id']>) {
  try {
    yield call(studentApi.delete, action.payload as string);

    const filter: ReturnType<typeof selectStudentsFilter> = yield select(selectStudentsFilter);
    yield put(studentsActions.setFilter({ ...filter }));
  } catch (error) {
    console.log('Failed to delete student: ', error);
  }
}

export function* studentsSaga() {
  yield takeLatest(studentsActions.fetchStudentList.toString(), fetchStudentList);

  yield takeEvery(studentsActions.deleteStudent.toString(), deleteStudent);

  yield debounce(500, studentsActions.setFilterWithDebounce.toString(), handleSearchDebounce);
}
