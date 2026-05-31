import React, { useState } from "react";
import axios from "axios";
const JobForm = () => {
  const url = import.meta.env.VITE_API_URL;

  const handleChange=(e)=>{
    setFormData({
      ...formData,[e.target.name]:e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${url}/job/create-job`,formData,{withCredentials:true});
      alert("Application create successfully");

    } catch (error) {
      console.error(error)
    }
  };
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "",
    jobType: "",
    notes: "",
  });
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-4">
      <form
        className="bg-white w-full max-w-md p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">New Application</h1>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="company" className="font-medium">
            Company Name
          </label>
          <input
          onChange={handleChange}
            type="text"
            value={formData.company}
            id="company"
            name="company"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter company name"
          />
          <label htmlFor="Role" className="font-medium">
            Role
          </label>
          <input
          onChange={handleChange}
          value={formData.role}
            type="text"
            id="Role"
            name="role"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Role name"
          />

          <label  className="font-medium">
            Status
          </label>

          <select name="status" value={formData.status} onChange={handleChange} className="border p-2 border-gray-500 rounded-md " id="">
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offered</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
          <select name="jobType" value={formData.jobType} onChange={handleChange} className="border p-2 border-gray-500 rounded-md " id="">
            <option value="Full-Time">Full-time</option>
            <option value="Part-Time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
           
          </select>

          <label htmlFor="notes"  className="font-medium">
            Notes
          </label>
          <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} className="border-gray-500 focus:outline-none focus:ring-blue-600 focus:ring-1 rounded-md border"  ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default JobForm;
