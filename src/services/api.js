import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
};

export const callAPI = {
  makeCall: (data) => api.post('/calls/public/initiate', data),
  getCallHistory: () => api.get('/calls/history'),
  getCallDetails: (callSid) => api.get(`/calls/${callSid}`),
  endCall: (callSid, data) => api.post(`/calls/public/end/${callSid}`, data),
};

export const paymentAPI = {
  createPaymentIntent: (data) => api.post('/payments/create-intent', data),
  addBalance: (data) => api.post('/payments/add-balance', data),
  getBalance: () => api.get('/payments/balance'),
  getPaymentHistory: () => api.get('/payments/history'),
};

export default api; 