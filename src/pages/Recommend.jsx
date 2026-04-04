import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { recommendStudent } from '../api';

const STEP_COLORS = ['blue', 'emerald', 'violet', 'amber', 'rose'];
const BG = { blue: 'bg-blue-900', emerald: 'bg-emerald-900', violet: 'bg-violet-900', amber: 'bg-amber-900', rose: 'bg-rose-900' };
const TEXT = { blue: 'text-blue-300', emerald: 'text-emerald-300', violet: 'text-violet-300', amber: 'text-amber-300', rose: 'text-rose-300' };

export default function Recommend() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    recommendStudent(id)
      .then(r => setData(r.data))
      .catch(() => setError('Could not fetch recommendations.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-300 text-xl">Building study plan for student {id}...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-400 text-xl">{error}</div>;

  const { student, study_plan } = data;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 flex flex-col gap-6">
      <button onClick={() => navigate('/')} className="text-slate-400 hover:text-white text-sm w-fit">← Back</button>

      <div className="bg-slate-800 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-emerald-400">DOST Study Plan</h2>
        <p className="text-slate-400 mt-1">{student?.name ?? `Student ${id}`}</p>
      </div>

      {study_plan?.map((step, i) => {
        const color = STEP_COLORS[i % STEP_COLORS.length];
        return (
          <div key={i} className={`${BG[color]} bg-opacity-30 border border-slate-700 rounded-2xl p-6 flex flex-col gap-3`}>
            <div className="flex items-center gap-3">
              <span className={`${BG[color]} ${TEXT[color]} text-xs font-bold px-3 py-1 rounded-full`}>Step {i + 1}</span>
              <span className={`${TEXT[color]} font-semibold text-sm`}>{step.dost_type}</span>
            </div>
            <p className="text-white font-medium text-lg">{step.chapter ?? step.subject ?? 'General'}</p>
            <p className="text-slate-300 text-sm">{step.reason}</p>
            {step.question_ids?.length > 0 && (
              <div>
                <p className="text-slate-400 text-xs mb-2">Questions to attempt:</p>
                <div className="flex flex-wrap gap-2">
                  {step.question_ids.slice(0, 10).map(qid => (
                    <span key={qid} className="bg-slate-700 text-slate-200 text-xs px-2 py-1 rounded font-mono">{qid}</span>
                  ))}
                  {step.question_ids.length > 10 && (
                    <span className="text-slate-400 text-xs self-center">+{step.question_ids.length - 10} more</span>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}