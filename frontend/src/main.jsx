// src/index.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { JobProvider } from "./context/JobContext.jsx";
import { MailerProvider } from "./context/NodeMailerContext.jsx";
import { JobApplyProvider } from "./context/JobApplyContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <JobProvider>
          <JobApplyProvider>
            <UserProvider>
              <MailerProvider>
                <ThemeProvider>
                  <App />
                </ThemeProvider>
              </MailerProvider>
            </UserProvider>
          </JobApplyProvider>
        </JobProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
