const priorityConfig = {
  high:   { label: "High",   dot: "bg-red-500",    badge: "bg-red-50 text-red-600 border-red-100" },
  medium: { label: "Medium", dot: "bg-amber-400",  badge: "bg-amber-50 text-amber-600 border-amber-100" },
  low:    { label: "Low",    dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-600 border-emerald-100" },
};

const TaskCard = ({ task, onToggle, onEdit, onDelete }) => {
  const priority = priorityConfig[task.priority] || priorityConfig.medium;

  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const isOverdue = task.dueDate && !task.done && new Date(task.dueDate) < new Date();

  return (
    <div className={`card task-card-hover p-4 flex items-start gap-3 group ${task.done ? "opacity-55" : ""}`}>
      {/* Done toggle */}
      <button
        id={`toggle-${task._id}`}
        onClick={() => onToggle(task)}
        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
          ${task.done ? "bg-blue-600 border-blue-600" : "border-gray-300 hover:border-blue-500"}`}
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
          <h3 className={`font-semibold text-sm leading-snug ${task.done ? "line-through text-gray-400" : "text-gray-900"}`}>
            {task.title}
          </h3>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border flex-shrink-0 ${priority.badge}`}>
            <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${priority.dot}`} />
            {priority.label}
          </span>
        </div>

        {task.description && (
          <p className="text-gray-400 text-xs mt-1 line-clamp-2">{task.description}</p>
        )}

        <div className="flex items-center justify-between mt-3">
          {task.dueDate ? (
            <span className={`flex items-center gap-1 text-xs font-medium ${isOverdue ? "text-red-500" : "text-gray-400"}`}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {isOverdue ? "Overdue · " : ""}{formatDate(task.dueDate)}
            </span>
          ) : (
            <span />
          )}

          {/* Edit / Delete — visible on hover */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            <button
              id={`edit-${task._id}`}
              onClick={() => onEdit(task)}
              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-150"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              id={`delete-${task._id}`}
              onClick={() => onDelete(task._id)}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-150"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
