import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const RegisterPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm]     = useState({ name: "", email: "", password: "" });
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/register", form);
      login({ _id: data._id, name: data.name, email: data.email }, data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
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
            Start organizing<br />your work today.
          </h2>
          <p className="text-sm mb-8" style={{ color: "#555" }}>Join TaskFlow — a beautiful, fast dashboard to manage all your tasks.</p>
          <div className="space-y-3">
            {["✓  Create and manage tasks with priorities", "✓  Track progress with live analytics", "✓  Filter by status, priority, or due date", "✓  Access your data from anywhere"].map((f) => (
              <p key={f} className="text-sm" style={{ color: "#777" }}>{f}</p>
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
            <h1 className="text-2xl font-bold text-white">Create an account</h1>
            <p className="text-sm mt-1" style={{ color: "#555" }}>Get started with TaskFlow for free</p>
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl text-sm font-medium"
              style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#F87171" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#777" }}>Full Name</label>
              <input id="register-name" type="text" name="name" value={form.name} onChange={handleChange}
                placeholder="John Doe" required className="input-dark w-full px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#777" }}>Email address</label>
              <input id="register-email" type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="you@example.com" required className="input-dark w-full px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#777" }}>
                Password <span className="font-normal" style={{ color: "#444" }}>(min. 6 chars)</span>
              </label>
              <input id="register-password" type="password" name="password" value={form.password} onChange={handleChange}
                placeholder="••••••••" required className="input-dark w-full px-4 py-3 text-sm" />
            </div>
            <button id="register-submit" type="submit" disabled={loading}
              className="w-full py-3 text-white font-semibold rounded-xl transition-all text-sm mt-2"
              style={{ background: "#F97316", opacity: loading ? 0.6 : 1, boxShadow: "0 4px 20px rgba(249,115,22,0.35)" }}>
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>
          <p className="text-center text-sm mt-6" style={{ color: "#555" }}>
            Already have an account?{" "}
            <Link to="/login" className="font-semibold" style={{ color: "#F97316" }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
