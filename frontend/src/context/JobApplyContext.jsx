import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const JobApplyContext = createContext();

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const JobApplyProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [application, setApplication] = useState(null);
  const [applying, setApplying] = useState(false);
  const [loadingApplications, setLoadingApplications] = useState(false);

  const didInitRef = useRef(false);

  const getAllApplications = async () => {
    setLoadingApplications(true);
    try {
      const { data } = await api.get("/apply/getall");
      setApplications(data);
    } catch {
    } finally {
      setLoadingApplications(false);
    }
  };

  const getApplicationById = async (id) => {
    try {
      const { data } = await api.get(`/apply/get/${id}`);
      setApplication(data.application);
    } catch {
      toast.error("Unable to fetch application");
    }
  };

  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;
    getAllApplications();
  }, []);

  const applyJob = async (jobId, formData, navigate) => {
    setApplying(true);
    try {
      const { data } = await api.post(`/apply/apply/${jobId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setApplications((prev) => [...prev, data.application]);
      toast.success(data.message);
      navigate(`/jobdetails/${jobId}`);
      await getAllApplications();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to apply");
    } finally {
      setApplying(false);
    }
  };

  const clearApplications = () => {
    setApplications([]);
    setApplication(null);
    setApplying(false);
    setLoadingApplications(false);
  };

  const value = useMemo(
    () => ({
      applications,
      application,
      applyJob,
      applying,
      getAllApplications,
      getApplicationById,
      loadingApplications,
      clearApplications,
    }),
    [applications, application, applying, loadingApplications]
  );

  return (
    <JobApplyContext.Provider value={value}>
      {children}
    </JobApplyContext.Provider>
  );
};

export const UseJobApply = () => useContext(JobApplyContext);
