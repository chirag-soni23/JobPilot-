import { createContext, useContext, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const UserContext = createContext();
const VITE_URL = import.meta.env.VITE_BACKEND_URL;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

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
      window.location.reload();
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
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setBtnLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`${VITE_URL}/api/user/me`, {
        withCredentials: true,
      });
      setUser(data);
      setIsAuth(true);
    } catch {
      setIsAuth(false);
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

  const logout = async () => {
    setBtnLoading(true);
    try {
      await axios.get(`${VITE_URL}/api/user/logout`, {
        withCredentials: true,
      });
      setUser(null);
      setIsAuth(false);
      toast.success("Logged out successfully!");
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
      const { data } = await axios.post(`${VITE_URL}/api/user/uploadprofile`, fd, {
        withCredentials: true,
      });
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
      const { data } = await axios.delete(`${VITE_URL}/api/user/deleteprofile`, {
        withCredentials: true,
      });
      setUser((prev) => ({ ...prev, profile: { url: "", id: "" } }));
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    } finally {
      setBtnLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchAllUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        registerUser,
        loginUser,
        logout,
        uploadProfile,
        deleteProfile,
        user,
        users,
        isAuth,
        loading,
        btnLoading,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
