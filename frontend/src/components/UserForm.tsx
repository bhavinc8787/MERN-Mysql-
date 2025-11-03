import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { createUser, updateUser } from '../features/users/usersSlice';
import { ImageUpload, LoadingSpinner } from './common';

const userSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  password: Yup.string().when('isEditing', {
    is: false,
    then: Yup.string().required('Password is required'),
  }),
});

const UserForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const { users, isLoading } = useSelector((state: RootState) => state.users);
  const user = id ? users.find(u => u.id === parseInt(id)) : null;

  useEffect(() => {
    if (user?.avatar) {
      setPreviewUrl(user.avatar.startsWith('http') ? user.avatar : `http://localhost:5000${user.avatar}`);
    }
  }, [user]);

  const handleAvatarChange = (file: File) => {
    setAvatar(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const formik = useFormik({
    initialValues: {
      email: user?.email || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      password: '',
      isEditing: !!id,
    },
    validationSchema: userSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const userData = {
          ...values,
          ...(avatar && { avatar }),
        };

        if (id) {
          await dispatch(updateUser({ id: parseInt(id), userData })).unwrap();
        } else {
          await dispatch(createUser(userData)).unwrap();
        }

        navigate('/users');
      } catch (error) {
        console.error('Failed to save user:', error);
      }
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        mt: 6, 
        mb: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Paper 
          elevation={3}
          sx={{ 
            p: 4,
            width: '100%',
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.98)'
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{
              fontWeight: 600,
              color: '#1976d2',
              textAlign: 'center',
              mb: 4
            }}
          >
            {id ? 'Edit User Profile' : 'Create New User'}
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              {previewUrl ? (
                <Box
                  component="img"
                  src={previewUrl}
                  alt="User avatar"
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    border: '3px solid #1976d2',
                    objectFit: 'cover',
                    mb: 2
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    backgroundColor: '#1976d2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '2.5rem',
                    margin: '0 auto',
                    mb: 2
                  }}
                >
                  {formik.values.firstName?.[0]?.toUpperCase() || 'U'}
                </Box>
              )}
              <ImageUpload
                onFileSelect={handleAvatarChange}
                currentImage={user?.avatar}
              />
            </Box>

            <TextField
              fullWidth
              margin="normal"
              name="firstName"
              label="First Name"
              variant="outlined"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                },
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              name="lastName"
              label="Last Name"
              variant="outlined"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                },
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              name="email"
              label="Email Address"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                },
              }}
            />

            {!id && (
              <TextField
                fullWidth
                margin="normal"
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                }}
              />
            )}

            <Box sx={{ 
              mt: 4,
              display: 'flex',
              gap: 2
            }}>
              <Button
                onClick={() => navigate('/users')}
                variant="outlined"
                fullWidth
                sx={{
                  py: 1.5,
                  borderColor: '#1976d2',
                  color: '#1976d2',
                  '&:hover': {
                    borderColor: '#1565c0',
                    backgroundColor: 'rgba(25, 118, 210, 0.04)',
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                sx={{
                  py: 1.5,
                  backgroundColor: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                }}
              >
                {id ? 'Update User' : 'Create User'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
                {id ? 'Update User' : 'Create User'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default UserForm;