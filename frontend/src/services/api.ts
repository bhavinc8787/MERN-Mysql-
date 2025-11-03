import axios from 'axios';
import { LoginCredentials, CreateUserData, UpdateUserData } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  async login(credentials: LoginCredentials) {
    const response = await api.post('/login', credentials);
    return response.data;
  },

  async getProfile() {
    const response = await api.get('/profile');
    return response.data;
  },
};

export const userService = {
  async getUsers() {
    const response = await api.get('/users');
    return response.data;
  },

  async createUser(userData: CreateUserData) {
    const formData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value as string);
      }
    });

    const response = await api.post('/users', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async updateUser(id: number, userData: UpdateUserData) {
    const formData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== undefined) {
        formData.append(key, value as string);
      }
    });

    const response = await api.put(`/users/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async deleteUser(id: number) {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  async importUsers() {
    const response = await api.post('/users/import');
    return response.data;
  },
};