import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { JobProvider } from "./context/JobContext.jsx";
import { MailerProvider } from "./context/NodeMailerContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <JobProvider>
          <MailerProvider>
            <App />
          </MailerProvider>
        </JobProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
