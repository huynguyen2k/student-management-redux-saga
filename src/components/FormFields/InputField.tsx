import { TextField, TextFieldProps } from '@mui/material';
import { Control, useController } from 'react-hook-form';

export type InputFieldProps = {
  name: string;
  control: Control<any>;
} & Omit<TextFieldProps, 'name' | 'control'>;

export function InputField(props: InputFieldProps) {
  const { name, control, ...textFieldProps } = props;
  const { field, fieldState } = useController({ name, control });

  return (
    <TextField
      fullWidth
      margin="dense"
      size="small"
      error={Boolean(fieldState.error)}
      helperText={fieldState.error?.message}
      {...textFieldProps}
      {...field}
      ref={null}
      inputRef={field.ref}
    />
  );
}
