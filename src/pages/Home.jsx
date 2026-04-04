import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [id, setId] = useState('');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-blue-400 mb-2">Acadza</h1>
        <p className="text-slate-400 text-lg">JEE / NEET Performance Analyzer</p>
      </div>

      <div className="bg-slate-800 rounded-2xl p-8 w-full max-w-md flex flex-col gap-4 shadow-xl">
        <label className="text-slate-300 font-medium">Enter Student ID (1–10)</label>
        <input
          type="number" min="1" max="10"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="e.g. 3"
          className="bg-slate-700 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-3">
          <button
            onClick={() => id && navigate(`/analyze/${id}`)}
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold transition"
          >
            Analyze
          </button>
          <button
            onClick={() => id && navigate(`/recommend/${id}`)}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-lg font-semibold transition"
          >
            Study Plan
          </button>
        </div>
        <button
          onClick={() => navigate('/leaderboard')}
          className="w-full bg-violet-600 hover:bg-violet-500 text-white py-3 rounded-lg font-semibold transition"
        >
          Leaderboard
        </button>
      </div>
    </div>
  );
}