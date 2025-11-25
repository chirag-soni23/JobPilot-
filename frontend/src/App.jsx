import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import Home from "./pages/Home";
import FindJob from "./pages/FindJob";
import JobDetails from "./pages/JobDetails";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { UserData } from "./context/UserContext";
import PostJob from "./pages/PostJob";
import SavedJob from "./pages/SavedJob";
import Contact from "./pages/Contact";
import ApplyJob from "./pages/ApplyJob";
import AppliedJob from "./pages/AppliedJob";
import FeaturedJobsPage from "./pages/FeaturedJobsPage";
import EditJob from "./pages/EditJob";
import Profile from "./pages/Profile";

const App = () => {
  const { loading, isAuth } = UserData();
  const location = useLocation();

  const hideNavbarRoutes = ["/signin", "/signup"];

  if (loading) return <Loading />;

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/findjobs" element={<FindJob />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/jobdetails/:id" element={<JobDetails />} />
        <Route path="/applyjob/:id" element={<ApplyJob />} />
        <Route path="/appliedjob" element={<AppliedJob />} />
        <Route path="/editjob/:id" element={<EditJob />} />
        <Route path="/postjob" element={<PostJob />} />
        <Route path="/featured-jobs" element={<FeaturedJobsPage />} />
        <Route path="/savedjob" element={<SavedJob />} />
        <Route path="/profile" element={<Profile />} />

        <Route
          path="/signup"
          element={isAuth ? <Navigate to="/" replace /> : <Signup />}
        />
        <Route
          path="/signin"
          element={isAuth ? <Navigate to="/" replace /> : <Signin />}
        />
      </Routes>
    </>
  );
};

export default App;
