const RightPanel = ({ tasks }) => {
  const completed = tasks.filter((t) => t.done).length;
  const total     = tasks.length;
  const pct       = total > 0 ? Math.round((completed / total) * 100) : 0;

  const recent = [...tasks]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5);

  const priorityColors = {
    high:   "bg-red-100 text-red-600",
    medium: "bg-amber-100 text-amber-600",
    low:    "bg-emerald-100 text-emerald-600",
  };

  return (
    <aside className="w-72 flex-shrink-0 hidden xl:flex flex-col gap-4">
      {/* Progress donut card */}
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Overall Progress</h3>

        {/* Circular donut */}
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-28 h-28">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="38" fill="none" stroke="#F3F4F6" strokeWidth="10" />
              <circle
                cx="50" cy="50" r="38" fill="none"
                stroke="#3B82F6" strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 38}`}
                strokeDashoffset={`${2 * Math.PI * 38 * (1 - pct / 100)}`}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 800ms ease-out" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">{pct}%</span>
              <span className="text-xs text-gray-400">done</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="bg-gray-50 rounded-xl p-2">
            <p className="text-lg font-bold text-gray-900">{completed}</p>
            <p className="text-xs text-gray-400">Completed</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-2">
            <p className="text-lg font-bold text-gray-900">{total - completed}</p>
            <p className="text-xs text-gray-400">Remaining</p>
          </div>
        </div>
      </div>

      {/* Recent activity card */}
      <div className="card p-5 flex-1 overflow-hidden">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Tasks</h3>
        {recent.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-6">No tasks yet</p>
        ) : (
          <div className="space-y-3">
            {recent.map((task) => (
              <div key={task._id} className="flex items-start gap-2.5">
                <div className={`mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${task.done ? "bg-emerald-400" : "bg-blue-400"}`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-medium truncate ${task.done ? "line-through text-gray-400" : "text-gray-700"}`}>
                    {task.title}
                  </p>
                  <span className={`inline-block text-xs px-1.5 py-0.5 rounded-md mt-0.5 ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default RightPanel;
