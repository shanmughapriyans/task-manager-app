const RightPanel = ({ tasks }) => {
  const completed = tasks.filter((t) => t.done).length;
  const total     = tasks.length;
  const pct       = total > 0 ? Math.round((completed / total) * 100) : 0;
  const r         = 38;
  const circ      = 2 * Math.PI * r;

  const recent = [...tasks].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 6);

  const priorityColors = {
    high:   { bg: "rgba(239,68,68,0.15)", color: "#F87171" },
    medium: { bg: "rgba(249,115,22,0.15)", color: "#FB923C" },
    low:    { bg: "rgba(52,211,153,0.15)", color: "#34D399" },
  };

  return (
    <aside className="w-64 flex-shrink-0 hidden xl:flex flex-col gap-4">
      {/* Donut card */}
      <div className="card p-5" style={{ background: "#1E1E1E" }}>
        <h3 className="text-sm font-semibold text-white mb-4">Overall Progress</h3>
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-28 h-28">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="10" />
              <circle cx="50" cy="50" r={r} fill="none"
                stroke="#F97316" strokeWidth="10"
                strokeDasharray={circ}
                strokeDashoffset={circ * (1 - pct / 100)}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 800ms ease-out" }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-white">{pct}%</span>
              <span className="text-xs" style={{ color: "#555" }}>done</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-center">
          {[["Done", completed, "#34D399", "rgba(52,211,153,0.1)"], ["Left", total - completed, "#F97316", "rgba(249,115,22,0.1)"]].map(([lbl, val, color, bg]) => (
            <div key={lbl} className="rounded-xl p-2" style={{ background: bg }}>
              <p className="text-lg font-bold" style={{ color }}>{val}</p>
              <p className="text-xs" style={{ color: "#555" }}>{lbl}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent tasks */}
      <div className="card p-5 flex-1 overflow-hidden" style={{ background: "#1E1E1E" }}>
        <h3 className="text-sm font-semibold text-white mb-4">Recent Tasks</h3>
        {recent.length === 0 ? (
          <p className="text-xs text-center py-6" style={{ color: "#444" }}>No tasks yet</p>
        ) : (
          <div className="space-y-3">
            {recent.map((task) => {
              const pc = priorityColors[task.priority] || priorityColors.medium;
              return (
                <div key={task._id} className="flex items-start gap-2.5">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: task.done ? "#34D399" : "#F97316" }} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium truncate ${task.done ? "line-through" : "text-white"}`}
                      style={{ color: task.done ? "#555" : undefined }}>
                      {task.title}
                    </p>
                    <span className="inline-block text-xs px-1.5 py-0.5 rounded-md mt-0.5"
                      style={{ background: pc.bg, color: pc.color }}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
};

export default RightPanel;
