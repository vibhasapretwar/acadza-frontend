const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const analyzeStudent = (id) =>
  fetch(`${BASE}/analyze/${id}`, { method: "POST" }).then((r) => r.json());

export const recommendStudent = (id) =>
  fetch(`${BASE}/recommend/${id}`, { method: "POST" }).then((r) => r.json());

export const getLeaderboard = () =>
  fetch(`${BASE}/leaderboard`).then((r) => r.json());

export const getQuestion = (id) =>
  fetch(`${BASE}/question/${id}`).then((r) => r.json());

export const listStudents = () =>
  fetch(`${BASE}/students`).then((r) => r.json());