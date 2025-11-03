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
  
  const { users, isLoading } = useSelector((state: RootState) => state.users);
  const user = id ? users.find(u => u.id === parseInt(id)) : null;

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
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {id ? 'Edit User' : 'Create User'}
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              fullWidth
              margin="normal"
              name="firstName"
              label="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />

            <TextField
              fullWidth
              margin="normal"
              name="lastName"
              label="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />

            {!id && (
              <TextField
                fullWidth
                margin="normal"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            )}

            <Box sx={{ my: 2 }}>
              <ImageUpload
                onFileSelect={(file) => setAvatar(file)}
                currentImage={user?.avatar}
              />
            </Box>

            <Box sx={{ mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
              >
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