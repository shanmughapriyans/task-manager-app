import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const API = "http://localhost:5000/api";

const PRIORITIES = [
  { value: "low",    label: "🟢 Low" },
  { value: "medium", label: "🟡 Medium" },
  { value: "high",   label: "🔴 High" },
];

const TaskForm = ({ editTask, onClose, onRefresh }) => {
  const { token } = useAuth();
  const isEdit = Boolean(editTask);

  const [form, setForm] = useState({
    title:       "",
    description: "",
    priority:    "medium",
    dueDate:     "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  // Populate form when editing
  useEffect(() => {
    if (editTask) {
      setForm({
        title:       editTask.title || "",
        description: editTask.description || "",
        priority:    editTask.priority || "medium",
        dueDate:     editTask.dueDate
          ? new Date(editTask.dueDate).toISOString().split("T")[0]
          : "",
      });
    }
  }, [editTask]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        title:       form.title.trim(),
        description: form.description.trim(),
        priority:    form.priority,
        dueDate:     form.dueDate || null,
      };
      const headers = { Authorization: `Bearer ${token}` };

      if (isEdit) {
        await axios.put(`${API}/tasks/${editTask._id}`, payload, { headers });
      } else {
        await axios.post(`${API}/tasks`, payload, { headers });
      }

      if (onRefresh) onRefresh();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      {/* Modal card */}
      <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
          <h2 className="text-white font-semibold text-base">
            {isEdit ? "Edit Task" : "New Task"}
          </h2>
          <button
            id="close-form-btn"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && (
            <div className="px-4 py-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              id="task-title"
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Build the login page"
              autoFocus
              className="w-full px-4 py-2.5 rounded-lg bg-slate-700 border border-slate-600 text-white
                         placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500
                         focus:border-transparent transition text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Description</label>
            <textarea
              id="task-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Optional notes..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-700 border border-slate-600 text-white
                         placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500
                         focus:border-transparent transition text-sm resize-none"
            />
          </div>

          {/* Priority + Due Date row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Priority</label>
              <select
                id="task-priority"
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-lg bg-slate-700 border border-slate-600 text-white
                           focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
                           transition text-sm cursor-pointer"
              >
                {PRIORITIES.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Due Date</label>
              <input
                id="task-duedate"
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-lg bg-slate-700 border border-slate-600 text-white
                           focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
                           transition text-sm cursor-pointer [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              id="cancel-form-btn"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-slate-600 text-slate-300 hover:text-white
                         hover:border-slate-500 transition text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="save-task-btn"
              disabled={loading}
              className="flex-1 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50
                         disabled:cursor-not-allowed text-white rounded-lg text-sm font-semibold
                         transition-all shadow-lg shadow-violet-500/20"
            >
              {loading ? "Saving..." : isEdit ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
