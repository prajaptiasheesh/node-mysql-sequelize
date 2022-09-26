import React from 'react';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import { isUserLoggedIn } from "../utils"; 

const PrivateRoute = ({ children })=>{
    const [tokenObj, setCookie] = useCookies(['token']);
    
    if(tokenObj.token){
        return children
    }else{
        return <Navigate to="/login" replace={true} />
    }
}

export default PrivateRoute;