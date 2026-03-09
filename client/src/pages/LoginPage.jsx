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
      const { data } = await axios.post("http://localhost:5000/api/auth/login", form);
      login({ _id: data._id, name: data.name, email: data.email }, data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
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
          <p className="text-blue-200 text-sm">
            Manage all your tasks in one beautiful dashboard.<br />Stay on top of what matters most.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {[["42", "Tasks tracked"], ["9", "Completed today"], ["3", "Overdue alerts"], ["100%", "Uptime"]].map(([val, lbl]) => (
              <div key={lbl} className="bg-white/10 rounded-2xl p-4">
                <p className="text-white text-2xl font-bold">{val}</p>
                <p className="text-blue-200 text-xs mt-1">{lbl}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-blue-300 text-xs">© 2026 TaskFlow. All rights reserved.</p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <div className="flex items-center gap-2 lg:hidden mb-6">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <span className="font-bold text-gray-900">TaskFlow</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-gray-500 text-sm mt-1">Sign in to your account to continue</p>
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email address</label>
              <input id="login-email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 text-sm placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition shadow-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Password</label>
              <input id="login-password" type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" required
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 text-sm placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition shadow-sm" />
            </div>
            <button id="login-submit" type="submit" disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold
                         rounded-xl transition-all duration-200 text-sm shadow-lg shadow-blue-500/25 mt-2">
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
          <p className="text-center text-gray-500 text-sm mt-6">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold transition">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
