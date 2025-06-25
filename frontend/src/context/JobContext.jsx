import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [singleJob, setSingleJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingSingleJob, setLoadingSingleJob] = useState(false);
  const [savedLoading,setSavedLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  // Create a job
  const postJob = async (formData) => {
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/job/createjob", formData);
      toast.success(data.message);
      getMyJobs();
    } catch (error) {
      console.error(error?.response?.data?.message || "Failed to post job");
    } finally {
      setBtnLoading(false);
    }
  };

  // Get all jobs
  const getAllJobs = async () => {
    try {
      const { data } = await axios.get("/api/job/getall");
      setJobs(data);
    } catch (error) {
      console.error("Unable to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  // toogle saved job
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
      setSavedLoading(false);
    } catch (err) {
      toast.error("Unable to save / unsave job");
      setSavedLoading(false);
    }
  };

  // get job by id
  const getJobById = async (id) =>{
    try {
      const { data } = await axios.get(`/api/job/get/${id}`);
      setSingleJob(data);
    } catch (error) {
       console.error("Unable to fetch jobs");
    }finally {
      setLoadingSingleJob(false);
    }
  }

  // Delete job
  const deleteJob = async (id) => {
    try {
      const { data } = await axios.delete(`/api/job/delete/${id}`);
      toast.success(data.message);
      getMyJobs();
    } catch (error) {
      toast.error("Unable to delete job");
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
        getAllJobs,
        deleteJob,
        loading,
        btnLoading,
        getJobById,
        singleJob,
        toggleSaveJob,
        savedLoading
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const JobData = () => useContext(JobContext);
