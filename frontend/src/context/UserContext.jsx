// context/UserContext.jsx  (updated)
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
const VITE_URL = import.meta.env.VITE_BACKEND_URL;

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
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`${VITE_URL}/api/user/me`, {
        withCredentials: true,
      });
      setUser(data);
      setIsAuth(true);
    } catch {
      setIsAuth(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const { data } = await axios.get(`${VITE_URL}/api/user/getall`, {
        withCredentials: true,
      });
      setUsers(data);
    } catch {}
  };

  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;
    fetchUser();
    fetchAllUsers();
  }, []);

  const registerUser = async (name, email, password, navigate) => {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${VITE_URL}/api/user/register`,
        { name, email, password },
        { withCredentials: true }
      );
      setUser(data.user);
      setIsAuth(true);
      toast.success(data.message);
      navigate("/");
      await fetchUser();
      if (getAllApplications) await getAllApplications();
      if (getAllJobs) await getAllJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Register failed");
    } finally {
      setBtnLoading(false);
    }
  };

  const loginUser = async (email, password, navigate) => {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${VITE_URL}/api/user/login`,
        { email, password },
        { withCredentials: true }
      );
      setUser(data.user);
      setIsAuth(true);
      toast.success(data.message);
      navigate("/");
      await fetchUser();
      if (getAllApplications) await getAllApplications();
      if (getAllJobs) await getAllJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setBtnLoading(false);
    }
  };

  const googleLogin = async (idToken, navigate) => {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${VITE_URL}/api/user/google`,
        { idToken },
        { withCredentials: true }
      );
      setUser(data.user);
      setIsAuth(true);
      toast.success(data.message || "Logged in with Google");
      navigate("/");
      await fetchUser();
      if (getAllApplications) await getAllApplications();
      if (getAllJobs) await getAllJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Google login failed");
      setIsAuth(false);
    } finally {
      setBtnLoading(false);
    }
  };

  const logout = async () => {
    setBtnLoading(true);
    try {
      await axios.get(`${VITE_URL}/api/user/logout`, { withCredentials: true });
      setUser(null);
      setIsAuth(false);
      toast.success("Logged out successfully!");
      navigate("/");
      await fetchUser();
      if (getAllApplications) await getAllApplications();
      if (getAllJobs) await getAllJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    } finally {
      setBtnLoading(false);
    }
  };

  const uploadProfile = async (file) => {
    setBtnLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const { data } = await axios.post(
        `${VITE_URL}/api/user/uploadprofile`,
        fd,
        { withCredentials: true }
      );
      setUser((prev) => ({ ...prev, profile: data.profile }));
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setBtnLoading(false);
    }
  };

  const deleteProfile = async () => {
    setBtnLoading(true);
    try {
      const { data } = await axios.delete(
        `${VITE_URL}/api/user/deleteprofile`,
        { withCredentials: true }
      );
      setUser((prev) => ({ ...prev, profile: { url: "", id: "" } }));
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    } finally {
      setBtnLoading(false);
    }
  };

  const getAbout = async () => {
    try {
      const { data } = await axios.get(`${VITE_URL}/api/user/me/about`, {
        withCredentials: true,
      });
      if (data.about !== undefined) {
        setUser((prev) => ({ ...prev, about: data.about }));
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch about info");
    }
  };

  const updateAbout = async (about) => {
    setBtnLoading(true);
    try {
      const { data } = await axios.put(
        `${VITE_URL}/api/user/me/about`,
        { about },
        { withCredentials: true }
      );
      setUser((prev) => ({ ...prev, about: data.about }));
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update about");
    } finally {
      setBtnLoading(false);
    }
  };

  const updateName = async (name) => {
    setBtnLoading(true);
    try {
      const { data } = await axios.patch(
        `${VITE_URL}/api/user/me/edit-name`,
        { name },
        { withCredentials: true }
      );
      setUser((prev) => ({ ...prev, name: data.user?.name || name }));
      toast.success(data.message || "Name updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update name");
    } finally {
      setBtnLoading(false);
    }
  };

const updatePassword = async (oldPassword, newPassword, confirmPassword) => {
  setBtnLoading(true);
  try {
    const { data } = await axios.patch(
      `${VITE_URL}/api/user/me/update-password`,
      { oldPassword, newPassword, confirmPassword }, // 🔴 exact keys
      { withCredentials: true }
    );
    toast.success(data.message || "Password updated successfully!");
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to update password");
    throw err; // so UI handlers can show their own message if needed
  } finally {
    setBtnLoading(false);
  }
};



  const value = useMemo(
    () => ({
      registerUser,
      loginUser,
       updatePassword,
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
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
