import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { analyzeStudent } from '../api';

export default function Analyze() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyzeStudent(id)
      .then(r => setData(r.data))
      .catch(() => setError('Could not fetch analysis. Check if backend is running.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Centered>Analyzing student {id}...</Centered>;
  if (error) return <Centered className="text-red-400">{error}</Centered>;

  const { student, summary, chapter_breakdown, strengths, weaknesses } = data;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col gap-8">
      <button onClick={() => navigate('/')} className="text-slate-400 hover:text-white text-sm w-fit">← Back</button>

      <div className="bg-slate-800 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-blue-400">{student?.name ?? `Student ${id}`}</h2>
        <p className="text-slate-400 text-sm mt-1">ID: {id}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Sessions', value: summary?.total_sessions },
          { label: 'Avg Accuracy', value: summary?.avg_accuracy != null ? `${summary.avg_accuracy.toFixed(1)}%` : '—' },
          { label: 'Avg Speed (s/q)', value: summary?.avg_speed != null ? summary.avg_speed.toFixed(1) : '—' },
          { label: 'Completion', value: summary?.completion_rate != null ? `${summary.completion_rate.toFixed(1)}%` : '—' },
        ].map(({ label, value }) => (
          <div key={label} className="bg-slate-800 rounded-xl p-4 text-center">
            <p className="text-slate-400 text-xs mb-1">{label}</p>
            <p className="text-white text-xl font-bold">{value ?? '—'}</p>
          </div>
        ))}
      </div>

      <Section title="Strengths">
        {strengths?.length ? strengths.map(s => <Tag key={s} text={s} color="emerald" />) : <p className="text-slate-400">None found</p>}
      </Section>

      <Section title="Weaknesses">
        {weaknesses?.length ? weaknesses.map(w => <Tag key={w} text={w} color="red" />) : <p className="text-slate-400">None found</p>}
      </Section>

      <Section title="Chapter Breakdown">
        <div className="flex flex-col gap-3">
          {chapter_breakdown?.map(ch => (
            <div key={ch.chapter} className="bg-slate-700 rounded-xl p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold text-white">{ch.chapter}</p>
                <p className="text-slate-400 text-sm">{ch.subject} · {ch.attempts} attempts</p>
              </div>
              <div className="text-right">
                <p className="text-blue-400 font-bold">{ch.avg_accuracy != null ? `${ch.avg_accuracy.toFixed(1)}%` : '—'}</p>
                <p className="text-slate-400 text-xs">accuracy</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Centered({ children, className = 'text-slate-300' }) {
  return <div className={`min-h-screen flex items-center justify-center text-xl ${className}`}>{children}</div>;
}

function Section({ title, children }) {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-slate-200">{title}</h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Tag({ text, color }) {
  const colors = { emerald: 'bg-emerald-900 text-emerald-300', red: 'bg-red-900 text-red-300' };
  return <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[color]}`}>{text}</span>;
}