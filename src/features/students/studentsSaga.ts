import { PayloadAction } from '@reduxjs/toolkit';
import studentApi from 'api/studentApi';
import { ListParams, ListResponse, Student } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { studentsActions } from './studentsSlice';

function* fetchStudentList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload);
    yield put(studentsActions.fetchStudentListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch student list: ', error);
    yield put(studentsActions.fetchStudentListFailed());
  }
}

export function* studentsSaga() {
  yield takeLatest(studentsActions.fetchStudentList.toString(), fetchStudentList);
}
