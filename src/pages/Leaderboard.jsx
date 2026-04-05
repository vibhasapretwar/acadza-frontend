import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLeaderboard } from "../api";

export default function Leaderboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getLeaderboard()
      .then((res) => setData(res))
      .catch(() => setError("Could not fetch leaderboard."));
  }, []);

  if (error) {
    return <div className="min-h-screen bg-slate-50 p-6 text-red-600">{error}</div>;
  }

  if (!data) {
    return <div className="min-h-screen bg-slate-50 p-6 text-slate-600">Loading leaderboard...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-sm font-medium text-indigo-600">Ranking Dashboard</p>
            <h1 className="text-2xl font-bold text-slate-900">Leaderboard</h1>
          </div>
          <Link to="/" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Home
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-6 p-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-3xl font-bold text-slate-900">Top Performers</h2>
          <p className="mt-2 text-slate-600">Total Students: {data.total_students}</p>
        </div>

        <div className="grid gap-4">
          {data.leaderboard?.map((student, index) => (
            <div
              key={student.student_id}
              className={`rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 ${
                index < 3 ? "border-l-4 border-l-indigo-500" : ""
              }`}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                      #{student.rank}
                    </span>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{student.name}</h3>
                      <p className="text-slate-500">{student.student_id}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-indigo-50 px-5 py-4 text-indigo-700">
                  <p className="text-sm font-medium">Total Score</p>
                  <p className="text-3xl font-bold">{student.total_score}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Avg Score</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">{student.stats?.avg_score_pct}%</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Trend</p>
                  <p className="mt-1 text-lg font-semibold capitalize text-slate-900">{student.stats?.score_trend}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Completion</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">{student.stats?.completion_rate_pct}%</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Speed</p>
                  <p className="mt-1 text-lg font-semibold capitalize text-slate-900">{student.stats?.speed_status}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200">
                  Weakness: {student.weakness}
                </span>
                <span className="rounded-full bg-amber-50 px-3 py-2 text-sm text-amber-700 ring-1 ring-amber-200">
                  Focus: {student.focus_area}
                </span>
                <span className="rounded-full bg-emerald-50 px-3 py-2 text-sm text-emerald-700 ring-1 ring-emerald-200">
                  Strength: {student.strength}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}