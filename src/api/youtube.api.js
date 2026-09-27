import axiosInstance from './axiosInstance';

export const getMyVideos = async () => {
  return await axiosInstance.get('/api/dashboard/getmyvideos');
};

export const getSingleVideo = async (videoId) => {
  return await axiosInstance.get(`/api/dashboard/getmyvideos/${videoId}`);
};
