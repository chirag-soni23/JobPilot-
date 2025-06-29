import { createContext, useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useEffect } from "react";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [users,setUsers] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  // register user
  async function registerUser(name, email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/user/register", {
        name,
        email,
        password,
      });
      toast.success(data.message);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  }

  // login user
  async function loginUser(email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/user/login", { email, password });
      toast.success(data.message);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  }

  const [loading, setLoading] = useState(true);
  // fetch user
  async function fetchUser() {
    try {
      const { data } = await axios.get("/api/user/me");
      setUser(data);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // fetch all users
  async function fetchAllUsers() {
    try {
      const { data } = await axios.get("/api/user/getall");
      setUsers(data);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchUser();
    fetchAllUsers();
  }, []);

  // logout
  async function logout() {
    setBtnLoading(true);
    try {
      const { data } = await axios.get("/api/user/logout");
      toast.success(data.message);
      setUser(null);
      setIsAuth(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setBtnLoading(false);
    }
  }

  // upload profile
  async function uploadProfile(file) {
  setBtnLoading(true);
  try {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await axios.post("/api/user/uploadprofile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.success(data.message);
    setUser((prev) => ({ ...prev, profile: data.profile }));
  } catch (error) {
    toast.error(error.response?.data?.message || "Upload failed");
  } finally {
    setBtnLoading(false);
  }
}

  // delete profile
async function deleteProfile() {
  setBtnLoading(true);
  try {
    const { data } = await axios.delete("/api/user/deleteprofile");
    toast.success(data.message);
    setUser((prev) => ({ ...prev, profile: { url: "", id: "" } }));
  } catch (error) {
    toast.error(error.response?.data?.message || "Delete failed");
  } finally {
    setBtnLoading(false);
  }
}

  return (
    <UserContext.Provider
      value={{
        loginUser,
        btnLoading,
        isAuth,
        user,
        loading,
        registerUser,
        logout,
        users,
        uploadProfile,
        deleteProfile,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
