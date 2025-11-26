// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";
import Home from "./pages/Home";
import FindJob from "./pages/FindJob";
import JobDetails from "./pages/JobDetails";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { UserData } from "./context/UserContext.jsx";
import PostJob from "./pages/PostJob";
import SavedJob from "./pages/SavedJob";
import Contact from "./pages/Contact";
import ApplyJob from "./pages/ApplyJob";
import AppliedJob from "./pages/AppliedJob";
import FeaturedJobsPage from "./pages/FeaturedJobsPage";
import EditJob from "./pages/EditJob";
import Profile from "./pages/Profile";
import MainLayout from "./layouts/MainLayout.jsx";
import NotFound from "./pages/NotFound.jsx";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";

const App = () => {
  const { loading, isAuth } = UserData();
  if (loading) return <Loading />;

  return (
    <Routes>
      <Route element={<MainLayout />}>
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
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/profile" element={isAuth && <Profile/> } />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/signup"
          element={isAuth ? <Navigate to="/" replace /> : <Signup />}
        />
        <Route
          path="/signin"
          element={isAuth ? <Navigate to="/" replace /> : <Signin />}
        />
      </Route>
    </Routes>
  );
};

export default App;
