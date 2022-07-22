import React from 'react'
import { useState } from 'react'

export default function Login() {
  const [values, setValues] = useState({
    email:"",
    password:"",

  });

const handleSubmit= (e) => {
  e.preventDefault();
};




  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={(e)=>handleSubmit(e)}>
        <div>
          <label htmlFor='email'>Email</label>
          <input type="email" name="email" placeholder="Email"  onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input type="password" name="password" placeholder="Password" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
        </div>
        <div>
          
          <button type="submit">Submit</button>
        </div>
      </form>


    </div>
  )
}
