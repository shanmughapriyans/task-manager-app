import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "";

const PRIORITIES = [
  { value: "low", label: "🟢 Low" },
  { value: "medium", label: "🟡 Medium" },
  { value: "high", label: "🔴 High" },
];

const TaskForm = ({ editTask, onClose, onRefresh }) => {
  const { token } = useAuth();
  const isEdit = Boolean(editTask);
  const [form, setForm]     = useState({ title: "", description: "", priority: "medium", dueDate: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");

  useEffect(() => {
    if (editTask) setForm({
      title: editTask.title || "", description: editTask.description || "",
      priority: editTask.priority || "medium",
      dueDate: editTask.dueDate ? new Date(editTask.dueDate).toISOString().split("T")[0] : "",
    });
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
      if (isEdit) { await axios.put(`${API}/tasks/${editTask._id}`, payload, { headers }); }
      else        { await axios.post(`${API}/tasks`, payload, { headers }); }
      if (onRefresh) onRefresh();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}>
      <div className="w-full max-w-md rounded-2xl overflow-hidden"
        style={{ background: "#1E1E1E", border: "1px solid rgba(255,255,255,0.08)" }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div>
            <h2 className="text-sm font-bold text-white">{isEdit ? "Edit Task" : "New Task"}</h2>
            <p className="text-xs mt-0.5" style={{ color: "#555" }}>{isEdit ? "Update details below" : "Fill in the details for your new task"}</p>
          </div>
          <button id="close-form-btn" onClick={onClose}
            className="p-1.5 rounded-lg transition" style={{ color: "#555" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#555"; e.currentTarget.style.background = "transparent"; }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && (
            <div className="px-4 py-2.5 rounded-xl text-xs font-medium"
              style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#F87171" }}>
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "#999" }}>Title <span style={{ color: "#F87171" }}>*</span></label>
            <input id="task-title" type="text" name="title" value={form.title} onChange={handleChange}
              placeholder="e.g. Build the login page" autoFocus
              className="input-dark w-full px-3.5 py-2.5 text-sm" />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "#999" }}>Description</label>
            <textarea id="task-description" name="description" value={form.description} onChange={handleChange}
              placeholder="Optional notes..." rows={3}
              className="input-dark w-full px-3.5 py-2.5 text-sm resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#999" }}>Priority</label>
              <select id="task-priority" name="priority" value={form.priority} onChange={handleChange}
                className="input-dark w-full px-3 py-2.5 text-sm cursor-pointer">
                {PRIORITIES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#999" }}>Due Date</label>
              <input id="task-duedate" type="date" name="dueDate" value={form.dueDate} onChange={handleChange}
                className="input-dark w-full px-3 py-2.5 text-sm cursor-pointer" />
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" id="cancel-form-btn" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition"
              style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#666", background: "transparent" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#666"; }}>
              Cancel
            </button>
            <button type="submit" id="save-task-btn" disabled={loading}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
              style={{ background: "#F97316", opacity: loading ? 0.6 : 1, boxShadow: "0 4px 16px rgba(249,115,22,0.3)" }}>
              {loading ? "Saving…" : isEdit ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
