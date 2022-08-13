import { Box, Button, LinearProgress, Pagination, Stack, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCityMap } from 'features/city/citySlice';
import { useEffect } from 'react';
import { StudentTable } from '../components/StudentTable';
import {
  selectStudentsFilter,
  selectStudentsList,
  selectStudentsLoading,
  selectStudentsPagination,
  studentsActions,
} from '../studentsSlice';

export interface ListPageProps {}

export function ListPage(props: ListPageProps) {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectStudentsLoading);
  const studentList = useAppSelector(selectStudentsList);
  const filter = useAppSelector(selectStudentsFilter);
  const pagination = useAppSelector(selectStudentsPagination);
  const cityMap = useAppSelector(selectCityMap);

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

  return (
    <Box sx={{ position: 'relative' }}>
      {loading && <LinearProgress sx={{ position: 'absolute', top: '-10px', left: 0, right: 0 }} />}

      <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom="16px">
        <Typography variant="h5">Students</Typography>
        <Button color="success" variant="contained">
          Add student
        </Button>
      </Stack>

      <StudentTable cityMap={cityMap} studentList={studentList} />

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
