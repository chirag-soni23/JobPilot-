// MailerContext.jsx
import { createContext, useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const MailerContext = createContext();

// Decide API base:
// 1) Prefer VITE_BACKEND_URL (Render URL, e.g. https://your-backend.onrender.com)
// 2) Fallback: if localhost front-end, use localhost:5000
// 3) Else: use relative "/api" ONLY IF vercel.json rewrites configured
const pickBase = () => {
  const envBase = import.meta.env.VITE_BACKEND_URL?.trim();
  if (envBase) return `${envBase.replace(/\/+$/, "")}/api`;

  if (typeof window !== "undefined") {
    const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    if (isLocal) return "http://localhost:5000/api";
  }

  // Fallback if you set rewrites on Vercel to proxy /api -> Render
  return "/api";
};

const api = axios.create({
  baseURL: pickBase(),
  withCredentials: false, // set true only if you actually use cookies/JWT via cookies
  timeout: 15000,
  validateStatus: (s) => s >= 200 && s < 300,
});

export const MailerProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const sendMail = async (data) => {
    setIsLoading(true);
    try {
      const isFormData = typeof FormData !== "undefined" && data instanceof FormData;

      const config = isFormData
        ? {} 
        : { headers: { "Content-Type": "application/json" } };

      const res = await api.post("/mail/send-email", data, config);
      toast.success(res.data?.message || "Email sent!");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        (err?.code === "ECONNABORTED" ? "Request timed out." : "Failed to send message.");
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
