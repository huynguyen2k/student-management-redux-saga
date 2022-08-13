import { Box, Paper, Typography } from '@mui/material';
import { ReactNode } from 'react';

export interface WidgetProps {
  title: string;
  children?: ReactNode;
}

export function Widget({ title, children }: WidgetProps) {
  return (
    <Paper sx={{ padding: '16px' }}>
      <Typography variant="subtitle2">{title}</Typography>
      <Box mt="8px">{children}</Box>
    </Paper>
  );
}
