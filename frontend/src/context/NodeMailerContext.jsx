import { createContext, useContext, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const MailerContext = createContext(null);

// 🔗 Direct backend API (Render)
const api = axios.create({
  baseURL: "https://jobpilot-1-8vnh.onrender.com/api",
  withCredentials: false,
  timeout: 20000,
});

export const MailerProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const sendMail = async (data) => {
    setIsLoading(true);
    try {
      const isFormData =
        typeof FormData !== "undefined" && data instanceof FormData;

      const payload = isFormData
        ? data
        : {
            name: String(data?.name || "").trim(),
            email: String(data?.email || "").trim(),
            phone: String(data?.phone || "").trim(),
            message: String(data?.message || "").trim(),
          };

      const config = isFormData
        ? {}
        : { headers: { "Content-Type": "application/json" } };

      const { data: resp } = await api.post("/mail/send-email", payload, config);

      toast.success(resp?.message || "Email sent successfully!");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
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
