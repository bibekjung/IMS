"use client";

import { fetchLogout } from "@/api/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  token: string | null;
  role: "SUPER_ADMIN" | "ADMIN" | "USER" | null;
}

interface AuthContextProps {
  user: User;
  login: (token: string, role: "SUPER_ADMIN" | "ADMIN" | "USER") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role") as User["role"];

    if (token && role) {
      setUser({ token, role });
    } else {
      setUser({ token: null, role: null });
    }
  }, []);

  const login = (token: string, role: "SUPER_ADMIN" | "ADMIN" | "USER") => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setUser({ token, role });
    navigate("/dashboard");
  };

  const logout = async () => {
    try {
      await fetchLogout();
    } catch (error) {
      return error;
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // setUser(null);
    navigate("/");
  };

  // const logout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("role");
  //   setUser({ token: null, role: null });
  //   navigate("/");
  // };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
