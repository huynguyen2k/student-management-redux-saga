import { Box, Typography } from '@mui/material';
import studentApi from 'api/studentApi';
import { useAppSelector } from 'app/hooks';
import { selectCityOptions } from 'features/city/citySlice';
import { Student } from 'models';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentForm from '../components/StudentForm';

export interface AddEditPageProps {}

export function AddEditPage(props: AddEditPageProps) {
  const navigate = useNavigate();
  const { studentId } = useParams();
  const isEdit = Boolean(studentId);

  const [student, setStudent] = useState<Student>();

  const cityOptions = useAppSelector(selectCityOptions);

  useEffect(() => {
    if (!studentId) return;

    (async () => {
      try {
        const response = await studentApi.getById(studentId);
        setStudent(response);
      } catch (error) {
        console.log('Failed to fetch student: ', error);
      }
    })();
  }, [studentId]);

  const handleStudentFormSubmit = async (formValues: Student) => {
    if (isEdit) {
      await studentApi.update(formValues);
      toast.success('Update student successfully!');
    } else {
      await studentApi.add(formValues);
      toast.success('Add student successfully!');
    }

    navigate('/admin/students');
  };

  const defaultValues = useMemo(() => {
    if (!student) {
      return { name: '', age: '', gender: '', city: '', mark: '' };
    }
    return { ...student };
  }, [student]);

  return (
    <Box>
      <Typography component="h3" variant="h5">
        {isEdit ? 'Edit student' : 'Add student'}
      </Typography>

      <Box>
        {(!isEdit || Boolean(student)) && (
          <StudentForm
            cityOptions={cityOptions}
            defaultValues={defaultValues as Student}
            onSubmit={handleStudentFormSubmit}
          />
        )}
      </Box>
    </Box>
  );
}
