// context/JobContext.jsx  (fixed for Vercel rewrites + same-origin cookies)
import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const JobContext = createContext();

// Use a single axios instance that hits the frontend host.
// Vercel rewrites will proxy `/api/*` to Render.
const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [singleJob, setSingleJob] = useState(null);

  const [loading, setLoading] = useState(true);
  const [loadingSingleJob, setLoadingSingleJob] = useState(false);
  const [savedLoading, setSavedLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const postJob = async (formData) => {
    setBtnLoading(true);
    try {
      const { data } = await api.post("/job/createjob", formData);
      toast.success(data.message);
      await getAllJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to post job");
    } finally {
      setBtnLoading(false);
    }
  };

  const updateJob = async (id, formData) => {
    setBtnLoading(true);
    try {
      const { data } = await api.put(`/job/update/${id}`, formData);
      toast.success(data.message);
      setJobs((prev) => prev.map((j) => (j._id === id ? data.job : j)));
      if (singleJob?._id === id) setSingleJob(data.job);
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to update job");
    } finally {
      setBtnLoading(false);
    }
  };

  const getAllJobs = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/job/getall");
      setJobs(data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedJobs = async () => {
    try {
      const { data } = await api.get("/job/getsaved");
      setSavedJobs(data);
    } catch (err) {
      // silent fail to avoid toast spam on unauth
      console.error("Unable to fetch saved jobs", err?.message);
    }
  };

  const toggleSaveJob = async (jobId) => {
    setSavedLoading(true);
    try {
      const { data } = await api.put(`/job/savedJob/${jobId}`, {});
      toast.success(data.message);

      if (singleJob?._id === jobId) {
        setSingleJob((prev) => (prev ? { ...prev, isSaved: data.isSaved } : prev));
      }

      setJobs((prev) =>
        prev.map((job) => (job._id === jobId ? { ...job, isSaved: data.isSaved } : job))
      );

      await fetchSavedJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to save/unsave job");
    } finally {
      setSavedLoading(false);
    }
  };

  const getJobById = async (id) => {
    setLoadingSingleJob(true);
    try {
      const { data } = await api.get(`/job/get/${id}`);
      setSingleJob(data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to fetch job");
    } finally {
      setLoadingSingleJob(false);
    }
  };

  const deleteJob = async (id) => {
    setLoading(true);
    try {
      const { data } = await api.delete(`/job/deletejob/${id}`);
      toast.success(data.message);
      await getAllJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to delete job");
    } finally {
      setLoading(false);
    }
  };

  const removeSavedJob = async (jobId) => {
    try {
      await api.put(`/job/savedJob/${jobId}`, {});
      setSavedJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (err) {
      console.error("Unable to remove saved job", err);
    }
  };

  useEffect(() => {
    getAllJobs();
    fetchSavedJobs();
  }, []);

  useEffect(() => {
    // Auto-clean expired saved jobs on render
    savedJobs.forEach((job) => {
      if (new Date(job.expireDate).getTime() < Date.now()) {
        removeSavedJob(job._id);
      }
    });
  }, [savedJobs]);

  return (
    <JobContext.Provider
      value={{
        jobs,
        savedJobs,
        postJob,
        updateJob,
        getAllJobs,
        deleteJob,
        loading,
        btnLoading,
        getJobById,
        singleJob,
        toggleSaveJob,
        savedLoading,
        fetchSavedJobs,
        loadingSingleJob,
        removeSavedJob,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const JobData = () => useContext(JobContext);
