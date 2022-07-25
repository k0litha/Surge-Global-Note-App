import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from 'axios';
import { Toaster, toast } from "react-hot-toast"



export default function Notes() {
  const navigate = useNavigate();

  const [cookies, setCookies, removeCookie] = useCookies([]);




  const logOut = () => {
    removeCookie("jwt");
    navigate('/');

  };



  return (
    <><div><Toaster position="top-center" reverseOrder={false} /></div>
      <div>Student

        <button onClick={logOut}>logout</button>
      </div>
    </>
  )
}
