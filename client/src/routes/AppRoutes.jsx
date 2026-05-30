import React from 'react'
import Login from "../pages/Login"
import {Routes,Route} from "react-router-dom"
import JobForm from '../components/JobForm'
import Register from '../pages/Register'
import ResumeUpload from '../pages/ResumeUpload'
import JobApplication from '../pages/JobApplication'
const AppRoutes = () => {
  return (
    <Routes>
        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-job" element={<JobForm />} />
        <Route path="/upload-resume" element={<ResumeUpload />} />
        <Route path="/applications" element={<JobApplication />} />
    </Routes>
  )
}

export default AppRoutes
