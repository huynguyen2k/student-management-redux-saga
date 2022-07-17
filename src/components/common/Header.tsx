import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';

export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const dispatch = useAppDispatch();

  const handleLogoutClick = () => {
    dispatch(authActions.logout());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="span" sx={{ marginRight: 'auto' }}>
            Student Management
          </Typography>

          <Button color="inherit" onClick={handleLogoutClick}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
