// MailerContext.jsx
import { createContext, useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const MailerContext = createContext();

const pickBase = () => {
  const envBase = import.meta.env.VITE_BACKEND_URL?.trim();
  if (envBase) return `${envBase.replace(/\/+$/, "")}/api`;

  if (typeof window !== "undefined") {
    const isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    if (isLocal) return "http://localhost:5000/api";
  }

  return "/api";
};

const api = axios.create({
  baseURL: pickBase(),
  withCredentials: false,
  timeout: 15000,
});

export const MailerProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const sendMail = async (data) => {
    setIsLoading(true);
    try {
      const isFormData =
        typeof FormData !== "undefined" && data instanceof FormData;

      const config = isFormData
        ? {}
        : { headers: { "Content-Type": "application/json" } };

      const res = await api.post("/mail/send-email", data, config);
      toast.success(res.data?.message || "Email sent!");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        (err?.code === "ECONNABORTED"
          ? "Request timed out."
          : "Failed to send message.");
      toast.error(msg);
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
