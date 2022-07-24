import {Outlet,Navigate} from 'react-router-dom'
import React from 'react'
import { useCookies } from "react-cookie";
import jwt_decode from 'jwt-decode';

const  StudentRoute=()  => {

    var access= false;
    const [cookie] = useCookies([]);
    const token = cookie.jwt;

    if(token){
      const decoded = jwt_decode(token)
      if ((decoded.accountType == 'student') && decoded.stat) {
        access= true;
      }
    }else{
      access= false;
    }
  return (
    access ? <Outlet/> : <Navigate to={"/reg"}/>
    
  )
}


export default StudentRoute;