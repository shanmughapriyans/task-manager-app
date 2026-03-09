const STAT_CONFIG = [
  {
    label: "Total Tasks", key: "total",
    bg: "rgba(249,115,22,0.12)", color: "#F97316", border: "rgba(249,115,22,0.2)",
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
    bar: "#F97316",
  },
  {
    label: "Completed", key: "completed",
    bg: "rgba(52,211,153,0.12)", color: "#34D399", border: "rgba(52,211,153,0.2)",
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    bar: "#34D399",
  },
  {
    label: "Pending", key: "pending",
    bg: "rgba(251,191,36,0.12)", color: "#FBBF24", border: "rgba(251,191,36,0.2)",
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    bar: "#FBBF24",
  },
  {
    label: "Overdue", key: "overdue",
    bg: "rgba(239,68,68,0.12)", color: "#F87171", border: "rgba(239,68,68,0.2)",
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
    bar: "#F87171",
  },
];

const StatsBar = ({ tasks }) => {
  const total     = tasks.length;
  const completed = tasks.filter((t) => t.done).length;
  const pending   = tasks.filter((t) => !t.done).length;
  const overdue   = tasks.filter((t) => !t.done && t.dueDate && new Date(t.dueDate) < new Date()).length;
  const counts    = { total, completed, pending, overdue };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {STAT_CONFIG.map((s) => {
        const val = counts[s.key];
        const pct = total > 0 ? Math.round((val / total) * 100) : 0;
        return (
          <div key={s.key} className="card p-4"
            style={{ background: "#1E1E1E" }}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium text-gray-500">{s.label}</p>
              <div className="p-1.5 rounded-lg" style={{ background: s.bg, color: s.color }}>
                {s.icon}
              </div>
            </div>
            <p className="text-3xl font-bold leading-none mb-3" style={{ color: s.color }}>{val}</p>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${s.key === "total" ? 100 : pct}%`, background: s.bar }} />
            </div>
            <p className="text-xs text-gray-600 mt-1.5">
              {s.key === "total" ? "all tasks" : `${pct}% of total`}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default StatsBar;
