import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse, PaginationParams, Student } from 'models';

export interface StudentsState {
  loading: boolean;
  list: Student[];
  filter: ListParams;
  pagination: PaginationParams;
}

const initialState: StudentsState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 10,
  },
  pagination: {
    _page: 1,
    _limit: 10,
    _totalRows: 10,
  },
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    fetchStudentList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchStudentListSuccess(state, action: PayloadAction<ListResponse<Student>>) {
      state.loading = false;
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    fetchStudentListFailed(state) {
      state.loading = false;
    },
    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
    deleteStudent(state, action: PayloadAction<Student['id']>) {},
  },
});

export const selectStudentsLoading = (state: RootState) => state.students.loading;
export const selectStudentsList = (state: RootState) => state.students.list;
export const selectStudentsFilter = (state: RootState) => state.students.filter;
export const selectStudentsPagination = (state: RootState) => state.students.pagination;

export const studentsActions = studentsSlice.actions;

const studentsReducer = studentsSlice.reducer;
export default studentsReducer;
