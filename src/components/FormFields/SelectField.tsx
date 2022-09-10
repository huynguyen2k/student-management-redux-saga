import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface SelectOption {
  label: string;
  value: number | string;
}

export interface SelectFieldProps {
  name: string;
  control: Control<any>;
  options: SelectOption[];
  label?: React.ReactNode;
  disabled?: boolean;
}

export function SelectField(props: SelectFieldProps) {
  const { name, control, options, label = '', disabled = false } = props;
  const { field, fieldState } = useController({ name, control });

  return (
    <FormControl
      fullWidth
      margin="dense"
      size="small"
      disabled={disabled}
      error={Boolean(fieldState.error)}
    >
      <InputLabel>{label}</InputLabel>

      <Select label={label} {...field}>
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );
}
