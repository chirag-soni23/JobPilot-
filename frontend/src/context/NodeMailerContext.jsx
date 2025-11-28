import { createContext, useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const MailerContext = createContext();

const api = axios.create({
  baseURL: "/api",
  withCredentials: false, // ❌ mail route ko cookie ki zarurat nahi
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-Requested-With": "XMLHttpRequest", // helps with CORS preflight
  },
});

export const MailerProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const sendMail = async (dataObj) => {
    setIsLoading(true);
    try {
      const { data } = await api.post("/mail/send-email", dataObj, {
        headers: {
          "Cache-Control": "no-cache", // 🧠 avoids Vercel edge caching
          Pragma: "no-cache",
        },
      });
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
