import { Box } from '@mui/material';
import { Header, Sidebar } from 'components/common';
import { Outlet } from 'react-router-dom';

export interface AdminLayoutProps {}

export function AdminLayout(props: AdminLayoutProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: '300px 1fr',
        gridTemplateAreas: '"header header" "sidebar main"',
        minHeight: '100vh',
      }}
    >
      <Box sx={{ gridArea: 'header' }}>
        <Header />
      </Box>

      <Box sx={{ gridArea: 'sidebar', borderRight: theme => `1px solid ${theme.palette.divider}` }}>
        <Sidebar />
      </Box>

      <Box sx={{ gridArea: 'main', padding: '16px' }}>
        <Outlet />
      </Box>
    </Box>
  );
}
