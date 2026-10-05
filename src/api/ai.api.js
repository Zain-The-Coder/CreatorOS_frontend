import axiosInstance from './axiosInstance';

export const getAIVideoData = async () => {
  return await axiosInstance.get('/api/ai/videos');
};

export const getTrends = async () => {
  return await axiosInstance.get('/api/ai/trends');
};

export const suggestTopic = async (data) => {
  return await axiosInstance.post('/api/ai/suggest-topic', data);
};

export const sendAIChat = async (message) => {
  return await axiosInstance.post('/api/ai/chat', { question: message });
};
