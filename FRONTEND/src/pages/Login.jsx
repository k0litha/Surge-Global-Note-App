import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Toaster, toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

export default function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const generateError = (err) => toast.error(err);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/login", { ...values },
        { withCredentials: true, });
      console.log(data);
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/reg");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };




  return (
    <>
      <div><Toaster position="top-center" reverseOrder={false} /></div>

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand >Note App </Navbar.Brand>
          <Nav defaultActiveKey="/" className="me-auto">
            <Nav.Link href="/">Login</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
      <div>
        <h2>Login</h2>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor='email'>Email</label>
            <input type="email" name="email" placeholder="Email" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input type="password" name="password" placeholder="Password" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
          </div>
          <div>

            <button type="submit">Submit</button>
          </div>
        </form>


      </div>
    </>
  )
}
