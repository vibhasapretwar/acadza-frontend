import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { recommendStudent } from "../api";

const studentOptions = [
  "STU_001",
  "STU_002",
  "STU_003",
  "STU_004",
  "STU_005",
  "STU_006",
  "STU_007",
  "STU_008",
  "STU_009",
  "STU_010",
];

export default function Recommend() {
  const { studentId: routeStudentId } = useParams();
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState(routeStudentId || "STU_001");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (routeStudentId) {
      setStudentId(routeStudentId.toUpperCase());
    }
  }, [routeStudentId]);

  useEffect(() => {
    recommendStudent(studentId)
      .then((res) => {
        setData(res);
        setError("");
      })
      .catch(() => setError("Could not fetch recommendations."));
  }, [studentId]);

  const handleStudentChange = (e) => {
    const newId = e.target.value;
    setStudentId(newId);
    navigate(`/recommend/${newId}`);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 text-red-600 font-medium">
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 text-slate-600">
        Loading study plan...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Select Student
          </label>
          <select
            value={studentId}
            onChange={handleStudentChange}
            className="w-full rounded-2xl border border-slate-300 p-4 text-lg outline-none focus:border-indigo-500"
          >
            {studentOptions.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900">{data.name}</h1>
              <p className="mt-3 text-lg text-slate-600">Student ID: {data.student_id}</p>
              <p className="text-slate-600">Generated At: {data.generated_at}</p>
            </div>

            <div className="rounded-2xl bg-indigo-50 px-5 py-4 text-indigo-700">
              <p className="text-sm font-medium">Total Steps</p>
              <p className="text-3xl font-bold">{data.total_steps}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl bg-slate-100 p-4">
              <p className="text-sm text-slate-500">Average Score</p>
              <p className="mt-1 text-xl font-semibold text-slate-900">
                {data.summary?.avg_score_pct}%
              </p>
            </div>

            <div className="rounded-2xl bg-slate-100 p-4">
              <p className="text-sm text-slate-500">Trend</p>
              <p className="mt-1 text-xl font-semibold capitalize text-slate-900">
                {data.summary?.score_trend}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-100 p-4">
              <p className="text-sm text-slate-500">Primary Weakness</p>
              <p className="mt-1 text-xl font-semibold text-slate-900">
                {data.summary?.primary_weakness}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-100 p-4">
              <p className="text-sm text-slate-500">Focus Subject</p>
              <p className="mt-1 text-xl font-semibold text-slate-900">
                {data.summary?.focus_subject}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {data.steps?.map((step) => (
            <div
              key={step.step}
              className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
                    Step {step.step}
                  </div>
                  <h2 className="mt-3 text-2xl font-bold text-slate-900">
                    {step.dost_type}
                  </h2>
                  <p className="mt-2 text-slate-600">
                    {step.target_subject} • {step.target_chapter}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
                  Questions: {step.question_ids?.length || 0}
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-medium text-slate-500">Reasoning</p>
                  <p className="mt-2 text-slate-700 leading-7">{step.reasoning}</p>
                </div>

                <div className="rounded-2xl bg-indigo-50 p-4">
                  <p className="text-sm font-medium text-indigo-500">Action Message</p>
                  <p className="mt-2 text-indigo-700 leading-7">{step.message}</p>
                </div>
              </div>

              {step.params && Object.keys(step.params).length > 0 && (
                <div className="mt-5">
                  <p className="mb-2 text-sm font-medium text-slate-500">Parameters</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(step.params).map(([key, value]) => (
                      <span
                        key={key}
                        className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700"
                      >
                        {key}: {typeof value === "object" ? JSON.stringify(value) : String(value)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {step.question_ids?.length > 0 && (
                <div className="mt-5">
                  <p className="mb-2 text-sm font-medium text-slate-500">Question IDs</p>
                  <div className="flex flex-wrap gap-2">
                    {step.question_ids.map((qid) => (
                      <span
                        key={qid}
                        className="rounded-full bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
                      >
                        {qid}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}