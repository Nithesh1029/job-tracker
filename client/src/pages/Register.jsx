import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const [showError, setShowError]=useState(false);  
  const [passCheck, setPassCheck] = useState({
    len: false,
    cap: false,
    num: false,
    symb: false,
  });

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
    newErrors.push("Password must be at least 8 characters");
  }

  if (!checks.cap) {
    newErrors.push("At least one uppercase letter is required");
  }

  if (!checks.num) {
    newErrors.push("At least one number is required");
  }

  if (!checks.symb) {
    newErrors.push("At least one special character is required");
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
    setShowError(true)
    return;
  }
  setShowError(false)

  try {
    const res = await axios.post(
      `${url}/auth/register`,
      formData,
      {
        withCredentials: true,
      }
    );

    console.log(res.data);

    alert("Registration successful");

    navigate("/login");
  } catch (error) {
    console.error(error.response?.data || error.message);
    alert("Registration failed");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-6 rounded-lg shadow-md"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <div className="flex flex-col gap-2 mb-4">
          <label className="font-medium">First Name</label>

          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label className="font-medium">Last Name</label>

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label className="font-medium">Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <label className="font-medium">Password</label>

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={(e) => {
                handleChange(e);
                validatePassword(e.target.value);
              }}
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black cursor-pointer"
            >
              {showPass ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6" />

                  <path d="M12 19c7.63 0 9.93-6.62 9.95-6.68.07-.21.07-.43 0-.63-.02-.07-2.32-6.68-9.95-6.68s-9.93 6.61-9.95 6.67c-.07.21-.07.43 0 .63.02.07 2.32 6.68 9.95 6.68Zm0-12c5.35 0 7.42 3.85 7.93 5-.5 1.16-2.58 5-7.93 5s-7.42-3.84-7.93-5c.5-1.16 2.58-5 7.93-5" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="m21.95 12.32-1.9-.64C19.98 11.9 18.16 17 12 17s-7.98-5.1-8.05-5.32l-1.9.63s.28.8.93 1.81L.7 15.85l1.21 1.6 2.3-1.74c.58.62 1.29 1.24 2.16 1.77l-1.51 2.48L6.57 21l1.62-2.65c.83.3 1.78.5 2.82.59v3.05h2v-3.05c1.05-.08 1.99-.29 2.82-.59L17.45 21l1.71-1.04-1.51-2.48c.87-.53 1.58-1.15 2.16-1.77l2.3 1.74 1.21-1.6-2.28-1.73c.65-1.01.92-1.79.93-1.81Z" />
                </svg>
              )}
            </button>
          </div>

          <div className="flex gap-3 mt-2 justify-center">
            <div
              className={`w-3 h-3 rounded-full ${
                passCheck.len
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            ></div>

            <div
              className={`w-3 h-3 rounded-full ${
                passCheck.cap
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            ></div>

            <div
              className={`w-3 h-3 rounded-full ${
                passCheck.num
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            ></div>

            <div
              className={`w-3 h-3 rounded-full ${
                passCheck.symb
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            ></div>
          </div>
          {showError &&   (

          <div className="text-red-500 text-sm mt-2">
            {errors.map((err, index) => (
              <p key={index}>{err}</p>
            ))}
          </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;