"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

interface ProtectedRouteProps {
  allowedRoles: ("SUPER_ADMIN" | "ADMIN" | "USER")[];
  children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.token || !user.role || !allowedRoles.includes(user.role)) {
      navigate("/");
    }
  }, [user, allowedRoles, navigate]);

  if (!user?.token || !user.role || !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
