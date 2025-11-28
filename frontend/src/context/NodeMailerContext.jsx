import { createContext, useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const MailerContext = createContext();

const api = axios.create({
  baseURL: "/api",
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

      const { data: resp } = await api.post("/mail/send-email", data, config);
      toast.success(resp.message || "Email sent!");
      return true;
    } catch (err) {
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
