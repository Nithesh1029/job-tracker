import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({children}) => {
    const url=import.meta.env.VITE_API_URL;
    const [isAuth,setIsAuth]=useState(false);
    const [loading,setLoading]=useState(true);
    const navigate=useNavigate();
    useEffect(()=>{
        const checkAuth=async()=>{
            try {
                await axios.get(`${url}/auth/me`,{withCredentials:true});
                setIsAuth(true);
                setLoading(false);
                
            } catch (error) {
                console.error(error);
                setIsAuth(false);
                
            }finally{
                setLoading(false);
            }
        }
        checkAuth();
    },[]);

    if(loading){
        return <div>Loading...</div>
    }
    if(!isAuth){
        return navigate("/login");
    }

  return children;
}

export default ProtectedRoutes
