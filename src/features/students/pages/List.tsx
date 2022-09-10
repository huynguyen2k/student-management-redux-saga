import { Box, Button, LinearProgress, Pagination, Stack, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import { ListParams, Student } from 'models';
import { useEffect } from 'react';
import StudentFilters from '../components/StudentFilters';
import { StudentTable } from '../components/StudentTable';
import {
  selectStudentsFilter,
  selectStudentsList,
  selectStudentsLoading,
  selectStudentsPagination,
  studentsActions,
} from '../studentsSlice';
import { Link, useNavigate } from 'react-router-dom';

export interface ListPageProps {}

export function ListPage(props: ListPageProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loading = useAppSelector(selectStudentsLoading);
  const studentList = useAppSelector(selectStudentsList);
  const filter = useAppSelector(selectStudentsFilter);
  const pagination = useAppSelector(selectStudentsPagination);

  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);

  useEffect(() => {
    dispatch(studentsActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (event: any, page: number) => {
    dispatch(
      studentsActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentsActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentsActions.setFilter(newFilter));
  };

  const handleStudentEdit = (student: Student) => {
    navigate(`/admin/students/edit/${student.id ?? ''}`);
  };

  const handleStudentDelete = (id: Student['id']) => {
    dispatch(studentsActions.deleteStudent(id));
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {loading && <LinearProgress sx={{ position: 'absolute', top: '-10px', left: 0, right: 0 }} />}

      <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom="16px">
        <Typography variant="h5">Students</Typography>
        <Link to="/admin/students/add">
          <Button color="success" variant="contained">
            Add student
          </Button>
        </Link>
      </Stack>

      <Box sx={{ marginBottom: '16px' }}>
        <StudentFilters
          filter={filter}
          cityList={cityList}
          onChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
      </Box>

      <StudentTable
        cityMap={cityMap}
        studentList={studentList}
        onEdit={handleStudentEdit}
        onDelete={handleStudentDelete}
      />

      <Box
        sx={{
          marginTop: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Pagination
          variant="outlined"
          color="primary"
          page={pagination._page}
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
