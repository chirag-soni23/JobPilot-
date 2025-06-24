import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect } from "react";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [myJobs, setMyJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);


  // ✅ Create a job
  const postJob = async (formData) => {
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/job/create", formData);
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to post job");
    } finally {
      setBtnLoading(false);
    }
  };

  // ✅ Get all jobs
  const getAllJobs = async () => {
    try {
      const { data } = await axios.get("/api/job/getall");
      setJobs(data);
    } catch (error) {
      toast.error("Unable to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Get my posted jobs
  const getMyJobs = async () => {
    try {
      const { data } = await axios.get("/api/job/my");
      setMyJobs(data.jobs);
    } catch (error) {
      toast.error("Unable to fetch your jobs");
    }
  };

  // ✅ Delete job
  const deleteJob = async (id) => {
    try {
      const { data } = await axios.delete(`/api/job/delete/${id}`);
      toast.success(data.message);
      getMyJobs(); // Refresh list
    } catch (error) {
      toast.error("Unable to delete job");
    }
  };

  // ✅ Apply to a job
  const applyJob = async (id) => {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`/api/job/apply/${id}`);
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to apply");
    } finally {
      setBtnLoading(false);
    }
  };

  // ✅ Get applied jobs
  const getAppliedJobs = async () => {
    try {
      const { data } = await axios.get("/api/job/applied");
      setAppliedJobs(data.jobs);
    } catch (error) {
      toast.error("Unable to fetch applied jobs");
    }
  };

  // ✅ Auto-fetch all jobs on mount
  useEffect(() => {
    getAllJobs();
  }, []);

  return (
    <JobContext.Provider
      value={{
        jobs,
        myJobs,
        appliedJobs,
        postJob,
        getAllJobs,
        getMyJobs,
        deleteJob,
        applyJob,
        getAppliedJobs,
        loading,
        btnLoading,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const JobData = () => useContext(JobContext);
