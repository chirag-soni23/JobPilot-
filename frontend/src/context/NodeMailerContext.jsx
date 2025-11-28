import { createContext, useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const MailerContext = createContext();

// Normal API (other routes)
const api = axios.create({
  baseURL: "/api",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  timeout: 20000,
});

// Mail API — direct to backend (bypass Vercel rewrite to avoid 502)
const mailApi = axios.create({
  baseURL: "https://jobpilot-1-8vnh.onrender.com/api",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
  timeout: 20000,
});

export const MailerProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const sendMail = async (dataObj) => {
    setIsLoading(true);
    try {
      const { data } = await mailApi.post("/mail/send-email", dataObj);
      toast.success(data.message || "Email sent!");
      return true;
    } catch (err) {
      console.error("Mail Error:", err);
      toast.error(err.response?.data?.message || "Failed to send message.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MailerContext.Provider value={{ isLoading, sendMail }}>
      {children}
      <Toaster position="top-center" />
    </MailerContext.Provider>
  );
};

export const useMailData = () => useContext(MailerContext);
