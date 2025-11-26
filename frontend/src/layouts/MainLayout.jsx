// src/layouts/MainLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/signin", "/signup"];
  const hideChrome = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="">
      {!hideChrome && <Navbar />}
      <main className="relative flex-1">
        <Outlet />
      </main>
      {!hideChrome && <Footer />}
    </div>
  );
}
