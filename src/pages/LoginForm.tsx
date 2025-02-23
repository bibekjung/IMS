import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FetchLoginUser } from "@/api/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/provider/AuthProvider";

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await FetchLoginUser(email, password);

      if (response.status === 200 && response.data?.token) {
        const { token, role } = response.data;
        login(token, role);
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100 items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">IMS</h1>
          <p className="text-xl font-medium text-gray-600 mt-2">Welcome</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label
              htmlFor="email"
              className="text-gray-700 font-medium block mb-2"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="user@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <Label
              htmlFor="password"
              className="text-gray-700 font-medium block mb-2"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
