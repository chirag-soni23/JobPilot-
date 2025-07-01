import { createContext, useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import api from "../api.js";

const MailerContext = createContext();

export const MailerProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const sendMail = async (dataObj) => {
    setIsLoading(true);
    try {
      const { data } = await api.post("/api/mail/send-email", dataObj);
      toast.success(data.message || "Email sent!");
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
