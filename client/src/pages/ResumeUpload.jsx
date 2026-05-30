import React, { useState } from "react";
import axios from "axios";

const ResumeUpload = () => {
  const URL = import.meta.env.VITE_API_URL;

  const cloudName =
    import.meta.env.VITE_CLOUDNAME;

  const [resume, setResume] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      alert("Please select a file");
      return;
    }

    try {
      const data = new FormData();

      data.append("file", resume);

      data.append(
        "upload_preset",
        "mern_resume_upload"
      );

      data.append("resource_type", "raw");

      
      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
        data
      );

      const resumeUrl =
        cloudinaryRes.data.secure_url;

      // Send URL to backend
      await axios.put(
        `${URL}/job/upload-resume`,
        {
          resume: resumeUrl,
        },
        {
          withCredentials: true,
        }
      );

      alert("Resume uploaded successfully");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

return (
  <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
    <form
      onSubmit={handleSubmit}
      className="bg-white w-full max-w-md p-6 rounded-xl shadow-md flex flex-col gap-5"
    >
      <h1 className="text-2xl font-bold text-center">
        Upload Resume
      </h1>

      <label
        htmlFor="resume"
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition"
      >
        <p className="text-gray-600">
          {resume
            ? resume.name
            : "Click to upload your resume"}
        </p>

        <p className="text-sm text-gray-400 mt-2">
          PDF, DOC, DOCX
        </p>
      </label>

      <input
        id="resume"
        onChange={(e) =>
          setResume(e.target.files[0])
        }
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
      >
        Submit
      </button>
    </form>
  </div>
);
};

export default ResumeUpload;