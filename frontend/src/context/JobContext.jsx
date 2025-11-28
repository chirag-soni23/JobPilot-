// context/JobContext.jsx  (infinite-requests fixed: guarded + batched cleanup)
import { createContext, useContext, useState, useEffect, useRef, useMemo, useCallback } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const JobContext = createContext();

// Single axios instance hitting the frontend host.
// Vercel rewrites will proxy `/api/*` to your backend.
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

  const isCleaningRef = useRef(false); // prevents re-entrant cleanup loops

  const postJob = useCallback(async (formData) => {
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
  }, []);

  const updateJob = useCallback(async (id, formData) => {
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
  }, [singleJob?._id]);

  const getAllJobs = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/job/getall");
      setJobs(data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to fetch jobs");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSavedJobs = useCallback(async () => {
    try {
      const { data } = await api.get("/job/getsaved");
      setSavedJobs(data);
    } catch (err) {
      console.error("Unable to fetch saved jobs", err?.message);
    }
  }, []);

  const toggleSaveJob = useCallback(async (jobId) => {
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
  }, [fetchSavedJobs, singleJob?._id]);

  const getJobById = useCallback(async (id) => {
    setLoadingSingleJob(true);
    try {
      const { data } = await api.get(`/job/get/${id}`);
      setSingleJob(data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to fetch job");
    } finally {
      setLoadingSingleJob(false);
    }
  }, []);

  const deleteJob = useCallback(async (id) => {
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
  }, [getAllJobs]);

  const removeSavedJob = useCallback(async (jobId) => {
    try {
      await api.put(`/job/savedJob/${jobId}`, {});
      setSavedJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (err) {
      console.error("Unable to remove saved job", err);
    }
  }, []);

  // Initial load
  useEffect(() => {
    getAllJobs();
    fetchSavedJobs();
  }, [getAllJobs, fetchSavedJobs]);

  // CLEANUP EXPIRED SAVED JOBS — batched + guarded to avoid infinite loops
  useEffect(() => {
    if (isCleaningRef.current) return;
    if (!savedJobs || savedJobs.length === 0) return;

    const now = Date.now();
    const expiredIds = savedJobs
      .filter((job) => {
        const t = new Date(job?.expireDate).getTime();
        return Number.isFinite(t) && t < now;
      })
      .map((j) => j._id);

    if (expiredIds.length === 0) return;

    isCleaningRef.current = true;
    (async () => {
      try {
        // Deduplicate just in case
        const unique = [...new Set(expiredIds)];
        await Promise.all(
          unique.map((id) =>
            api.put(`/job/savedJob/${id}`, {}).catch(() => null)
          )
        );
        // Remove locally in one state update
        setSavedJobs((prev) => prev.filter((j) => !unique.includes(j._id)));
      } finally {
        // Let the effect run again only after state has settled
        // and only if there are still any newly-fetched expired items.
        isCleaningRef.current = false;
      }
    })();
  }, [savedJobs]);

  const value = useMemo(
    () => ({
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
    }),
    [
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
    ]
  );

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};

export const JobData = () => useContext(JobContext);
