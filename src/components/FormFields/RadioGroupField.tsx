import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface RadioOption {
  value: string | number;
  label: React.ReactNode;
}

export interface RadioGroupFieldProps {
  name: string;
  control: Control<any>;
  options: RadioOption[];
  label?: React.ReactNode;
  disabled?: boolean;
}

export function RadioGroupField(props: RadioGroupFieldProps) {
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
      <FormLabel>{label}</FormLabel>

      <RadioGroup {...field}>
        {options.map(option => (
          <FormControlLabel
            key={option.value}
            label={option.label}
            value={option.value}
            control={<Radio />}
          />
        ))}
      </RadioGroup>

      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );
}
