import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const analyzeStudent = (id) => api.post(`/analyze/${id}`);
export const recommendStudent = (id) => api.post(`/recommend/${id}`);
export const getQuestion = (id) => api.get(`/question/${id}`);
export const getLeaderboard = () => api.get('/leaderboard');