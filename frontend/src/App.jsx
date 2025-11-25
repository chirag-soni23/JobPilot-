import { Route, Routes } from "react-router-dom";
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
  const { isAuth, loading } = UserData();

  if (loading) return <Loading />;

  return (
    <>
      {isAuth && <Navbar />}

      <Routes>
        <Route path="/" element={isAuth ? <Home /> : <Signin />} />
        <Route path="/findjobs" element={isAuth ? <FindJob /> : <Signin />} />
        <Route path="/contact" element={isAuth ? <Contact /> : <Signin />} />
        <Route
          path="/jobdetails/:id"
          element={isAuth ? <JobDetails /> : <Signin />}
        />
        <Route
          path="/applyjob/:id"
          element={isAuth ? <ApplyJob /> : <Signin />}
        />
        <Route
          path="/appliedjob"
          element={isAuth ? <AppliedJob /> : <Signin />}
        />
        <Route path="/editjob/:id" element={<EditJob/>}/>
        <Route path="/postjob" element={isAuth ? <PostJob /> : <Signin />} />
        <Route
          path="/featured-jobs"
          element={isAuth ? <FeaturedJobsPage /> : <Signin />}
        />
        <Route path="/savedjob" element={isAuth ? <SavedJob /> : <Signin />} />
        <Route path="/profile" element={isAuth ? <Profile/> : <Signup/>}/>
        <Route path="/signup" element={isAuth ? <Home /> : <Signup />} />
        <Route path="/signin" element={isAuth ? <Home /> : <Signin />} />
      </Routes>
    </>
  );
};

export default App;
