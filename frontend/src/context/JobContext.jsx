import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [singleJob, setSingleJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingSingleJob, setLoadingSingleJob] = useState(false);
  const [savedLoading, setSavedLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  // Create a job
  const postJob = async (formData) => {
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/job/createjob", formData);
      toast.success(data.message);
      getAllJobs();
    } finally {
      setBtnLoading(false);
    }
  };

  // Update a job
  const updateJob = async (id, formData) => {
    setBtnLoading(true);
    try {
      const { data } = await axios.put(`/api/job/update/${id}`, formData);
      toast.success(data.message);

      setJobs((prev) =>
        prev.map((job) => (job._id === id ? data.job : job))
      );
      if (singleJob?._id === id) setSingleJob(data.job);
    } catch {
      toast.error("Unable to update job");
    } finally {
      setBtnLoading(false);
    }
  };

  // Get all jobs
  const getAllJobs = async () => {
    try {
      const { data } = await axios.get("/api/job/getall");
      setJobs(data);
    } finally {
      setLoading(false);
    }
  };

  // Toggle saved job
  const toggleSaveJob = async (jobId) => {
    setSavedLoading(true);
    try {
      const { data } = await axios.put(`/api/job/savedJob/${jobId}`);
      toast.success(data.message);

      if (singleJob?._id === jobId) {
        setSingleJob({ ...singleJob, isSaved: data.isSaved });
      }

      setJobs((prev) =>
        prev.map((job) =>
          job._id === jobId ? { ...job, isSaved: data.isSaved } : job
        )
      );
    } catch {
      toast.error("Unable to save / unsave job");
    } finally {
      setSavedLoading(false);
    }
  };

  // Get job by id
  const getJobById = async (id) => {
    setLoadingSingleJob(true);
    try {
      const { data } = await axios.get(`/api/job/get/${id}`);
      setSingleJob(data);
    } finally {
      setLoadingSingleJob(false);
    }
  };

  // Delete job
  const deleteJob = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.delete(`/api/job/deletejob/${id}`);
      toast.success(data.message);
      getAllJobs();
      setLoading(false);
    } catch {
      toast.error("Unable to delete job");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  return (
    <JobContext.Provider
      value={{
        jobs,
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
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const JobData = () => useContext(JobContext);
