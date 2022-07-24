import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from 'axios';
import { Toaster, toast } from "react-hot-toast"
import jwt_decode from 'jwt-decode';


export default function UserReg() {
  const navigate = useNavigate();

  const [values, setValues] = useState({status:1});
  const [cookie, removeCookie] = useCookies([]);
  const token = cookie.jwt;
  const decoded = jwt_decode(token)
    
  const logOut = () => {
    removeCookie("jwt");
    navigate('/');
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {console.log("decoded.id")
      const { data } = await axios.post(`http://localhost:4000/userReg/${decoded.id}`, { ...values },
        { withCredentials: true, });
        removeCookie("jwt");
        navigate('/');
    } catch (err) {
      if (err.message.includes("401") || err.message.includes("403")) {
        removeCookie("jwt");
        navigate('/');
      }
    }
  };



  return (
    <><div><Toaster position="top-center" reverseOrder={false} /></div>
      <div>UserReg

      <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor='firstname'>First name</label>
            <input type="text" name="firstname" placeholder="First name" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
          </div>
          <div>
            <label htmlFor='lastname'>Last name</label>
            <input type="text" name="lastname" placeholder="Last name" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input type="password" name="password" placeholder="password" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
          </div>
          <div>
            <label htmlFor='phone'>Phone number</label>
            <input type="phone" name="phone" placeholder="phone" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
          </div>
          <div>
            <label htmlFor='dateOfBirth'>Birth date</label>
            <input type="date" name="dateOfBirth" placeholder="yyyy-mm-dd" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
        <button onClick={logOut}>logout</button>
      </div>
    
    </>
  )
}
