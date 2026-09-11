import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration Successful");
      navigate("/login");
    } catch (error: any) {
      alert(error.response?.data?.detail || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={register}
        className="w-96 p-6 bg-white shadow-lg rounded-lg border border-gray-200 text-gray-900"
      >
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Register
        </h1>

        <input
          className="w-full border border-gray-300 rounded p-2 mb-3 text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border border-gray-300 rounded p-2 mb-3 text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border border-gray-300 rounded p-2 mb-4 text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white p-2 rounded"
          type="submit"
        >
          Register
        </button>

        <p className="mt-4 text-gray-700">
          Already have an account?

          <Link
            className="text-blue-600 hover:text-blue-700 ml-2"
            to="/login"
          >
            Login
          </Link>

        </p>

      </form>
    </div>
  );
}