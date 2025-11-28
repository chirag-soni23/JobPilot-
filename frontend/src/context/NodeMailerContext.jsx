import { createContext, useContext, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const MailerContext = createContext({ isLoading: false, sendMail: async () => false });

// IMPORTANT: baseURL strictly '/api'
const api = axios.create({
  baseURL: "/api",
  timeout: 20000,
  withCredentials: false, // contact form ke liye cookies ki zarurat nahi
});

export const MailerProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const sendMail = async (payload) => {
    setIsLoading(true);
    try {
      const isFormData = typeof FormData !== "undefined" && payload instanceof FormData;

      const config = isFormData
        ? {} // axios multipart boundary khud set karega
        : { headers: { "Content-Type": "application/json", Accept: "application/json" } };

      // baseURL '/api' hai to yahan leading slash ki zarurat nahi (avoid double slash)
      const { data } = await api.post("mail/send-email", payload, config);

      toast.success(data?.message || "Email sent!");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        (err?.response?.status ? `Request failed (${err.response.status})` : err?.message) ||
        "Failed to send message.";
      toast.error(msg);
      return false;
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
