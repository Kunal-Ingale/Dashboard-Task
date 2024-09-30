// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://dashboard-task-api.vercel.app/api/transactions', 
});

export default axiosInstance;
