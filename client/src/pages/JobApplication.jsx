import axios from "axios";
import React, {
  useEffect,
  useState,
  useRef,
} from "react";
import NavBar from "../components/NavBar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const JobApplication = () => {
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalJobs,setTotalJobs] = useState(0);
  const [loading, setLoading] =
    useState(false);
  const [hasMore, setHasMore] =
    useState(true);

  const initialFetch = useRef(false);

  const deleteApplication = async (id) => {
    try {
      await axios.delete(
        `${url}/job/delete/${id}`,
        {
          withCredentials: true,
        }
      );

      setTotalJobs((prev)=>prev-1);

      setJobs((prev) =>
        prev.filter((job) => job._id !== id)
      );

      toast.success(
        "Application deleted successfully"
      );
      navigate("/applications");
    } catch (error) {
      toast.error("Failed to delete application");
      
    }
  };

  const getJobs = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      const res = await axios.get(
        `${url}/job/getall?page=${page}&limit=10`,
        {
          withCredentials: true,
        }
      );
      setTotalJobs(res.data.totalJobs);

      setJobs((prev) => [
        ...prev,
        ...res.data.jobs,
      ]);

      if (res.data.jobs.length < 10) {
        setHasMore(false);
      }

      setPage((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateJob = async (
    id,
    updateFields
  ) => {
    try {
      await axios.put(
        `${url}/job/update/${id}`,
        updateFields,
        {
          withCredentials: true,
        }
      );

      setJobs((prev) =>
        prev.map((job) =>
          job._id === id
            ? {
                ...job,
                ...updateFields,
              }
            : job
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (initialFetch.current) return;

    initialFetch.current = true;

    getJobs();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight +
          window.scrollY >=
          document.body.offsetHeight -
            200 &&
        !loading &&
        hasMore
      ) {
        getJobs();
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [loading, hasMore]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Applied":
        return "bg-gray-100 text-black border-gray-300";

      case "Interview":
        return "bg-black text-white border-black";

      case "Accepted":
        return "bg-white text-black border-black";

      case "Rejected":
        return "bg-gray-200 text-gray-600 border-gray-300";

      default:
        return "bg-white text-black border-gray-300";
    }
  };
return (
  
  <div className="relative min-h-screen font-[Inter] overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center opacity-5 pointer-events-none"
      style={{ backgroundImage: "url('/m.webp')" }}
    />

    <div className="relative z-10">
      <NavBar />

      <div className="px-4 py-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-3xl overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-5 sm:px-6 py-6 sm:py-7 border-b border-gray-200">
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-black">
                  Job Applications
                </h1>

                <p className="text-sm text-gray-500 mt-2">
                  Manage and track your application progress
                </p>
              </div>

              <div className="border border-gray-200 rounded-2xl px-5 py-3 bg-[#fafafa] w-full sm:w-auto">
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Total Applications
                </p>

                <h2 className="text-2xl font-semibold text-black mt-1">
                  {totalJobs}
                </h2>
              </div>
            </div>


          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px]">
              <thead className="bg-[#fafafa] border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    #
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Company
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Role
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Type
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Applied On
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {jobs.map((job, index) => (
                  <tr
                    key={job._id}
                    className="border-b border-gray-100 hover:bg-[#fafafa] transition-all duration-200"
                  >
                    <td className="px-6 py-5 text-sm text-gray-500">
                      {index + 1}
                    </td>

                    <td className="px-6 py-5">
                      <p className="text-sm font-semibold text-black whitespace-nowrap">
                        {job.company}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-sm text-gray-700 whitespace-nowrap">
                      {job.role}
                    </td>

                    <td className="px-6 py-5">
                      <select
                        value={job.status}
                        onChange={(e) =>
                          updateJob(job._id, {
                            status:
                              e.target.value,
                          })
                        }
                        className={`rounded-xl border px-4 py-2 text-sm font-medium outline-none transition-all duration-200 focus:border-black cursor-pointer ${getStatusStyle(
                          job.status
                        )}`}
                      >
                        <option value="Applied">
                          Applied
                        </option>

                        <option value="Interview">
                          Interview
                        </option>

                        <option value="Accepted">
                          Accepted
                        </option>

                        <option value="Rejected">
                          Rejected
                        </option>
                      </select>
                    </td>

                    <td className="px-6 py-5">
                      <select
                        onChange={(e) => {
                          updateJob(
                            job._id,
                            {
                              jobType:
                                e.target.value,
                            }
                          );
                        }}
                        name="jobType"
                        value={job.jobType}
                        className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-black outline-none transition-all duration-200 focus:border-black cursor-pointer hover:border-black"
                      >
                        <option value="Full-Time">
                          Full-Time
                        </option>

                        <option value="Part-Time">
                          Part-Time
                        </option>

                        <option value="Internship">
                          Internship
                        </option>

                        <option value="Contract">
                          Contract
                        </option>
                      </select>
                    </td>

                    <td className="px-6 py-5 text-sm text-gray-500 whitespace-nowrap">
                      {new Date(
                        job.applicationDate
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-5">
                      <button
                        onClick={() =>
                          deleteApplication(
                            job._id
                          )
                        }
                        className="rounded-xl cursor-pointer border border-black bg-black px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-white hover:text-black whitespace-nowrap"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {loading && (
              <div className="py-8 text-center">
                <p className="text-sm text-gray-500">
                  Loading more
                  applications...
                </p>
              </div>
            )}

            {!hasMore &&
              jobs.length > 0 && (
                <div className="py-8 text-center border-t border-gray-100">
                  <p className="text-sm text-gray-400">
                    No more jobs to
                    load
                  </p>
                </div>
              )}

            {!loading &&
              jobs.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 sm:py-24 px-6 text-center">
                  <div className="w-16 h-16 rounded-2xl border border-gray-200 flex items-center justify-center mb-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={28}
                      height={28}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h6m-6 4h6M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
                      />
                    </svg>
                  </div>

                  <h2 className="text-xl font-semibold text-black">
                    No applications yet
                  </h2>

                  <p className="text-sm text-gray-500 mt-2 max-w-sm">
                    Your job applications
                    will appear here once
                    you start applying.
                  </p>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
);
};

export default JobApplication;