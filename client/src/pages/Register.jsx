import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const url = import.meta.env.VITE_API_URL;

  const [showPass, setShowPass] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  const [showError, setShowError] = useState(false);

  const [passCheck, setPassCheck] = useState({
    len: false,
    cap: false,
    num: false,
    symb: false,
  });

  const validateNames = (name) => {
    const nameRegex =  /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validatePassword = (password) => {
    const checks = {
      len: password.length >= 8,
      cap: /[A-Z]/.test(password),
      num: /[0-9]/.test(password),
      symb: /[@$!%*?&]/.test(password),
    };


    setPassCheck(checks);

    const newErrors = [];

    if (!checks.len) {
      newErrors.push(
        "Password must be at least 8 characters"
      );
    }

    if (!checks.cap) {
      newErrors.push(
        "At least one uppercase letter is required"
      );
    }

    if (!checks.num) {
      newErrors.push(
        "At least one number is required"
      );
    }

    if (!checks.symb) {
      newErrors.push(
        "At least one special character is required"
      );
    }

    setErrors(newErrors);

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordErrors = validatePassword(
      formData.password
    );

    if (passwordErrors.length > 0) {
      setShowError(true);
      return;
    }

    setShowError(false);

    try {
      const res = await axios.post(
        `${url}/auth/register`,
        formData,
        {
          withCredentials: true,
        }
      );

      

      toast.success("Registration successful");

      navigate("/login");
    } catch (error) {
      
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
<div className="relative min-h-screen flex items-center justify-center px-4 py-10 font-[Inter] overflow-hidden">
  <div
    className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
    style={{ backgroundImage: "url('/m.webp')" }}
  />

  <div className="relative z-10 w-full max-w-md">
    <form
      onSubmit={handleSubmit}
      className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 sm:p-10 transition-all duration-300"
    >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold text-black tracking-tight">
              Create account
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              Join and start managing your account
            </p>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  First Name
                </label>

                <input
                autoFocus
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e)=>{
                    const value=e.target.value;
                    if(value === "" || validateNames(value)){
                      handleChange(e);
                    }
                  }}
                  placeholder="First name"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-black"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Last Name
                </label>

                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e)=>{
                    validateNames(e.target.value) && handleChange(e);
                  }}
                  placeholder="Last name"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-black"
                />
              </div>
            </div>

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
                  onChange={(e) => {
                    handleChange(e);
                    validatePassword(e.target.value);
                  }}
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

              <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                <div
                  className={`rounded-lg border px-3 py-2 transition-all duration-200 ${
                    passCheck.len
                      ? "border-black bg-black text-white"
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  8+ Characters
                </div>

                <div
                  className={`rounded-lg border px-3 py-2 transition-all duration-200 ${
                    passCheck.cap
                      ? "border-black bg-black text-white"
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  Uppercase Letter
                </div>

                <div
                  className={`rounded-lg border px-3 py-2 transition-all duration-200 ${
                    passCheck.num
                      ? "border-black bg-black text-white"
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  Number
                </div>

                <div
                  className={`rounded-lg border px-3 py-2 transition-all duration-200 ${
                    passCheck.symb
                      ? "border-black bg-black text-white"
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  Special Character
                </div>
              </div>

              {showError && (
                <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 mt-3">
                  <div className="text-sm text-black space-y-1">
                    {errors.map((err, index) => (
                      <p key={index}>{err}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="mt-7 w-full cursor-pointer rounded-xl border border-black bg-black py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-white hover:text-black"
          >
            Register
          </button>
           <p className="mt-6 text-center text-sm text-gray-500">
            Have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-black transition-opacity duration-200 hover:opacity-70"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;