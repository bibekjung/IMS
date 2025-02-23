import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FetchregisterUser } from "@/api/auth";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await FetchregisterUser(username, email, password);

      if (response?.status === 201) {
        setSuccess("Registration successful! Redirecting to login...");

        if (response.data?.token) {
          localStorage.setItem("token", response.data.token);
        }

        setUsername("");
        setEmail("");
        setPassword("");

        setTimeout(() => navigate("/"), 2000);
      } else {
        setError(response?.data?.message || "Registration failed. Try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100 items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">IMS</h1>
          <p className="text-xl font-medium text-gray-600 mt-2">
            Create an Account
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label
              htmlFor="username"
              className="text-gray-700 font-medium block mb-2"
            >
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>

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
              required
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
              required
              minLength={6}
              className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <Button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
