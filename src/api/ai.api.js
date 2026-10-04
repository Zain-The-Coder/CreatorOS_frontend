import axiosInstance from './axiosInstance';

export const getAIVideoData = async () => {
  return await axiosInstance.get('/api/ai/videos');
};
