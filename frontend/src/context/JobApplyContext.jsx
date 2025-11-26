// src/context/JobApplyContext.jsx
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const JobApplyContext = createContext();

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // e.g. https://jobpilot-1-8vnh.onrender.com
  withCredentials: true,
});

// Optional: auto-handle 401/403
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

export const JobApplyProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [application, setApplication] = useState(null);
  const [applying, setApplying] = useState(false);
  const [loadingApplications, setLoadingApplications] = useState(false);

  const didInitRef = useRef(false);

  const getAllApplications = async () => {
    setLoadingApplications(true);
    try {
      const { data } = await API.get(`/api/apply/getall`);
      // backend may send {applications: []} OR [] — handle both
      setApplications(Array.isArray(data) ? data : data.applications || []);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Unable to fetch applications");
    } finally {
      setLoadingApplications(false);
    }
  };

  const getApplicationById = async (id) => {
    try {
      const { data } = await API.get(`/api/apply/get/${id}`);
      setApplication(data?.application || null);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Unable to fetch application");
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
      const { data } = await API.post(`/api/apply/apply/${jobId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (data?.application) {
        setApplications((prev) => [...prev, data.application]);
      }
      toast.success(data?.message || "Applied successfully");
      navigate(`/jobdetails/${jobId}`);
      await getAllApplications();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to apply");
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

  return <JobApplyContext.Provider value={value}>{children}</JobApplyContext.Provider>;
};

export const UseJobApply = () => useContext(JobApplyContext);
