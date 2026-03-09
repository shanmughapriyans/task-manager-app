const priorityConfig = {
  high:   { label: "High",   classes: "bg-red-500/20 text-red-400 border border-red-500/30" },
  medium: { label: "Medium", classes: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" },
  low:    { label: "Low",    classes: "bg-green-500/20 text-green-400 border border-green-500/30" },
};

const TaskCard = ({ task, onToggle, onEdit, onDelete }) => {
  const priority = priorityConfig[task.priority] || priorityConfig.medium;

  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isOverdue = task.dueDate && !task.done && new Date(task.dueDate) < new Date();

  return (
    <div
      className={`bg-slate-800 border rounded-xl p-4 flex items-start gap-4 transition-all duration-200 hover:shadow-lg hover:shadow-black/20
        ${task.done ? "border-slate-700 opacity-60" : "border-slate-700 hover:border-slate-600"}`}
    >
      {/* Done toggle */}
      <button
        id={`toggle-${task._id}`}
        onClick={() => onToggle(task)}
        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
          ${task.done
            ? "bg-violet-600 border-violet-600"
            : "border-slate-500 hover:border-violet-500"}`}
      >
        {task.done && (
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <h3 className={`font-semibold text-sm leading-snug ${task.done ? "line-through text-slate-500" : "text-white"}`}>
            {task.title}
          </h3>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${priority.classes}`}>
            {priority.label}
          </span>
        </div>

        {task.description && (
          <p className="text-slate-400 text-xs mt-1 line-clamp-2">{task.description}</p>
        )}

        {task.dueDate && (
          <p className={`text-xs mt-2 flex items-center gap-1 ${isOverdue ? "text-red-400" : "text-slate-500"}`}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {isOverdue ? "Overdue · " : ""}{formatDate(task.dueDate)}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          id={`edit-${task._id}`}
          onClick={() => onEdit(task)}
          className="p-1.5 text-slate-400 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          id={`delete-${task._id}`}
          onClick={() => onDelete(task._id)}
          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
