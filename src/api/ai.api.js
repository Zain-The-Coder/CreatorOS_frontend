import axiosInstance from './axiosInstance';
import axios from 'axios';

const aiAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_AI_API_BASE_URL || 'https://creatoroschatbot-production.up.railway.app',
  withCredentials: true,
});

export const getAIVideoData = async (creatorId) => {
  return await aiAxiosInstance.get('/api/data', { params: { creatorId } });
};

export const getTrends = async (creatorId) => {
  return await aiAxiosInstance.get('/api/trends', { params: { creatorId } });
};

export const suggestTopic = async (data) => {
  return await aiAxiosInstance.post('/api/suggest-topic', data);
};

export const sendAIChat = async (message, creatorId) => {
  return await aiAxiosInstance.post('/chat', { question: message, creatorId });
};
