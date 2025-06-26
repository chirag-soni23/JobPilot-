import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import Home from "./pages/Home";
import FindJob from "./pages/FindJob";
import JobDetails from "./pages/Jobdetails";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { UserData } from "./context/UserContext";
import PostJob from "./pages/PostJob";
import SavedJob from "./pages/SavedJob";
import Contact from "./pages/Contact";
// import EditJob from "./pages/EditJob";

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
        <Route path="/findjobs" element={<FindJob />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/jobdetails/:id" element={<JobDetails />} />
        {/* <Route path="/editjob/:id" element={<EditJob/>}/> */}
        <Route path="/postjob" element={<PostJob />} />
        <Route path="/savedjob" element={<SavedJob />} />
        <Route path="/signup" element={isAuth ? <Navigate to="/" replace /> : <Signup />} />
        <Route path="/signin" element={isAuth ? <Navigate to="/" replace /> : <Signin />} />
      </Routes>
    </>
  );
};

export default App;
