import React from "react";
import { Route, Routes } from "react-router-dom";
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

  if (loading) return <Loading />;

  return (
    <>
      {isAuth && <Navbar />}

      <Routes>
        <Route path="/" element={isAuth ? <Home /> : <Signin />} />
        <Route path="/findjob" element={isAuth ? <FindJob /> : <Signin />} />
        <Route path="/jobdetails" element={isAuth ? <JobDetails /> : <Signin />} />
        <Route path="/signup" element={isAuth ? <Home /> : <Signup />} />
        <Route path="/signin" element={isAuth ? <Home /> : <Signin />} />
      </Routes>
    </>
  );
};

export default App;
