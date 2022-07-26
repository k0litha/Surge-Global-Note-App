import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from 'axios';
import { Navbar, Table, Button, Container, Nav, Form } from 'react-bootstrap';
import { Toaster, toast } from "react-hot-toast"
import jwt_decode from 'jwt-decode';


export default function UserReg() {
  const navigate = useNavigate();

  const [values, setValues] = useState({ status: 1});
  const [cookie, removeCookie] = useCookies([]);
  const token = cookie.jwt;
  const decoded = jwt_decode(token)

  const logOut = () => {
    window.location.replace('http://localhost:4000/logout');
    return false;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`http://localhost:4000/userReg/${decoded.id}`, { ...values },
        { withCredentials: true, });
      console.log(data);
      window.location.replace('http://localhost:4000/logout');
      return false;
    } catch (err) {
      if (err.message.includes("401") || err.message.includes("403")) {
        window.location.replace('http://localhost:4000/logout');
        return false;
      }
    }
  };



  return (
    <><div><Toaster position="top-center" reverseOrder={false} /></div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand >Note App | User Registration</Navbar.Brand>
          <Nav defaultActiveKey="" className="me-auto">
            <Nav.Link onClick={logOut}>Log Out</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div class="p-5 d-flex justify-content-center">
        <Form onSubmit={(e) => handleSubmit(e)}>
        <h2 class="m-1">User Registration</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <br></br>
            <Form.Label>First Name</Form.Label>
            <Form.Control onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
              name="firstname" type="text" placeholder="firstname" />
            <Form.Text className="text-muted" > </Form.Text>
            <br></br>
            <Form.Label>Last Name</Form.Label>
            <Form.Control onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
              name="lastname" type="text" placeholder="lastname"/>
            <Form.Text className="text-muted"> </Form.Text>
            <br></br>
            <Form.Label>New Password</Form.Label>
            <Form.Control onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
              name="password" type="password" placeholder="password"/>
            <Form.Text className="text-muted"> </Form.Text>
            <br></br>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
              name="phone" type="phone" placeholder="phone"/>
            <Form.Text className="text-muted"> </Form.Text>
            <br></br>
            <Form.Label>Birth Date</Form.Label>
            <Form.Control onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
              name="dateOfBirth" type="date" placeholder="dateOfBirth"/>
            <Form.Text className="text-muted"> </Form.Text>
            <br></br>
          
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        
      </div>

    </>
  )
}
