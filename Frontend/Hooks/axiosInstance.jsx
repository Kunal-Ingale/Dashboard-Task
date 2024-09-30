// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://dekstop-task-api.vercel.app//api/transactions', 
});

export default axiosInstance;
