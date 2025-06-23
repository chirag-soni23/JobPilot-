import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import FindJob from './pages/FindJob'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/findjob' element={<FindJob/>}/>
      </Routes>
     
    </div>

  )
}

export default App