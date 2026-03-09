import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import StatsBar from "../components/StatsBar";
import FilterBar from "../components/FilterBar";
import TaskCard from "../components/TaskCard";
import RightPanel from "../components/RightPanel";

const API = "http://localhost:5000/api";

const DashboardPage = ({ onAddTask, onEditTask }) => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks]               = useState([]);
  const [loading, setLoading]           = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [search, setSearch]             = useState("");

  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(`${API}/tasks`, authHeaders);
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleToggle = async (task) => {
    try {
      const { data } = await axios.put(`${API}/tasks/${task._id}`, { done: !task.done }, authHeaders);
      setTasks((prev) => prev.map((t) => (t._id === data._id ? data : t)));
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/tasks/${id}`, authHeaders);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) { console.error(err); }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const statusOk   = statusFilter === "all" ? true : statusFilter === "completed" ? t.done : !t.done;
      const priorityOk = priorityFilter === "all" ? true : t.priority === priorityFilter;
      const searchOk   = search.trim() === "" ? true : t.title.toLowerCase().includes(search.toLowerCase());
      return statusOk && priorityOk && searchOk;
    });
  }, [tasks, statusFilter, priorityFilter, search]);

  return (
    <div className="flex min-h-screen bg-[#F8F9FB]">
      {/* Fixed left sidebar */}
      <Sidebar />

      {/* Main area (offset for sidebar) */}
      <div className="flex-1 flex flex-col ml-16 min-h-screen">

        {/* Top header */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-base font-bold text-gray-900">My Tasks</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Hey, <span className="text-gray-600 font-medium">{user?.name}</span> — here&apos;s your overview
            </p>
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-xs hidden sm:block">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              id="search-tasks"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks…"
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition"
            />
          </div>

          {/* CTA */}
          <button
            id="add-task-btn"
            onClick={() => onAddTask(fetchTasks)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold
                       rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Task
          </button>
        </header>

        {/* Content */}
        <div className="flex flex-1 gap-5 p-6 overflow-hidden">
          {/* Main canvas */}
          <main className="flex-1 min-w-0">
            {/* Stats row */}
            <StatsBar tasks={tasks} />

            {/* Filter bar */}
            <FilterBar
              statusFilter={statusFilter}
              priorityFilter={priorityFilter}
              onStatusChange={setStatusFilter}
              onPriorityChange={setPriorityFilter}
              taskCount={filteredTasks.length}
            />

            {/* Task list */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="card flex flex-col items-center justify-center py-16 text-center">
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-gray-700">No tasks found</p>
                <p className="text-xs text-gray-400 mt-1">
                  {tasks.length === 0 ? "Click \"New Task\" to add your first one" : "Try adjusting your filters or search"}
                </p>
                {tasks.length === 0 && (
                  <button
                    onClick={() => onAddTask(fetchTasks)}
                    className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition shadow-lg shadow-blue-500/20"
                  >
                    + Create first task
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-2.5">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onToggle={handleToggle}
                    onEdit={(task) => onEditTask(task, fetchTasks)}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </main>

          {/* Right panel */}
          <RightPanel tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
