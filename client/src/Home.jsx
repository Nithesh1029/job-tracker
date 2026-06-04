import React from "react";

import { useNavigate } from "react-router-dom";

import NavBar from "./components/NavBar";

import { useAuth } from "./context/AppContext";

const Home = () => {
  const navigate =
    useNavigate();

  const { user, loading } =
    useAuth();

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

      <section className="max-w-6xl mx-auto px-6 py-13">
        <div className="max-w-3xl">
          <h1 className="text-6xl font-bold leading-tight tracking-tight">
            Track your job
            applications
            effortlessly.
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            A minimal job tracking platform
            to organize applications,
            resumes, interview stages,
            and opportunities in one
            place.
          </p>

          {!user ? (
            <div className="mt-10 flex gap-4">
              <button
                onClick={() =>
                  navigate("/register")
                }
                className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
              >
                Get Started
              </button>

              <button
                onClick={() =>
                  navigate("/login")
                }
                className="border border-black px-6 py-3 rounded-md hover:bg-black hover:text-white transition"
              >
                Login
              </button>
            </div>
          ) : (
            <div className="mt-10">
              <button
                onClick={() =>
                  navigate(
                    "/applications"
                  )
                }
                className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-24">
          <div className="border border-gray-200 p-6 rounded-xl cursor-pointer" onClick={user? () => navigate("/applications") : () => navigate("/login") }>  
            <h2 className="text-xl font-semibold">
              Track Applications
            </h2>

            <p className="mt-3 text-gray-600">
              Keep all your job
              applications organized in
              one place.
            </p>
          </div>

          <div onClick={()=>{
            {user? navigate("/upload-resume") : navigate("/login")}
          }}  className="border border-gray-200 p-6 cursor-pointer rounded-xl">
            <h2 className="text-xl font-semibold">
              Upload Resume
            </h2>

            <p className="mt-3 text-gray-600">
              Store and manage your
              latest resume securely.
            </p>
          </div>

          <div className="border border-gray-200 p-6 rounded-xl cursor-pointer" onClick={user? () => navigate("/applications") : () => navigate("/login") } >
            <h2 className="text-xl font-semibold">
              Update Status
            </h2>

            <p className="mt-3 text-gray-600">
              Track interview progress,
              offers, and rejections
              easily.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;