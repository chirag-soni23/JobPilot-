import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const JobApplyContext = createContext();

export const JobApplyProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [application, setApplication] = useState(null);
  const [applying, setApplying] = useState(false);
  const [loadingApplications, setLoadingApplications] = useState(false);
  console.log(applications);

  // Apply for a job
  const applyJob = async (jobId, formData) => {
    setApplying(true);
    try {
      const { data } = await axios.post(`/api/apply/apply/${jobId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(data.message);
      setApplications((prev) => [...prev, data.application]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to apply");
    } finally {
      setApplying(false);
    }
  };

  // Fetch all applications
  const getAllApplications = async () => {
    setLoadingApplications(true);
    try {
      const { data } = await axios.get("/api/apply/getall");
      setApplications(data);
    } catch (err) {
      toast.error("Failed to fetch applications");
    } finally {
      setLoadingApplications(false);
    }
  };

  // Get single application
  const getApplicationById = async (id) => {
    try {
      const { data } = await axios.get(`/api/apply/get/${id}`);
      setApplication(data.application);
    } catch (err) {
      toast.error("Unable to fetch application");
    }
  };

  useEffect(() => {
    getAllApplications();
  }, []);

  return (
    <JobApplyContext.Provider
      value={{
        applications,
        application,
        applyJob,
        applying,
        getAllApplications,
        getApplicationById,
        loadingApplications,
      }}
    >
      {children}
    </JobApplyContext.Provider>
  );
};

export const UseJobApply = () => useContext(JobApplyContext);
