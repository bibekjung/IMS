import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import UserPage from "./pages/user/userPage";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import CreateUser from "./pages/CreateUser";
import SettingPage from "./pages/Setting";
import { AuthProvider } from "./provider/AuthProvider";
import ProtectedRoute from "./provider/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster />
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          <Route element={<Layout />}>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["SUPER_ADMIN", "ADMIN", "USER"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/users"
              element={
                <ProtectedRoute allowedRoles={["SUPER_ADMIN", "ADMIN"]}>
                  <UserPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/users/create"
              element={
                <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                  <CreateUser />
                </ProtectedRoute>
              }
            />

            <Route
              path="/users/edit/:userId"
              element={
                <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                  <CreateUser />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute allowedRoles={["SUPER_ADMIN", "ADMIN"]}>
                  <SettingPage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
