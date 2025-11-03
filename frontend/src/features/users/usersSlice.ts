import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserState, CreateUserData, UpdateUserData, User } from '../../types';
import { userService } from '../../services/api';

const initialState: UserState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,
};

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async () => {
    return await userService.getUsers();
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData: CreateUserData) => {
    return await userService.createUser(userData);
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, userData }: { id: number; userData: UpdateUserData }) => {
    return await userService.updateUser(id, userData);
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: number) => {
    await userService.deleteUser(id);
    return id;
  }
);

export const importUsers = createAsyncThunk(
  'users/importUsers',
  async () => {
    await userService.importUsers();
    return await userService.getUsers();
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(importUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

export const { setSelectedUser, clearError } = usersSlice.actions;
export default usersSlice.reducer;