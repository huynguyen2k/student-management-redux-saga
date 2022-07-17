import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Navigate } from 'react-router-dom';
import { authActions } from '../authSlice';

function LoginPage() {
  const dispatch = useAppDispatch();

  const logging = useAppSelector(state => state.auth.logging);
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  const handleLoginClick = () => {
    dispatch(
      authActions.login({
        username: '',
        password: '',
      })
    );
  };

  if (isLoggedIn) {
    return <Navigate replace to="/admin" />;
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '400px',
          borderRadius: '10px',
          padding: '32px',
          backgroundColor: 'white',
          boxShadow: '0 0 10px 0 #ccc',
        }}
      >
        <Typography
          align="center"
          sx={{
            marginBottom: '16px',
            fontSize: '1.25rem',
            fontWeight: '500',
          }}
        >
          FAKE LOGIN FORM
        </Typography>
        <Button
          fullWidth
          color="primary"
          size="large"
          variant="contained"
          onClick={handleLoginClick}
          disabled={logging}
        >
          {logging && (
            <CircularProgress color="primary" size={20} thickness={4} sx={{ marginRight: '8px' }} />
          )}
          LOGIN
        </Button>
      </Box>
    </Box>
  );
}

export default LoginPage;
