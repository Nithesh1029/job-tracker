import React from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const NavBar = () => {
  const { user, loading } = useAuth();

  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const logOut = async () => {
    await axios.post(`${url}/auth/logout`, {}, { withCredentials: true });
    navigate("/login");
    toast.success("Logged out successfully");
  };

  if (loading) {
    return (
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        Loading...
      </div>
    );
  }

return (
  <nav className="border-b border-gray-200 bg-white">
    <div className="max-w-8xl mx-auto h-auto lg:h-16 px-4 sm:px-6 lg:px-8 py-4 lg:py-0 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-semibold tracking-tight text-black cursor-pointer"
      >
        Job Tracker
      </h1>

      <div className="flex flex-wrap items-center gap-6">
        <button
          onClick={() => navigate("/")}
          className="relative text-sm font-medium text-gray-600 hover:text-black transition-colors duration-200 cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
        >
          Home
        </button>

        <button
          onClick={() => {
            !user
              ? toast.error(
                  "Please login to create a new application"
                )
              : navigate("/create-job");
          }}
          className="relative text-sm font-medium text-gray-600 hover:text-black transition-colors duration-200 cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
        >
          New Application
        </button>

        <button
          onClick={() => {
            !user
              ? toast.error(
                  "Please login to access applications"
                )
              : navigate("/applications");
          }}
          className="relative text-sm font-medium text-gray-600 hover:text-black transition-colors duration-200 cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
        >
          View Applications
        </button>
      </div>

      {!user ? (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 border border-black text-black rounded-md hover:bg-black hover:text-white transition duration-200 cursor-pointer"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-5 py-2 bg-black text-white border border-black rounded-md hover:bg-white hover:text-black transition duration-200 cursor-pointer"
          >
            Register
          </button>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="text-sm text-gray-600">
            Welcome,{" "}
            <span className="font-medium text-black">
              {user.firstName}
            </span>
          </div>

          <button
            onClick={logOut}
            className="px-4 py-2 border border-black text-black rounded-md hover:bg-black hover:text-white transition duration-200 cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  </nav>
);
};

export default NavBar;
