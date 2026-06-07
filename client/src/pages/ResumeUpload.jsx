import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ResumeUpload = () => {
  const URL = import.meta.env.VITE_API_URL;

  const cloudName =
    import.meta.env.VITE_CLOUDNAME;
    const navigate=useNavigate();

  const [resume, setResume] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      toast.error("Please select a file");
      return;
    }
    const maxSize=1*1024*1024;
    if(resume.size>maxSize){
      toast.error("File size should be less than 1MB");
      
      return;
    }

    if(resume.type!="application/pdf"){
      toast.error("Only PDF files are allowed");
      return;
    }


    try {
      const data = new FormData();


      data.append("file", resume);

      data.append(
        "upload_preset",
        "mern_resume_upload"
      );

      

      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
        data
      );

      const resumeUrl =
        cloudinaryRes.data.secure_url;

      
      await axios.put(
        `${URL}/job/upload-resume`,
        {
          resume: resumeUrl,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Resume uploaded successfully");
      setResume(null);
      setTimeout(() => {
        navigate("/");
      },1000);
    } catch (error) {
      
      toast.error(error.response?.data?.message || "Failed to upload resume");
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
      className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 sm:p-10 flex flex-col gap-6 transition-all duration-300"
    >
          <div className="text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-black">
              Upload Resume
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              Upload your latest resume for job applications
            </p>
          </div>

          <label
            htmlFor="resume"
            className="group border border-gray-300 rounded-2xl px-6 py-10 text-center cursor-pointer bg-white hover:border-black transition-all duration-300"
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-2xl border border-gray-300 flex items-center justify-center text-gray-700 group-hover:border-black group-hover:text-black transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={26}
                  height={26}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16V4m0 0-4 4m4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
                  />
                </svg>
              </div>

              <div>
                <p className="text-sm font-medium text-black break-all">
                  {resume
                    ? resume.name
                    : "Click to upload your resume"}
                </p>

                <p className="text-xs text-gray-500 mt-2">
                  PDF
                </p>
              </div>
            </div>
          </label>

          <input
            id="resume"
            onChange={(e) =>
              setResume(e.target.files[0])
            }
            type="file"
            accept="application/pdf"
            className="hidden"
          />

          <button
            type="submit"
            className="w-full rounded-xl border cursor-pointer border-black bg-black py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-white hover:text-black"
          >
            Submit Resume
          </button>
          <p className="text-sm text-gray-500 text-center">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-gray-500 cursor-pointer hover:text-black"
            >
              Return to Dashboard
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResumeUpload;