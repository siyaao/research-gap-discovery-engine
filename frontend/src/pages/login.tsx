import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.access_token);

      alert("Login Successful");

      navigate("/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={login} className="w-96 p-6 border rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-5">Login</h1>

        <input
          className="w-full border p-2 mb-3"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-green-600 text-white p-2 rounded"
          type="submit"
        >
          Login
        </button>

        <p className="mt-3">
          Don't have an account?
          <Link to="/register" className="text-blue-600 ml-2">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}