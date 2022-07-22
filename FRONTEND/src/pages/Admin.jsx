import React,{useState} from 'react'
import axios from "axios"

export default function Admin() {
  const [values, setValues] = useState({
    email:"",
    password:"",

  });

const handleSubmit= async(e) => {
  e.preventDefault();
  try{
    const {data} =await axios.post("http://localhost:4000/admin",{...values},
    {withCredentials: true,});

    console.log(data);
    if(data){
      if(data.errors){

      }else{
        
      }
    }

  }catch(err){
    console.log(err);
  }








};




  return (
    <div>
      <h2>Admin</h2>

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
