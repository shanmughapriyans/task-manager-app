const StatsBar = ({ tasks }) => {
  const total     = tasks.length;
  const completed = tasks.filter((t) => t.done).length;
  const pending   = tasks.filter((t) => !t.done).length;
  const overdue   = tasks.filter((t) => !t.done && t.dueDate && new Date(t.dueDate) < new Date()).length;
  const pct       = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    {
      label: "Total Tasks",
      value: total,
      color: "text-blue-600",
      bg: "bg-blue-50",
      bar: "bg-blue-500",
      pct: 100,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      label: "Completed",
      value: completed,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      bar: "bg-emerald-500",
      pct,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Pending",
      value: pending,
      color: "text-amber-600",
      bg: "bg-amber-50",
      bar: "bg-amber-400",
      pct: total > 0 ? Math.round((pending / total) * 100) : 0,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Overdue",
      value: overdue,
      color: "text-red-600",
      bg: "bg-red-50",
      bar: "bg-red-500",
      pct: total > 0 ? Math.round((overdue / total) * 100) : 0,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {stats.map((s) => (
        <div key={s.label} className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-medium text-gray-500">{s.label}</p>
            <div className={`${s.bg} ${s.color} p-1.5 rounded-lg`}>{s.icon}</div>
          </div>
          <p className={`text-3xl font-bold ${s.color} leading-none mb-3`}>{s.value}</p>
          <div className="progress-bar">
            <div className={`progress-bar-fill ${s.bar}`} style={{ width: `${s.pct}%` }} />
          </div>
          <p className="text-xs text-gray-400 mt-1.5">{s.pct}% of total</p>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
