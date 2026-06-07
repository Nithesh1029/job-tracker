import React from "react";

import { useNavigate } from "react-router-dom";

import NavBar from "./components/NavBar";

import { useAuth } from "./context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();

  const { user, loading } = useAuth();
  const url = import.meta.env.VITE_API_URL;

  const getResume = async () => {
    try {
      const res = await axios.get(`${url}/job/get-resume`, {
        withCredentials: true,
      });

      window.open(res.data.resume, "_blank");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch resume");
    }
  };

  const deleteResume = async () => {
    try {
      const res = await axios.patch(
        `${url}/job/delete-resume`,
        {},
        {
          withCredentials: true,
        },
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete resume");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <NavBar />

<section className="relative overflow-hidden">
  <div
    className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
    style={{ backgroundImage: "url('/m.webp')" }}
  />

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
    <div className="max-w-3xl">
      <h1 className="text-4xl  sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
        Track your job applications effortlessly.
      </h1>

      <p className="mt-6 text-base sm:text-lg text-gray-600 leading-relaxed">
        A minimal job tracking platform to organize applications, resumes,
        interview stages, and opportunities in one place.
      </p>

      {!user ? (
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/register")}
            className="bg-black cursor-pointer text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/login")}
            className="border border-black cursor-pointer px-6 py-3 rounded-md hover:bg-black hover:text-white transition duration-300"
          >
            Login
          </button>
        </div>
      ) : (
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/applications")}
            className="bg-black cursor-pointer text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300"
          >
            Go to Dashboard
          </button>

          <button
            onClick={getResume}
            className="bg-black cursor-pointer text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300"
          >
            Download Resume
          </button>

          <button
            onClick={deleteResume}
            className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300"
          >
            Delete Resume
          </button>
        </div>
      )}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 sm:mt-24">
      <div
        className="border border-gray-200 bg-white/80 backdrop-blur-sm p-6 rounded-xl cursor-pointer hover:border-black transition-all duration-300"
        onClick={
          user
            ? () => navigate("/applications")
            : () => navigate("/login")
        }
      >
        <h2 className="text-xl font-semibold">Track Applications</h2>

        <p className="mt-3 text-gray-600 leading-relaxed">
          Keep all your job applications organized in one place.
        </p>
      </div>

      <div
        onClick={() => {
          user ? navigate("/upload-resume") : navigate("/login");
        }}
        className="border border-gray-200 bg-white/80 backdrop-blur-sm p-6 rounded-xl cursor-pointer hover:border-black transition-all duration-300"
      >
        <h2 className="text-xl font-semibold">Upload Resume</h2>

        <p className="mt-3 text-gray-600 leading-relaxed">
          Store and manage your latest resume securely.
        </p>
      </div>

      <div
        className="border border-gray-200 bg-white/80 backdrop-blur-sm p-6 rounded-xl cursor-pointer hover:border-black transition-all duration-300"
        onClick={
          user
            ? () => navigate("/applications")
            : () => navigate("/login")
        }
      >
        <h2 className="text-xl font-semibold">Update Status</h2>

        <p className="mt-3 text-gray-600 leading-relaxed">
          Track interview progress, offers, and rejections easily.
        </p>
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default Home;
