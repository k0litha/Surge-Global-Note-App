import React, { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function Admin() {
  const navigate = useNavigate();

  const [cookie, removeCookie] = useCookies([]);

  const [values, setValues] = useState({

    email: "",
    password: "",
  });


  const logOut = () => {
    removeCookie("jwt");
    navigate('/');
  };


  const generateError = (err) => toast.error(err);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/createuser", { ...values },
        { withCredentials: true, });
      console.log(data);
      if (data) {
        if (data.errors) {
          const { email} = data.errors;
          if (email) generateError(email);
        } else {
          window.location.reload(false);
        }
      }

    } catch (err) {
      if (err.message.includes("401") || err.message.includes("403")) {
        removeCookie("jwt");
        navigate('/');
      }
    }
  };




  return (
    <>
      <div><Toaster position="top-center" reverseOrder={false} /></div>
      <div>
        <h2>Admin</h2>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor='email'>Email</label>
            <input type="email" name="email" placeholder="Email" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
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
