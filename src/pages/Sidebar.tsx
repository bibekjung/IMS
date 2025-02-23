import React from "react";
import { Link } from "react-router-dom";
import { Home, Users, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/provider/AuthProvider";

interface SidebarProps {
  collapsed: boolean;
}

const SideNavBar: React.FC<SidebarProps> = ({ collapsed }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      className={`bg-gray text-black h-screen flex flex-col ${
        collapsed ? "w-30" : "w-64"
      } transition-all p-4`}
    >
      <div className="text-lg font-bold mb-6 text-center">IMS</div>

      <nav className="flex flex-col space-y-2 flex-1">
        <Link
          to="/dashboard"
          className="flex items-center p-3 rounded hover:bg-gray-200"
        >
          <Home className="mr-3" /> {!collapsed && "Dashboard"}
        </Link>

        {(user.role === "ADMIN" || user.role === "SUPER_ADMIN") && (
          <Link
            to="/users"
            className="flex items-center p-3 rounded hover:bg-gray-200"
          >
            <Users className="mr-3" /> {!collapsed && "Users"}
          </Link>
        )}

        {(user.role === "ADMIN" || user.role === "SUPER_ADMIN") && (
          <Link
            to="/settings"
            className="flex items-center p-3 rounded hover:bg-gray-200"
          >
            <Settings className="mr-3" /> {!collapsed && "Settings"}
          </Link>
        )}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center p-3 rounded hover:bg-red-200 text-red-600 mt-auto"
      >
        <LogOut className="mr-3" /> {!collapsed && "Logout"}
      </button>
    </div>
  );
};

export default SideNavBar;
