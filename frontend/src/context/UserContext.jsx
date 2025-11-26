// context/UserContext.jsx
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { JobData } from "./JobContext";
import { UseJobApply } from "./JobApplyContext";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // e.g. https://jobpilot-1-8vnh.onrender.com
  withCredentials: true,
  timeout: 20000,
});

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

export const UserProvider = ({ children }) => {
  const jobCtx = JobData();
  const applyCtx = UseJobApply();

  const getAllJobs = jobCtx?.getAllJobs;
  const getAllApplications = applyCtx?.getAllApplications;

  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const didInitRef = useRef(false);
  const navigateHook = useNavigate();

  const fetchUser = async () => {
    try {
      const { data } = await API.get(`/api/user/me`);
      const u = data?.user ?? data ?? null;
      setUser(u);
      setIsAuth(Boolean(u));
    } catch {
      setIsAuth(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const { data } = await API.get(`/api/user/getall`);
      setUsers(Array.isArray(data) ? data : data?.users || []);
    } catch {
      /* silent */
    }
  };

  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;
    (async () => {
      await Promise.allSettled([fetchUser(), fetchAllUsers()]);
    })();
  }, []);

  const registerUser = async (name, email, password, navArg) => {
    setBtnLoading(true);
    try {
      const { data } = await API.post(`/api/user/register`, { name, email, password });
      const u = data?.user ?? null;
      setUser(u);
      setIsAuth(Boolean(u));
      toast.success(data?.message || "Registered successfully");
      (navArg || navigateHook)("/");
      await fetchUser();
      if (getAllApplications) await getAllApplications();
      if (getAllJobs) await getAllJobs();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Register failed");
    } finally {
      setBtnLoading(false);
    }
  };

  const loginUser = async (email, password, navArg) => {
    setBtnLoading(true);
    try {
      const { data } = await API.post(`/api/user/login`, { email, password });
      const u = data?.user ?? null;
      setUser(u);
      setIsAuth(Boolean(u));
      toast.success(data?.message || "Logged in");
      (navArg || navigateHook)("/");
      await fetchUser();
      if (getAllApplications) await getAllApplications();
      if (getAllJobs) await getAllJobs();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setBtnLoading(false);
    }
  };

  const googleLogin = async (idToken, navArg) => {
    setBtnLoading(true);
    try {
      const { data } = await API.post(`/api/user/google`, { idToken });
      const u = data?.user ?? null;
      setUser(u);
      setIsAuth(Boolean(u));
      toast.success(data?.message || "Logged in with Google");
      (navArg || navigateHook)("/");
      await fetchUser();
      if (getAllApplications) await getAllApplications();
      if (getAllJobs) await getAllJobs();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Google login failed");
      setIsAuth(false);
    } finally {
      setBtnLoading(false);
    }
  };

  const logout = async () => {
    setBtnLoading(true);
    try {
      await API.get(`/api/user/logout`);
      setUser(null);
      setIsAuth(false);
      toast.success("Logged out successfully!");
      navigateHook("/");
      await fetchUser();
      if (getAllApplications) await getAllApplications();
      if (getAllJobs) await getAllJobs();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Logout failed");
    } finally {
      setBtnLoading(false);
    }
  };

  const uploadProfile = async (file) => {
    setBtnLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const { data } = await API.post(`/api/user/uploadprofile`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser((prev) => ({ ...prev, profile: data?.profile || prev?.profile }));
      toast.success(data?.message || "Profile updated");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Upload failed");
    } finally {
      setBtnLoading(false);
    }
  };

  const deleteProfile = async () => {
    setBtnLoading(true);
    try {
      const { data } = await API.delete(`/api/user/deleteprofile`);
      setUser((prev) => ({ ...prev, profile: { url: "", id: "" } }));
      toast.success(data?.message || "Profile removed");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed");
    } finally {
      setBtnLoading(false);
    }
  };

  const getAbout = async () => {
    try {
      const { data } = await API.get(`/api/user/me/about`);
      if (data?.about !== undefined) {
        setUser((prev) => ({ ...prev, about: data.about }));
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to fetch about info");
    }
  };

  const updateAbout = async (about) => {
    setBtnLoading(true);
    try {
      const { data } = await API.put(`/api/user/me/about`, { about });
      setUser((prev) => ({ ...prev, about: data?.about ?? about }));
      toast.success(data?.message || "About updated");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update about");
    } finally {
      setBtnLoading(false);
    }
  };

  const updateName = async (name) => {
    setBtnLoading(true);
    try {
      const { data } = await API.patch(`/api/user/me/edit-name`, { name });
      setUser((prev) => ({ ...prev, name: data?.user?.name ?? name }));
      toast.success(data?.message || "Name updated");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update name");
    } finally {
      setBtnLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      registerUser,
      loginUser,
      googleLogin,
      logout,
      getAbout,
      updateName,
      updateAbout,
      uploadProfile,
      deleteProfile,
      user,
      users,
      isAuth,
      loading,
      btnLoading,
    }),
    [user, users, isAuth, loading, btnLoading]
  );

  return (
    <UserContext.Provider value={value}>
      {children}
      <Toaster position="top-center" />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
