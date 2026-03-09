const STATUS_FILTERS = [
  { key: "all",       label: "All" },
  { key: "active",    label: "Active" },
  { key: "completed", label: "Completed" },
];

const PRIORITY_FILTERS = [
  { key: "all",    label: "All Priorities" },
  { key: "high",   label: "🔴 High" },
  { key: "medium", label: "🟡 Medium" },
  { key: "low",    label: "🟢 Low" },
];

const FilterBar = ({ statusFilter, priorityFilter, onStatusChange, onPriorityChange, taskCount }) => {
  return (
    <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
      <div className="flex items-center gap-2">
        {/* Status segmented control */}
        <div className="flex bg-gray-100 rounded-xl p-1 gap-0.5">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.key}
              id={`filter-status-${f.key}`}
              onClick={() => onStatusChange(f.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150
                ${statusFilter === f.key
                  ? "bg-white text-gray-900 shadow-sm shadow-gray-200"
                  : "text-gray-500 hover:text-gray-700"}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Priority dropdown */}
        <select
          id="filter-priority"
          value={priorityFilter}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="bg-white border border-gray-200 text-gray-600 text-xs rounded-xl px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400
                     transition cursor-pointer shadow-sm"
        >
          {PRIORITY_FILTERS.map((f) => (
            <option key={f.key} value={f.key}>{f.label}</option>
          ))}
        </select>
      </div>

      {/* Count */}
      <p className="text-xs text-gray-400 font-medium">
        {taskCount} {taskCount === 1 ? "task" : "tasks"}
      </p>
    </div>
  );
};

export default FilterBar;
