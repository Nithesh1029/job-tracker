import React from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AppContext";
import axios from "axios";

const NavBar = () => {
  const { user, loading } = useAuth();

  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const logOut = async () => {
    await axios.post(`${url}/auth/logout`, {}, { withCredentials: true });
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        Loading...
      </div>
    );
  }

  return (
    <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
      <h1 className="text-2xl font-semibold tracking-tight text-black cursor-pointer">
        Job Tracker
      </h1>

      {!user ? (
        <div className="flex items-center gap-3">
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
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-600">
            Welcome,{" "}
            <span className="font-medium text-black">{user.firstName}</span>
          </div>

          <button
            onClick={logOut}
            className="px-4 py-2 border cursor-pointer border-black text-black rounded-md hover:bg-black hover:text-white transition duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
