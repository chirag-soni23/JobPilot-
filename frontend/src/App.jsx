import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import Home from "./pages/Home";
import FindJob from "./pages/FindJob";
import JobDetails from "./pages/Jobdetails";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { UserData } from "./context/UserContext";

const App = () => {
  const { isAuth, loading } = UserData();
  const location = useLocation();

  const hideNavbarRoutes = ["/signin", "/signup"];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  if (loading) return <Loading />;

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/findjob" element={<FindJob />} />
        <Route path="/jobdetails" element={<JobDetails />} />
        <Route path="/signup" element={isAuth ? <Navigate to="/" replace /> : <Signup />} />
        <Route path="/signin" element={isAuth ? <Navigate to="/" replace /> : <Signin />} />
      </Routes>
    </>
  );
};

export default App;
