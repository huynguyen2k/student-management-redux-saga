import { Box, Grid, LinearProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import { StatisticItem } from './components/StatisticItem';
import {
  dashboardActions,
  selectDashboardLoading,
  selectDashboardStatistics,
} from './dashboardSlice';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import LowMarkIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import HighMarkIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

export interface DashboardFeatureProps {}

export function DashboardFeature(props: DashboardFeatureProps) {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectDashboardLoading);
  const statistics = useAppSelector(selectDashboardStatistics);

  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);

  return (
    <Box sx={{ position: 'relative' }}>
      {loading && <LinearProgress sx={{ position: 'absolute', top: '6px', left: 0, right: 0 }} />}

      <Grid container spacing="16px">
        <Grid item xs={3}>
          <StatisticItem
            icon={<MaleIcon fontSize="large" color="primary" />}
            label="Male"
            value={statistics.maleCount}
          />
        </Grid>
        <Grid item xs={3}>
          <StatisticItem
            icon={<FemaleIcon fontSize="large" color="error" />}
            label="Female"
            value={statistics.femaleCount}
          />
        </Grid>
        <Grid item xs={3}>
          <StatisticItem
            icon={<LowMarkIcon fontSize="large" color="warning" />}
            label="Mark <= 5"
            value={statistics.lowMarkCount}
          />
        </Grid>
        <Grid item xs={3}>
          <StatisticItem
            icon={<HighMarkIcon fontSize="large" color="success" />}
            label="Mark >= 8"
            value={statistics.highMarkCount}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
