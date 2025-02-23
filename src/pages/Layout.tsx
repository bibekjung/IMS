import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideNavBar from "./Sidebar";

const Layout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="grid grid-cols-12 h-screen">
      <div
        className={`${collapsed ? "col-span-1" : "col-span-2"} transition-all`}
      >
        <SideNavBar collapsed={collapsed} />
      </div>

      <div className="col-span-10 flex flex-col">
        <header className="bg-white p-4 flex items-center justify-between shadow">
          <button onClick={() => setCollapsed(!collapsed)} className="p-2">
            {collapsed ? "☰" : "☰"}
          </button>
        </header>
        <main className="p-4 flex-1 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
