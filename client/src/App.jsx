import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  // Task form state — lifted here so DashboardPage can trigger it
  const [taskForm, setTaskForm] = useState({
    open: false,
    editTask: null,
    onRefresh: null,
  });

  const openAddForm = (onRefresh) => {
    setTaskForm({ open: true, editTask: null, onRefresh });
  };

  const openEditForm = (task, onRefresh) => {
    setTaskForm({ open: true, editTask: task, onRefresh });
  };

  const closeForm = () => {
    setTaskForm({ open: false, editTask: null, onRefresh: null });
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage
                  onAddTask={openAddForm}
                  onEditTask={openEditForm}
                />
                {/* TaskForm will be rendered here in M7 */}
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
