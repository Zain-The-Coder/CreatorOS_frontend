import axiosInstance from './axiosInstance';
import axios from 'axios';

const aiAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_AI_API_BASE_URL || 'https://creatoroschatbot-production.up.railway.app',
  withCredentials: true,
});

export const getAIVideoData = async () => {
  return await axiosInstance.get('/api/ai/videos');
};

export const getTrends = async () => {
  return await axiosInstance.get('/api/ai/trends');
};

export const suggestTopic = async (data) => {
  return await axiosInstance.post('/api/ai/suggest-topic', data);
};

export const sendAIChat = async (message, creatorId) => {
  return await aiAxiosInstance.post('/chat', { question: message, creatorId });
};
