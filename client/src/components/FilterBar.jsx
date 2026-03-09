const STATUS_FILTERS = [
  { key: "all",       label: "All" },
  { key: "active",    label: "Active" },
  { key: "completed", label: "Completed" },
];
const PRIORITY_FILTERS = [
  { key: "all", label: "All Priorities" },
  { key: "high", label: "🔴 High" },
  { key: "medium", label: "🟡 Medium" },
  { key: "low", label: "🟢 Low" },
];

const FilterBar = ({ statusFilter, priorityFilter, onStatusChange, onPriorityChange, taskCount }) => (
  <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
    <div className="flex items-center gap-2">
      {/* Segmented status */}
      <div className="flex rounded-xl p-1 gap-0.5" style={{ background: "#1E1E1E", border: "1px solid rgba(255,255,255,0.07)" }}>
        {STATUS_FILTERS.map((f) => (
          <button key={f.key} id={`filter-status-${f.key}`} onClick={() => onStatusChange(f.key)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
            style={statusFilter === f.key
              ? { background: "#F97316", color: "#fff" }
              : { color: "#666", background: "transparent" }}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Priority dropdown */}
      <select id="filter-priority" value={priorityFilter} onChange={(e) => onPriorityChange(e.target.value)}
        className="text-xs rounded-xl px-3 py-2 transition cursor-pointer focus:outline-none"
        style={{ background: "#1E1E1E", border: "1px solid rgba(255,255,255,0.07)", color: "#999" }}>
        {PRIORITY_FILTERS.map((f) => <option key={f.key} value={f.key}>{f.label}</option>)}
      </select>
    </div>
    <p className="text-xs font-medium" style={{ color: "#555" }}>
      {taskCount} {taskCount === 1 ? "task" : "tasks"}
    </p>
  </div>
);

export default FilterBar;
