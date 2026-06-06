import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NavBar from "./NavBar";

const JobForm = () => {
  const url = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    jobType: "Full-Time",
    notes: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${url}/job/create-job`,
        formData,
        {
          withCredentials: true,
        }
      );

      toast.success("Application created successfully");
      navigate("/applications");
    } catch (error) {
      
      toast.error("Failed to create application");
    }
  };

  return (
    <div>
      <NavBar/>
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4 py-2 font-[Inter]">
      <div className="w-full max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-10"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-black">
              New Application
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              Add and track a new job application
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="company"
                className="text-sm font-medium text-gray-700"
              >
                Company Name
              </label>

              <input
                onChange={handleChange}
                type="text"
                value={formData.company}
                id="company"
                name="company"
                placeholder="Enter company name"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-black"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="role"
                className="text-sm font-medium text-gray-700"
              >
                Role
              </label>

              <input
                onChange={handleChange}
                value={formData.role}
                type="text"
                id="role"
                name="role"
                placeholder="Enter role name"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-black"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black outline-none transition-all duration-200 focus:border-black cursor-pointer"
                >
                  <option value="Applied">
                    Applied
                  </option>

                  <option value="Interview">
                    Interview
                  </option>

                  <option value="Offer">
                    Offered
                  </option>

                  <option value="Accepted">
                    Accepted
                  </option>

                  <option value="Rejected">
                    Rejected
                  </option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Job Type
                </label>

                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black outline-none transition-all duration-200 focus:border-black cursor-pointer"
                >
                  <option value="Full-Time">
                    Full-time
                  </option>

                  <option value="Part-Time">
                    Part-time
                  </option>

                  <option value="Internship">
                    Internship
                  </option>

                  <option value="Contract">
                    Contract
                  </option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="notes"
                className="text-sm font-medium text-gray-700"
              >
                Notes
              </label>

              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add notes about the application..."
                rows={5}
                className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-black"
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full rounded-xl border border-black bg-black py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-white hover:text-black"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default JobForm;