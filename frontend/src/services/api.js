import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000 // 30 second timeout for cold starts
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === 'ECONNABORTED') {
      console.log('Request timeout - Backend might be waking up from sleep');
    }
    return Promise.reject(error);
  }
);

// Bike API calls
export const bikeService = {
  getAll: (params) => api.get('/bikes', { params }),
  getById: (id) => api.get(`/bikes/${id}`),
  getFeatured: () => api.get('/bikes/featured'),
  getRelated: (id) => api.get(`/bikes/${id}/related`),
  create: (data) => api.post('/bikes', data),
  update: (id, data) => api.put(`/bikes/${id}`, data),
  delete: (id) => api.delete(`/bikes/${id}`)
};

// Brand API calls
export const brandService = {
  getAll: () => api.get('/brands'),
  getById: (id) => api.get(`/brands/${id}`),
  getBikes: (id) => api.get(`/brands/${id}/bikes`),
  create: (data) => api.post('/brands', data),
  update: (id, data) => api.put(`/brands/${id}`, data),
  delete: (id) => api.delete(`/brands/${id}`)
};

// Auth API calls
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  isAuthenticated: () => !!localStorage.getItem('token'),
  getUser: () => JSON.parse(localStorage.getItem('user') || 'null'),
  isAdmin: () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return user && user.role === 'admin';
  }
};

export default api;
