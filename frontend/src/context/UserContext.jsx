import { createContext, useContext, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const tokenLS = localStorage.getItem("token");
  if (tokenLS && !axios.defaults.headers.common.Authorization)
    axios.defaults.headers.common.Authorization = `Bearer ${tokenLS}`;

  const registerUser = async (name, email, password, navigate) => {
    setBtnLoading(true);
    try {
      const { data } = await axios.post("https://jobpilot-gqgi.onrender.com/api/user/register", {
        name,
        email,
        password,
      });
      setUser(data.user);
      setIsAuth(true);
      localStorage.setItem("token", data.token);
      axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
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
      const { data } = await axios.post("https://jobpilot-gqgi.onrender.com/api/user/login", { email, password });
      setUser(data.user);
      setIsAuth(true);
      localStorage.setItem("token", data.token);
      axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
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
      const { data } = await axios.get("https://jobpilot-gqgi.onrender.com/api/user/me");
      setUser(data);
      setIsAuth(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const { data } = await axios.get("https://jobpilot-gqgi.onrender.com/api/user/getall");
      setUsers(data);
    } catch {}
  };

  useEffect(() => {
    fetchUser();
    fetchAllUsers();
  }, []);

  const logout = async () => {
    setBtnLoading(true);
    try {
      await axios.get("/api/user/logout");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common.Authorization;
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
      const { data } = await axios.post("https://jobpilot-gqgi.onrender.com/api/user/uploadprofile", fd);
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
      const { data } = await axios.delete("https://jobpilot-gqgi.onrender.com/api/user/deleteprofile");
      setUser((prev) => ({ ...prev, profile: { url: "", id: "" } }));
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    } finally {
      setBtnLoading(false);
    }
  };

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
