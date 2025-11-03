import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { getUsers, deleteUser, importUsers } from '../features/users/usersSlice';
import { LoadingSpinner } from './common';

const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, isLoading } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleEdit = (userId: number) => {
    navigate(`/users/edit/${userId}`);
  };

  const handleDelete = async (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await dispatch(deleteUser(userId)).unwrap();
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  const handleImport = async () => {
    try {
      await dispatch(importUsers()).unwrap();
    } catch (error) {
      console.error('Failed to import users:', error);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1">
            Users
          </Typography>
          <Box>
            <Button
              variant="outlined"
              onClick={handleImport}
              sx={{ mr: 2 }}
            >
              Import Users
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate('/users/create')}
            >
              Create User
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    {user.avatar && (
                      <img
                        src={user.avatar.startsWith('http') ? user.avatar : `http://localhost:5000${user.avatar}`}
                        alt={`${user.firstName} ${user.lastName}`}
                        style={{ width: 40, height: 40, borderRadius: '50%' }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleEdit(user.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(user.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default UserList;