import axios from "axios";
import React, { useEffect, useState } from "react";

const JobApplication = () => {
  const url = import.meta.env.VITE_API_URL;

  const [jobs, setJobs] = useState([]);

  const deleteApplication = async (id) => {
    try {
      await axios.delete(`${url}/job/delete/${id}`, {
        withCredentials: true,
      });

      setJobs((prev) => prev.filter((job) => job._id !== id));

      alert("Application deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const getJobs = async () => {
    try {
      const res = await axios.get(`${url}/job/getall`, {
        withCredentials: true,
      });

      setJobs(res.data.jobs);
    } catch (error) {
      console.error(error);
    }
  };

  const updateJob = async (id, updateFields) => {
    try {
      await axios.put(`${url}/job/update/${id}`, updateFields, {
        withCredentials: true,
      });
      setJobs((prev) =>
        prev.map((job) => (job._id === id ? { ...job, ...updateFields } : job)),
      );
      console.log("updated");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-700";

      case "Interview":
        return "bg-yellow-100 text-yellow-700";

      case "Accepted":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <h1 className="text-3xl font-bold text-gray-800">Job Applications</h1>

          <p className="text-gray-500 mt-1">Track all your job applications</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-600">
                  Sr No
                </th>

                <th className="text-left p-4 font-semibold text-gray-600">
                  Company
                </th>

                <th className="text-left p-4 font-semibold text-gray-600">
                  Role
                </th>

                <th className="text-left p-4 font-semibold text-gray-600">
                  Status
                </th>

                <th className="text-left p-4 font-semibold text-gray-600">
                  Type
                </th>

                <th className="text-left p-4 font-semibold text-gray-600">
                  Applied On
                </th>

                <th className="text-left p-4 font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job, index) => (
                <tr
                  key={job._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 text-gray-700">{index + 1}</td>

                  <td className="p-4 font-medium text-gray-800">
                    {job.company}
                  </td>

                  <td className="p-4 text-gray-700">{job.role}</td>

                  <td className="p-4">
                    <select
                      value={job.status}
                      onChange={(e) =>
                        updateJob(job._id, { status: e.target.value })
                      }
                      className={`border rounded-lg px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${getStatusColor(
                        job.status,
                      )}`}
                    >
                      <option value="Applied" className="text-black bg-white">
                        Applied
                      </option>

                      <option value="Interview" className="text-black bg-white">
                        Interview
                      </option>

                      <option value="Accepted" className="text-black bg-white">
                        Accepted
                      </option>

                      <option value="Rejected" className="text-black bg-white">
                        Rejected
                      </option>
                    </select>
                  </td>

                  <td className="p-4 text-gray-700">
                    <select
                      onChange={(e) => {
                        updateJob(job._id, {
                          jobType: e.target.value,
                        });
                      }}
                      name="jobType"
                      value={job.jobType}
                      className="border border-gray-300 bg-white px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-gray-700 cursor-pointer hover:border-indigo-400 transition"
                    >
                      <option value="Full-Time">Full-Time</option>

                      <option value="Part-Time">Part-Time</option>

                      <option value="Internship">Internship</option>

                      <option value="Contract">Contract</option>
                    </select>
                  </td>

                  <td className="p-4 text-gray-700">
                    {new Date(job.applicationDate).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => deleteApplication(job._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {jobs.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              No job applications found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobApplication;
