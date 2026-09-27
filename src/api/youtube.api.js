import axiosInstance from './axiosInstance';

export const getMyVideos = async (page = 1, limit = 30) => {
  // Using the new pagination query params
  return await axiosInstance.get(`/api/dashboard/getmyvideos?page=${page}&limit=${limit}`);
};

export const getSingleVideo = async (videoId) => {
  return await axiosInstance.get(`/api/dashboard/getmyvideos/${videoId}`);
};
