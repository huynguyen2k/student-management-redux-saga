import { Box, Paper, Typography } from '@mui/material';
import * as React from 'react';

export interface StatisticItemProps {
  icon: React.ReactElement;
  label: string;
  value: number | string;
}

export function StatisticItem({ icon, label, value }: StatisticItemProps) {
  return (
    <Paper
      elevation={4}
      sx={{
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box>{icon}</Box>
      <Box>
        <Typography component="h4" variant="h5">
          {label}
        </Typography>
        <Typography component="h4" variant="subtitle2" align="center">
          {value}
        </Typography>
      </Box>
    </Paper>
  );
}
