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

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  isAdmin: boolean;
}

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  if (isLoading || !user) return <LoadingSpinner />;

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const typedUser = user as User;

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 6, mb: 4 }}>
        <Paper 
          elevation={3}
          sx={{ 
            p: 4,
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.98)'
          }}
        >
          <Grid container spacing={4} component="div">
            <Grid item xs={12} md={4} component="div">
              <Box 
                display="flex" 
                flexDirection="column" 
                alignItems="center"
              >
                {typedUser.avatar ? (
                  <Box
                    component="img"
                    src={user.avatar.startsWith('http') ? user.avatar : `http://localhost:5000${user.avatar}`}
                    alt="Profile"
                    sx={{
                      width: 200,
                      height: 200,
                      borderRadius: '50%',
                      mb: 3,
                      border: '4px solid #1976d2',
                      objectFit: 'cover',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: 200,
                      height: 200,
                      borderRadius: '50%',
                      mb: 3,
                      backgroundColor: '#1976d2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '4rem',
                      fontWeight: 500,
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    {user.firstName?.[0]?.toUpperCase() || 'U'}
                  </Box>
                )}
                <Button
                  variant="contained"
                  onClick={() => navigate(`/users/edit/${user.id}`)}
                  sx={{
                    mt: 2,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    backgroundColor: '#1976d2',
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: '#1565c0',
                    },
                  }}
                >
                  Edit Profile
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box>
                <Typography 
                  variant="h4" 
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    color: '#1976d2',
                    mb: 3
                  }}
                >
                  {user.firstName} {user.lastName}
                </Typography>
                <Box 
                  sx={{
                    display: 'grid',
                    gap: 2,
                    '& .label': {
                      color: '#666',
                      fontWeight: 500,
                      fontSize: '0.95rem',
                    },
                    '& .value': {
                      color: '#2c3e50',
                      fontSize: '1.1rem',
                      fontWeight: 500,
                    }
                  }}
                >
                  <Box>
                    <Typography className="label">Email</Typography>
                    <Typography className="value">{user.email}</Typography>
                  </Box>
                  <Box>
                    <Typography className="label">First Name</Typography>
                    <Typography className="value">{user.firstName}</Typography>
                  </Box>
                  <Box>
                    <Typography className="label">Last Name</Typography>
                    <Typography className="value">{user.lastName}</Typography>
                  </Box>
                  <Box>
                    <Typography className="label">Role</Typography>
                    <Typography 
                      className="value"
                      sx={{
                        display: 'inline-block',
                        backgroundColor: user.isAdmin ? '#4caf50' : '#2196f3',
                        color: 'white',
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.9rem',
                        mt: 0.5
                      }}
                    >
                      {user.isAdmin ? 'Administrator' : 'User'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className="label">Member Since</Typography>
                    <Typography className="value">
                      {new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
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