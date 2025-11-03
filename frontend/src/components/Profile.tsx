import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';
import { getProfile } from '../features/auth/authSlice';
import { LoadingSpinner } from './common';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  if (isLoading || !user) return <LoadingSpinner />;

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box display="flex" flexDirection="column" alignItems="center">
                {user.avatar && (
                  <img
                    src={user.avatar.startsWith('http') ? user.avatar : `http://localhost:5000${user.avatar}`}
                    alt="Profile"
                    style={{ width: 200, height: 200, borderRadius: '50%', marginBottom: 16 }}
                  />
                )}
                <Button
                  variant="contained"
                  onClick={() => navigate(`/users/edit/${user.id}`)}
                  sx={{ mt: 2 }}
                >
                  Edit Profile
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom>
                Profile Information
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Name</Typography>
                <Typography color="textSecondary" gutterBottom>
                  {`${user.firstName} ${user.lastName}`}
                </Typography>

                <Typography variant="h6" sx={{ mt: 2 }}>Email</Typography>
                <Typography color="textSecondary" gutterBottom>
                  {user.email}
                </Typography>

                {user.isAdmin && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="primary">
                      Administrator Account
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;