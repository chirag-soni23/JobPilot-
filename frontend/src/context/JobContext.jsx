// src/context/JobContext.jsx
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const JobContext = createContext();

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // e.g. https://jobpilot-1-8vnh.onrender.com
  withCredentials: true,
});

// Optional: central error toast for 401/403
API.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401 || status === 403) {
      toast.error(err?.response?.data?.message || "Session expired. Please login.");
    }
    return Promise.reject(err);
  }
);

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
      const { data } = await API.post(`/api/job/createjob`, formData);
      toast.success(data?.message || "Job posted");
      await getAllJobs();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Unable to post job");
    } finally {
      setBtnLoading(false);
    }
  };

  const updateJob = async (id, formData) => {
    setBtnLoading(true);
    try {
      const { data } = await API.put(`/api/job/update/${id}`, formData);
      toast.success(data?.message || "Job updated");
      setJobs((prev) => prev.map((j) => (j._id === id ? data.job : j)));
      if (singleJob?._id === id) setSingleJob(data.job);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Unable to update job");
    } finally {
      setBtnLoading(false);
    }
  };

  const getAllJobs = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(`/api/job/getall`);
      setJobs(Array.isArray(data) ? data : data?.jobs || []);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Unable to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedJobs = async () => {
    try {
      const { data } = await API.get(`/api/job/getsaved`);
      setSavedJobs(Array.isArray(data) ? data : data?.savedJobs || []);
    } catch (err) {
      // silent log; toast optional
      // toast.error(err?.response?.data?.message || "Unable to fetch saved jobs");
      console.error("Unable to fetch saved jobs", err);
    }
  };

  const toggleSaveJob = async (jobId) => {
    setSavedLoading(true);
    try {
      const { data } = await API.put(`/api/job/savedJob/${jobId}`, {});
      toast.success(data?.message || (data?.isSaved ? "Saved" : "Unsaved"));

      if (singleJob?._id === jobId) {
        setSingleJob((prev) => (prev ? { ...prev, isSaved: data.isSaved } : prev));
      }

      setJobs((prev) =>
        prev.map((job) =>
          job._id === jobId ? { ...job, isSaved: data.isSaved } : job
        )
      );

      await fetchSavedJobs();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Unable to save / unsave job");
    } finally {
      setSavedLoading(false);
    }
  };

  const getJobById = async (id) => {
    setLoadingSingleJob(true);
    try {
      const { data } = await API.get(`/api/job/get/${id}`);
      setSingleJob(data?.job || data || null);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Unable to fetch job");
    } finally {
      setLoadingSingleJob(false);
    }
  };

  const deleteJob = async (id) => {
    setLoading(true);
    try {
      const { data } = await API.delete(`/api/job/deletejob/${id}`);
      toast.success(data?.message || "Job deleted");
      await getAllJobs();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Unable to delete job");
    } finally {
      setLoading(false);
    }
  };

  const removeSavedJob = async (jobId) => {
    try {
      await API.put(`/api/job/savedJob/${jobId}`, {});
      setSavedJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (err) {
      console.error("Unable to remove saved job", err);
    }
  };

  // auto-remove expired saved jobs
  useEffect(() => {
    if (!savedJobs?.length) return;
    const now = Date.now();
    savedJobs.forEach((job) => {
      const ts = new Date(job?.expireDate || job?.expiry || job?.expiresAt || 0).getTime();
      if (ts && ts < now) removeSavedJob(job._id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedJobs]);

  useEffect(() => {
    (async () => {
      await Promise.allSettled([getAllJobs(), fetchSavedJobs()]);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      jobs,
      savedJobs,
      singleJob,
      loading,
      loadingSingleJob,
      savedLoading,
      btnLoading,
      postJob,
      updateJob,
      getAllJobs,
      deleteJob,
      getJobById,
      toggleSaveJob,
      fetchSavedJobs,
      removeSavedJob,
    }),
    [
      jobs,
      savedJobs,
      singleJob,
      loading,
      loadingSingleJob,
      savedLoading,
      btnLoading,
    ]
  );

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};

export const JobData = () => useContext(JobContext);
