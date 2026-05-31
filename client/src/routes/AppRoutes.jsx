import React from 'react'
import Login from "../pages/Login"
import {Routes,Route} from "react-router-dom"
import JobForm from '../components/JobForm'
import Register from '../pages/Register'
import ResumeUpload from '../pages/ResumeUpload'
import JobApplication from '../pages/JobApplication'
import PublicRoutes from './PublicRoutes'
import ProtectedRoutes from './ProtectedRoutes'
const AppRoutes = () => {
  return (
    <Routes>
        
        <Route path="/register" element={<PublicRoutes> <Register /></PublicRoutes>} />
        <Route path="/login" element={ <PublicRoutes><Login /></PublicRoutes> } />
        <Route path="/create-job" element={ <ProtectedRoutes><JobForm /></ProtectedRoutes> } />
        <Route path="/upload-resume" element={<ProtectedRoutes><ResumeUpload /></ProtectedRoutes>} />
        <Route path="/applications" element={<ProtectedRoutes><JobApplication /></ProtectedRoutes>} />
    </Routes>
  )
}

export default AppRoutes
