import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PublicRoutes = ({children}) => {
    const[isAuth,setIsAuth]=useState(false);
    const[loading,setLoading]=useState(true);
    const url=import.meta.env.VITE_API_URL;
    const navigate=useNavigate();
    useEffect(()=>{
        const checkAuth=async()=>{
            try {
                await axios.get(`${url}/auth/me`,{withCredentials:true});
                setIsAuth(true);
                setLoading(false);
                navigate("/applications")
            } catch (error) {
                setIsAuth(false);
                navigate(to="/login");
            }finally{
                setLoading(false);
            }
        }
        checkAuth();
    },[])
    if(loading){
        return <div>Loading...</div>
    }
  return children;
}

export default PublicRoutes
