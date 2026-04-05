import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { analyzeStudent } from "../api";

const studentOptions = [
  "STU_001","STU_002","STU_003","STU_004","STU_005",
  "STU_006","STU_007","STU_008","STU_009","STU_010"
];

const statusColor = {
  improving: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  declining: "bg-red-50 text-red-700 ring-red-200",
  stable: "bg-amber-50 text-amber-700 ring-amber-200",
};

export default function Analyze() {
  const { studentId: routeStudentId } = useParams();
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState(routeStudentId || "STU_001");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (routeStudentId) setStudentId(routeStudentId.toUpperCase());
  }, [routeStudentId]);

  useEffect(() => {
    analyzeStudent(studentId)
      .then((res) => {
        setData(res);
        setError("");
      })
      .catch(() => setError("Could not fetch analysis."));
  }, [studentId]);

  const handleStudentChange = (e) => {
    const newId = e.target.value;
    setStudentId(newId);
    navigate(`/analyze/${newId}`);
  };

  if (error) {
    return <div className="min-h-screen bg-slate-50 p-6 text-red-600">{error}</div>;
  }

  if (!data) {
    return <div className="min-h-screen bg-slate-50 p-6 text-slate-600">Loading analysis...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-sm font-medium text-indigo-600">Analysis Dashboard</p>
            <h1 className="text-2xl font-bold text-slate-900">{data.name}</h1>
          </div>
          <div className="flex gap-2">
            <Link to="/" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Home
            </Link>
            <Link to={`/recommend/${studentId}`} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
              Study Plan
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-6 p-6">
        <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <label className="mb-2 block text-sm font-semibold text-slate-700">Select Student</label>
          <select
            value={studentId}
            onChange={handleStudentChange}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 p-4 text-lg outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          >
            {studentOptions.map((id) => (
              <option key={id} value={id}>{id}</option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-indigo-500 p-6 text-white shadow-lg">
            <p className="text-sm text-indigo-100">Average Score</p>
            <p className="mt-2 text-4xl font-bold">{data.avg_score_pct}%</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Completion Rate</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{data.completion_rate_pct}%</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Attempt Rate</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{data.avg_attempt_rate_pct}%</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Speed</p>
            <p className="mt-2 text-3xl font-bold capitalize text-slate-900">{data.speed_status}</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Trend</p>
            <span className={`mt-3 inline-flex rounded-full px-3 py-2 text-sm font-semibold ring-1 ${statusColor[data.score_trend] || "bg-slate-50 text-slate-700 ring-slate-200"}`}>
              {data.score_trend}
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900">Overview</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Student ID</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{data.student_id}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Stream</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{data.stream}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Recent Avg Score</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{data.recent_avg_score_pct}%</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Integer Avoidance</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {data.integer_question_avoidance ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">Quick Actions</h2>
            <div className="mt-5 space-y-3">
              <Link
                to={`/recommend/${studentId}`}
                className="block rounded-2xl bg-indigo-600 px-4 py-4 text-center font-semibold text-white hover:bg-indigo-700"
              >
                View Study Plan
              </Link>
              <Link
                to="/leaderboard"
                className="block rounded-2xl border border-slate-300 px-4 py-4 text-center font-semibold text-slate-700 hover:bg-slate-50"
              >
                Open Leaderboard
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">Weaknesses</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {data.weaknesses?.length ? data.weaknesses.map((item) => (
                <span key={item} className="rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-700 ring-1 ring-red-200">
                  {item}
                </span>
              )) : <p className="text-slate-500">No major weaknesses identified.</p>}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">Strengths</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {data.strengths?.length ? data.strengths.map((item) => (
                <span key={item} className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200">
                  {item}
                </span>
              )) : <p className="text-slate-500">No major strengths identified yet.</p>}
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">Behavior Patterns</h2>
          <div className="mt-5 grid gap-3">
            {data.patterns?.map((pattern, index) => (
              <div key={index} className="rounded-2xl bg-slate-50 p-4 text-slate-700 ring-1 ring-slate-200">
                {pattern}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}