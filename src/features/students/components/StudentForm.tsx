import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button, CircularProgress } from '@mui/material';
import { InputField, RadioGroupField, SelectField, SelectOption } from 'components/FormFields';
import { Student } from 'models';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
  .object({
    name: yup
      .string()
      .required('Name is required!')
      .test('at-least-two-words', 'Name must be at least two words!', value => {
        if (value === undefined) return true;
        return value.split(' ').filter(x => Boolean(x)).length > 0;
      }),
    gender: yup.string().required('Gender is required!'),
    age: yup
      .number()
      .integer('Age must be an integer')
      .required('Age is required!')
      .min(6, 'Age must be an integer from 6 to 40')
      .max(40, 'Age must be an integer from 6 to 40')
      .typeError('Age must be a valid number'),
    mark: yup
      .number()
      .required('Mark is required!')
      .min(0, 'Mark must be a number from 0 to 10')
      .max(10, 'Mark must be a number from 0 to 10')
      .typeError('Mark must be a valid number'),
    city: yup.string().required('City is required!'),
  })
  .required();

export interface StudentFormProps {
  cityOptions: SelectOption[];
  defaultValues: Student;
  onSubmit?: (formValues: Student) => void;
}

function StudentForm(props: StudentFormProps) {
  const { cityOptions, defaultValues, onSubmit } = props;

  const [error, setError] = useState('');

  const form = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues,
    resolver: yupResolver(schema),
    shouldFocusError: true,
  });

  const handleSubmit = async (formValues: Student) => {
    if (!onSubmit) return;

    try {
      setError('');
      await onSubmit(formValues);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <InputField
        name="name"
        control={form.control}
        label="Name"
        placeholder="Enter student name"
      />

      <RadioGroupField
        name="gender"
        control={form.control}
        options={[
          { value: 'female', label: 'Female' },
          { value: 'male', label: 'Male' },
          { value: 'other', label: 'other' },
        ]}
        label="Gender"
      />

      <InputField name="age" control={form.control} label="Age" placeholder="Enter student age" />

      <InputField
        name="mark"
        control={form.control}
        label="Mark"
        placeholder="Enter student mark"
      />

      {Array.isArray(cityOptions) && cityOptions.length > 0 && (
        <SelectField name="city" control={form.control} options={cityOptions} label="City" />
      )}

      {error && <Alert severity="error">{error}</Alert>}

      <Box sx={{ marginTop: '16px' }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && (
            <CircularProgress color="primary" size={20} sx={{ marginRight: '8px' }} />
          )}
          Submit
        </Button>
      </Box>
    </form>
  );
}

export default StudentForm;
