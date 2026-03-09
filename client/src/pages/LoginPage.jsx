import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm]     = useState({ email: "", password: "" });
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/login", form);
      login({ _id: data._id, name: data.name, email: data.email }, data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#141414" }}>
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12"
        style={{ background: "#0D0D0D", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#F97316", boxShadow: "0 4px 16px rgba(249,115,22,0.4)" }}>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <span className="text-white font-bold text-lg">TaskFlow</span>
        </div>

        <div>
          <h2 className="text-white text-3xl font-bold leading-snug mb-4">
            Plan smarter.<br />Ship faster.
          </h2>
          <p className="text-sm mb-8" style={{ color: "#555" }}>
            Manage all your tasks in one beautiful dashboard.<br />Stay on top of what matters most.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[["42", "Tasks tracked"], ["12", "Done this week"], ["3", "Overdue alerts"], ["100%", "Uptime"]].map(([val, lbl]) => (
              <div key={lbl} className="rounded-2xl p-4" style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-xl font-bold" style={{ color: "#F97316" }}>{val}</p>
                <p className="text-xs mt-1" style={{ color: "#555" }}>{lbl}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs" style={{ color: "#333" }}>© 2026 TaskFlow</p>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <div className="flex items-center gap-2 lg:hidden mb-6">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "#F97316" }}>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <span className="font-bold text-white">TaskFlow</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p className="text-sm mt-1" style={{ color: "#555" }}>Sign in to your account to continue</p>
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl text-sm font-medium"
              style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#F87171" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#777" }}>Email address</label>
              <input id="login-email" type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="you@example.com" required className="input-dark w-full px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#777" }}>Password</label>
              <input id="login-password" type="password" name="password" value={form.password} onChange={handleChange}
                placeholder="••••••••" required className="input-dark w-full px-4 py-3 text-sm" />
            </div>
            <button id="login-submit" type="submit" disabled={loading}
              className="w-full py-3 text-white font-semibold rounded-xl transition-all text-sm mt-2"
              style={{ background: "#F97316", opacity: loading ? 0.6 : 1, boxShadow: "0 4px 20px rgba(249,115,22,0.35)" }}>
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
          <p className="text-center text-sm mt-6" style={{ color: "#555" }}>
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold transition" style={{ color: "#F97316" }}>Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
