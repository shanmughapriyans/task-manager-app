const priorityConfig = {
  high:   { label: "High",   dot: "bg-red-500",    badge: "text-red-400",    badgeBg: "rgba(239,68,68,0.12)",    border: "rgba(239,68,68,0.2)" },
  medium: { label: "Medium", dot: "bg-orange-400", badge: "text-orange-400", badgeBg: "rgba(249,115,22,0.12)",   border: "rgba(249,115,22,0.2)" },
  low:    { label: "Low",    dot: "bg-emerald-500",badge: "text-emerald-400",badgeBg: "rgba(52,211,153,0.12)",   border: "rgba(52,211,153,0.2)" },
};

const TaskCard = ({ task, onToggle, onEdit, onDelete }) => {
  const priority = priorityConfig[task.priority] || priorityConfig.medium;
  const formatDate = (date) => !date ? null : new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const isOverdue = task.dueDate && !task.done && new Date(task.dueDate) < new Date();

  return (
    <div className={`card task-card-hover p-4 flex items-start gap-3 group ${task.done ? "opacity-40" : ""}`}>
      {/* Done toggle */}
      <button id={`toggle-${task._id}`} onClick={() => onToggle(task)}
        className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200"
        style={{ borderColor: task.done ? "#F97316" : "#444", background: task.done ? "#F97316" : "transparent" }}>
        {task.done && (
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <h3 className={`font-semibold text-sm leading-snug ${task.done ? "line-through text-gray-600" : "text-white"}`}>
            {task.title}
          </h3>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 flex items-center gap-1"
            style={{ background: priority.badgeBg, color: priority.badge === "text-red-400" ? "#F87171" : priority.badge === "text-orange-400" ? "#FB923C" : "#34D399", border: `1px solid ${priority.border}` }}>
            <span className={`inline-block w-1.5 h-1.5 rounded-full ${priority.dot}`} />
            {priority.label}
          </span>
        </div>

        {task.description && (
          <p className="text-gray-500 text-xs mt-1 line-clamp-2">{task.description}</p>
        )}

        <div className="flex items-center justify-between mt-3">
          {task.dueDate ? (
            <span className={`flex items-center gap-1 text-xs font-medium ${isOverdue ? "text-red-400" : "text-gray-500"}`}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {isOverdue ? "Overdue · " : ""}{formatDate(task.dueDate)}
            </span>
          ) : <span />}

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            <button id={`edit-${task._id}`} onClick={() => onEdit(task)}
              className="p-1.5 text-gray-500 hover:text-orange-400 rounded-lg transition-all duration-150"
              style={{ ":hover": { background: "rgba(249,115,22,0.1)" } }}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button id={`delete-${task._id}`} onClick={() => onDelete(task._id)}
              className="p-1.5 text-gray-500 hover:text-red-400 rounded-lg transition-all duration-150">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
