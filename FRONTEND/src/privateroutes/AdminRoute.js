import { Outlet, Navigate } from 'react-router-dom'
import React from 'react'
import { useCookies } from "react-cookie";
import jwt_decode from 'jwt-decode';

const AdminRoute = () => {


  //check whether the user is an admin and has an activated account
  var access = false;
  const [cookie] = useCookies([]);
  const token = cookie.jwt;
  try {
    if (token) {
      const decoded = jwt_decode(token)
      if ((decoded.accountType === 'admin') && decoded.stat) {
        access = true;
      }
    } else {
      access = false;
    }
  } catch (err) {
    console.log(err);
    access = false;
  }





  return (
    access ? <Outlet /> : <Navigate to={"/notes"} />

  )
}


export default AdminRoute;