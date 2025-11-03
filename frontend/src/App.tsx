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
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                User Management
              </Typography>
              <Button color="inherit" onClick={() => window.location.href = '/users'}>
                Users
              </Button>
              <Button color="inherit" onClick={() => window.location.href = '/profile'}>
                Profile
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        )}
        
        <Container>
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