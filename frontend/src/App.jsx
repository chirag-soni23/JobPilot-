import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import FindJob from './pages/FindJob'
import JobDetails from './pages/Jobdetails'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/findjob' element={<FindJob/>}/>
        <Route path='/jobdetails' element={<JobDetails/>}/>
      </Routes>
     
    </div>

  )
}

export default App