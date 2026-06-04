import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext();
export const AuthProvider=({children})=>{
    const url = import.meta.env.VITE_API_URL;
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        const getUser=async()=>{
            try {
                
                const r =await axios.get(`${url}/auth/me`,{withCredentials:true});
                setUser(r.data.user)
                
            } catch (error) {
                setUser(null);
            }finally{
                setLoading(false);
            }

        }


        getUser();
    },[]);
    return (
        <AppContext.Provider value={{setUser, user, loading}}>
            {children}
        </AppContext.Provider>
    )
    
}


export const useAuth=()=>{
    return useContext(AppContext)
}