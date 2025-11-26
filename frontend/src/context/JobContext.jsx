import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const JobContext = createContext();
const VITE_URL = import.meta.env.VITE_BACKEND_URL;

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
      const { data } = await axios.post(
        `${VITE_URL}/api/job/createjob`,
        formData,
        { withCredentials: true }
      );
      toast.success(data.message);
      getAllJobs();
    } finally {
      setBtnLoading(false);
    }
  };

  const updateJob = async (id, formData) => {
    setBtnLoading(true);
    try {
      const { data } = await axios.put(
        `${VITE_URL}/api/job/update/${id}`,
        formData,
        { withCredentials: true }
      );
      toast.success(data.message);
      setJobs((prev) => prev.map((job) => (job._id === id ? data.job : job)));
      if (singleJob?._id === id) setSingleJob(data.job);
    } catch (error) {
      console.error(`Unable to update job ${error.message}`);
    } finally {
      setBtnLoading(false);
    }
  };

  const getAllJobs = async () => {
    try {
      const { data } = await axios.get(`${VITE_URL}/api/job/getall`, {
        withCredentials: true,
      });
      setJobs(data);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedJobs = async () => {
    try {
      const { data } = await axios.get(`${VITE_URL}/api/job/getsaved`, {
        withCredentials: true,
      });
      setSavedJobs(data);
    } catch (error) {
      console.error(`Unable to fetch saved jobs ${error.message}`);
    }
  };

  const toggleSaveJob = async (jobId) => {
    setSavedLoading(true);
    try {
      const { data } = await axios.put(
        `${VITE_URL}/api/job/savedJob/${jobId}`,
        {},
        { withCredentials: true }
      );
      toast.success(data.message);

      if (singleJob?._id === jobId) {
        setSingleJob({ ...singleJob, isSaved: data.isSaved });
      }

      setJobs((prev) =>
        prev.map((job) =>
          job._id === jobId ? { ...job, isSaved: data.isSaved } : job
        )
      );

      fetchSavedJobs();
    } catch {
      toast.error("Unable to save / unsave job");
    } finally {
      setSavedLoading(false);
    }
  };

  const getJobById = async (id) => {
    setLoadingSingleJob(true);
    try {
      const { data } = await axios.get(`${VITE_URL}/api/job/get/${id}`, {
        withCredentials: true,
      });
      setSingleJob(data);
    } finally {
      setLoadingSingleJob(false);
    }
  };

  const deleteJob = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.delete(
        `${VITE_URL}/api/job/deletejob/${id}`,
        { withCredentials: true }
      );
      toast.success(data.message);
      getAllJobs();
    } catch {
      toast.error("Unable to delete job");
    } finally {
      setLoading(false);
    }
  };

  const removeSavedJob = async (jobId) => {
    try {
      await axios.put(
        `${VITE_URL}/api/job/savedJob/${jobId}`,
        {},
        { withCredentials: true }
      );
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
