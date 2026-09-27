import axiosInstance from './axiosInstance';

export const getCurrentUser = async () => {
  const response = await axiosInstance.get('/api/auth/get-me');
  return response.data;
};

export const loginAPI = async (email, password) => {
  const response = await axiosInstance.post('/api/auth/login', { email, password });
  return response.data;
};

export const registerAPI = async (formData) => {
  const response = await axiosInstance.post('/api/auth/register', formData);
  return response.data;
};

export const logoutAPI = async () => {
  const response = await axiosInstance.post('/api/auth/logout');
  return response.data;
};
