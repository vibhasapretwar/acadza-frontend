import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [studentId, setStudentId] = useState("STU_001");
  const navigate = useNavigate();

  const normalizedId = studentId.trim().toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center p-6">
        <div className="grid w-full gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
              Acadza AI Recommender
            </div>

            <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-900">
              Personalized analysis and study plans for every student
            </h1>

            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
              Enter a student ID to explore performance analytics, targeted recommendations,
              and leaderboard insights in a clean dashboard experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm text-slate-500">Supports</p>
                <p className="font-semibold text-slate-900">10 students</p>
              </div>
              <div className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm text-slate-500">Features</p>
                <p className="font-semibold text-slate-900">Analysis + Plans</p>
              </div>
              <div className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm text-slate-500">Mode</p>
                <p className="font-semibold text-slate-900">Real dataset</p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-8 shadow-xl shadow-slate-200/60 ring-1 ring-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">Get started</h2>
            <p className="mt-2 text-slate-600">Choose a student and open the dashboard you want.</p>

            <div className="mt-8">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Student ID
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="STU_001"
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-4 text-lg text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => navigate(`/analyze/${normalizedId}`)}
                className="rounded-2xl bg-indigo-600 px-5 py-4 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
              >
                Open Analysis
              </button>

              <button
                onClick={() => navigate(`/recommend/${normalizedId}`)}
                className="rounded-2xl bg-slate-900 px-5 py-4 font-semibold text-white shadow-lg shadow-slate-200 transition hover:bg-slate-800"
              >
                Open Study Plan
              </button>

              <button
                onClick={() => navigate("/leaderboard")}
                className="sm:col-span-2 rounded-2xl border border-slate-300 bg-white px-5 py-4 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                View Leaderboard
              </button>
            </div>

            <div className="mt-8 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="text-sm text-slate-500">Quick examples</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["STU_001", "STU_002", "STU_003", "STU_010"].map((id) => (
                  <button
                    key={id}
                    onClick={() => setStudentId(id)}
                    className="rounded-full bg-white px-3 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
                  >
                    {id}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}