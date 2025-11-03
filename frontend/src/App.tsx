import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { RootState } from './app/store';
import LoginScreen from './components/LoginScreen';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import Profile from './components/Profile';
import { useDispatch } from 'react-redux';
import { logout } from './features/auth/authSlice';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  return token ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        {token && (
          <AppBar 
            position="static"
            sx={{
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <Toolbar>
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  flexGrow: 1,
                  color: '#1976d2',
                  fontWeight: 600,
                  fontSize: '1.5rem'
                }}
              >
                User Management System
              </Typography>
              <Button 
                onClick={() => window.location.href = '/users'}
                sx={{ 
                  mx: 1,
                  color: '#2c3e50',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.04)',
                  }
                }}
              >
                Users
              </Button>
              <Button 
                onClick={() => window.location.href = '/profile'}
                sx={{ 
                  mx: 1,
                  color: '#2c3e50',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.04)',
                  }
                }}
              >
                Profile
              </Button>
              <Button 
                onClick={handleLogout}
                sx={{ 
                  ml: 2,
                  color: '#d32f2f',
                  '&:hover': {
                    backgroundColor: 'rgba(211, 47, 47, 0.04)',
                  }
                }}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        )}
        
        <Container 
          sx={{
            mt: 4,
            mb: 6,
            minHeight: 'calc(100vh - 64px)',
            backgroundColor: '#f5f5f5',
            borderRadius: 2,
            py: 3
          }}
        >
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <UserList />
                </PrivateRoute>
              }
            />
            <Route
              path="/users/create"
              element={
                <PrivateRoute>
                  <UserForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/users/edit/:id"
              element={
                <PrivateRoute>
                  <UserForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/users" />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
};

export default App;