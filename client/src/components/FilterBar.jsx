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

const FilterBar = ({ statusFilter, priorityFilter, onStatusChange, onPriorityChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-5">
      {/* Status filters */}
      <div className="flex bg-slate-800 border border-slate-700 rounded-lg p-1 gap-1">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.key}
            id={`filter-status-${f.key}`}
            onClick={() => onStatusChange(f.key)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150
              ${statusFilter === f.key
                ? "bg-violet-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Priority filter */}
      <select
        id="filter-priority"
        value={priorityFilter}
        onChange={(e) => onPriorityChange(e.target.value)}
        className="bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded-lg px-3 py-2
                   focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition cursor-pointer"
      >
        {PRIORITY_FILTERS.map((f) => (
          <option key={f.key} value={f.key}>{f.label}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
