import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;

  const [showPass, setShowPass] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { setUser } = useAuth();

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        `${url}/auth/login`,
        formData,
        {
          withCredentials: true,
        }
      );

      

      setUser(res.data.user);

      toast.success("Login successful");

      navigate("/");
    } catch (error) {
      console.error(error.response?.data || error.message);

      setError(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4 py-10 font-[Inter]">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-10 transition-all duration-300"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold text-black tracking-tight">
              Welcome back
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              Sign in to continue to your account
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-black"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-12 text-sm text-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-black"
                />

                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors duration-200"
                >
                  {showPass ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height={22}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6" />

                      <path d="M12 19c7.63 0 9.93-6.62 9.95-6.68.07-.21.07-.43 0-.63-.02-.07-2.32-6.68-9.95-6.68s-9.93 6.61-9.95 6.67c-.07.21-.07.43 0 .63.02.07 2.32 6.68 9.95 6.68Zm0-12c5.35 0 7.42 3.85 7.93 5-.5 1.16-2.58 5-7.93 5s-7.42-3.84-7.93-5c.5-1.16 2.58-5 7.93-5" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height={22}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="m21.95 12.32-1.9-.64C19.98 11.9 18.16 17 12 17s-7.98-5.1-8.05-5.32l-1.9.63s.28.8.93 1.81L.7 15.85l1.21 1.6 2.3-1.74c.58.62 1.29 1.24 2.16 1.77l-1.51 2.48L6.57 21l1.62-2.65c.83.3 1.78.5 2.82.59v3.05h2v-3.05c1.05-.08 1.99-.29 2.82-.59L17.45 21l1.71-1.04-1.51-2.48c.87-.53 1.58-1.15 2.16-1.77l2.3 1.74 1.21-1.6-2.28-1.73c.65-1.01.92-1.79.93-1.81Z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              <p className="text-sm text-black">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="mt-6 w-full rounded-xl border border-black bg-black py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-white hover:text-black"
          >
            Login
          </button>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-black transition-opacity duration-200 hover:opacity-70"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;