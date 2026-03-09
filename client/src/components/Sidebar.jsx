import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NAV_ITEMS = [
  {
    id: "dashboard", path: "/dashboard", title: "Dashboard",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const initials = user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <aside className="fixed left-0 top-0 h-full w-16 flex flex-col items-center py-5 z-20 gap-2"
      style={{ background: "#0D0D0D", borderRight: "1px solid rgba(255,255,255,0.05)" }}>

      {/* Logo */}
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mb-3"
        style={{ background: "#F97316", boxShadow: "0 4px 16px rgba(249,115,22,0.4)" }}>
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      </div>

      <nav className="flex flex-col items-center gap-1 flex-1">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button key={item.id} id={`nav-${item.id}`} title={item.title}
              onClick={() => navigate(item.path)}
              className={`sidebar-icon ${isActive ? "active" : ""}`}>
              {item.icon}
            </button>
          );
        })}
      </nav>

      <div className="flex flex-col items-center gap-2 mt-auto">
        <button id="sidebar-logout" title="Logout" onClick={() => { logout(); navigate("/login"); }}
          className="sidebar-icon">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
        <div title={user?.name}
          className="w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center select-none"
          style={{ background: "rgba(249,115,22,0.2)", color: "#F97316" }}>
          {initials}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
