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

  const [form, setForm] = useState({ title: "", description: "", priority: "medium", dueDate: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  useEffect(() => {
    if (editTask) {
      setForm({
        title:       editTask.title || "",
        description: editTask.description || "",
        priority:    editTask.priority || "medium",
        dueDate:     editTask.dueDate ? new Date(editTask.dueDate).toISOString().split("T")[0] : "",
      });
    }
  }, [editTask]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title.trim()) { setError("Title is required"); return; }
    setLoading(true);
    try {
      const payload = { title: form.title.trim(), description: form.description.trim(), priority: form.priority, dueDate: form.dueDate || null };
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
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ backgroundColor: "rgba(17,24,39,0.4)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-900">{isEdit ? "Edit Task" : "New Task"}</h2>
            <p className="text-xs text-gray-400 mt-0.5">{isEdit ? "Update the task details below" : "Fill in the details for your new task"}</p>
          </div>
          <button id="close-form-btn" onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && (
            <div className="px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">{error}</div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Title <span className="text-red-400">*</span></label>
            <input
              id="task-title" type="text" name="title" value={form.title} onChange={handleChange}
              placeholder="e.g. Build the login page" autoFocus
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400
                         focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Description</label>
            <textarea
              id="task-description" name="description" value={form.description} onChange={handleChange}
              placeholder="Optional notes..." rows={3}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400
                         focus:bg-white transition resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Priority</label>
              <select
                id="task-priority" name="priority" value={form.priority} onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 focus:bg-white transition cursor-pointer"
              >
                {PRIORITIES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Due Date</label>
              <input
                id="task-duedate" type="date" name="dueDate" value={form.dueDate} onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 focus:bg-white transition cursor-pointer"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" id="cancel-form-btn" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 transition text-sm font-semibold">
              Cancel
            </button>
            <button type="submit" id="save-task-btn" disabled={loading}
              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed
                         text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-500/20">
              {loading ? "Saving…" : isEdit ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
