import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLeaderboard } from '../api';

const MEDALS = ['🥇', '🥈', '🥉'];

export default function Leaderboard() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeaderboard()
      .then(r => setData(r.data))
      .catch(() => setError('Could not load leaderboard.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-300 text-xl">Loading leaderboard...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-400 text-xl">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-6">
      <button onClick={() => navigate('/')} className="text-slate-400 hover:text-white text-sm w-fit">← Back</button>

      <div className="bg-slate-800 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-violet-400">Leaderboard</h2>
        <p className="text-slate-400 text-sm mt-1">Ranked by accuracy · speed · completion · consistency</p>
      </div>

      <div className="flex flex-col gap-3">
        {data.map((student, i) => (
          <div
            key={student.student_id}
            className={`flex items-center gap-4 rounded-xl p-4 cursor-pointer transition ${
              i === 0 ? 'bg-yellow-900 bg-opacity-30 border border-yellow-700' :
              i === 1 ? 'bg-slate-700 border border-slate-600' :
              i === 2 ? 'bg-orange-900 bg-opacity-20 border border-orange-800' :
              'bg-slate-800 border border-slate-700 hover:bg-slate-700'
            }`}
            onClick={() => navigate(`/analyze/${student.student_id}`)}
          >
            <span className="text-2xl w-8 text-center">{MEDALS[i] ?? `${i + 1}`}</span>
            <div className="flex-1">
              <p className="font-semibold text-white">{student.name}</p>
              <p className="text-slate-400 text-xs">ID: {student.student_id}</p>
            </div>
            <div className="text-right">
              <p className="text-violet-300 font-bold text-lg">{Number(student.total_score).toFixed(1)}</p>
              <p className="text-slate-400 text-xs">score</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}