// src/context/MailerContext.jsx
import { createContext, useContext, useMemo, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const MailerContext = createContext();

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // e.g. https://jobpilot-1-8vnh.onrender.com
  withCredentials: true,                     // keep consistent with server CORS creds
  timeout: 15000,
});

// Optional: nicer error messages
API.interceptors.response.use(
  (r) => r,
  (e) => {
    const msg =
      e?.response?.data?.message ||
      e?.message ||
      "Failed to send message.";
    toast.error(msg);
    return Promise.reject(e);
  }
);

export const MailerProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef(null);

  // simple client-side validation to avoid empty submissions
  const validate = (payload) => {
    const { name, email, subject, message } = payload || {};
    if (!name || !email || !message) return "Name, email and message are required.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Enter a valid email.";
    if (String(message).trim().length < 5) return "Message is too short.";
    if (subject && String(subject).length > 120) return "Subject is too long.";
    return null;
  };

  const sendMail = async (dataObj) => {
    const err = validate(dataObj);
    if (err) {
      toast.error(err);
      return { ok: false, error: err };
    }

    // cancel any in-flight request (double click protection)
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setIsLoading(true);
    try {
      const { data } = await API.post(
        `/api/mail/send-email`,
        dataObj,
        { signal: abortRef.current.signal }
      );
      toast.success(data?.message || "Email sent!");
      return { ok: true, data };
    } catch (e) {
      return { ok: false, error: e };
    } finally {
      setIsLoading(false);
    }
  };

  const value = useMemo(() => ({ isLoading, sendMail }), [isLoading]);

  return (
    <MailerContext.Provider value={value}>
      {children}
      <Toaster position="top-center" />
    </MailerContext.Provider>
  );
};

export const useMailData = () => useContext(MailerContext);
