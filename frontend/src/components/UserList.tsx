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

  const handleAdd = () => {
    navigate('/users/add');
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
      <Box sx={{ mt: 4, mb: 6 }}>
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          mb={4}
          sx={{
            borderBottom: '2px solid #e0e0e0',
            pb: 2
          }}
        >
          <Typography 
            variant="h4" 
            component="h1"
            sx={{
              fontWeight: 600,
              color: '#1976d2',
            }}
          >
            User Management
          </Typography>
          <Box>
            <Button
              variant="outlined"
              onClick={handleImport}
              sx={{ 
                mr: 2,
                borderColor: '#1976d2',
                color: '#1976d2',
                '&:hover': {
                  borderColor: '#1565c0',
                  backgroundColor: 'rgba(25, 118, 210, 0.04)',
                },
              }}
            >
              Import Users
            </Button>
            <Button
              variant="contained"
              onClick={handleAdd}
              sx={{
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
                px: 3,
                py: 1,
                textTransform: 'none',
                fontWeight: 500,
              }}
            >
              Add New User
            </Button>
          </Box>
        </Box>

        <TableContainer 
          component={Paper}
          sx={{
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 600, py: 2 }}>Avatar</TableCell>
                <TableCell sx={{ fontWeight: 600, py: 2 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600, py: 2 }}>Email</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, py: 2 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow 
                  key={user.id}
                  sx={{ 
                    '&:hover': { 
                      backgroundColor: 'rgba(25, 118, 210, 0.04)',
                    },
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  <TableCell sx={{ py: 2 }}>
                    {user.avatar ? (
                      <Box
                        component="img"
                        src={user.avatar.startsWith('http') ? user.avatar : `http://localhost:5000${user.avatar}`}
                        alt={`${user.firstName} ${user.lastName}`}
                        sx={{
                          width: 45,
                          height: 45,
                          borderRadius: '50%',
                          border: '2px solid #e0e0e0',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: 45,
                          height: 45,
                          borderRadius: '50%',
                          backgroundColor: '#1976d2',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '1.2rem',
                          fontWeight: 500,
                        }}
                      >
                        {user.firstName?.[0]?.toUpperCase() || 'U'}
                      </Box>
                    )}
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 500,
                    color: '#2c3e50',
                  }}>{`${user.firstName} ${user.lastName}`}</TableCell>
                  <TableCell sx={{ color: '#666' }}>{user.email}</TableCell>
                  <TableCell align="right">
                    <IconButton 
                      onClick={() => handleEdit(user.id)}
                      sx={{
                        color: '#1976d2',
                        mr: 1,
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.1)',
                        },
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      onClick={() => handleDelete(user.id)}
                      sx={{
                        color: '#d32f2f',
                        '&:hover': {
                          backgroundColor: 'rgba(211, 47, 47, 0.1)',
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" color="textSecondary">
                      No users found. Click "Add New User" to create one.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default UserList;