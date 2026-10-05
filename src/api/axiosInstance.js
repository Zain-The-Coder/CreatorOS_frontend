import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://creatoros-production-a42f.up.railway.app',
  withCredentials: true,
});

export default axiosInstance;
