import React, { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Navbar, Button,Container,Nav,Form} from 'react-bootstrap';


export default function CreateUser() {

  const navigate = useNavigate();

  const [cookie, removeCookie] = useCookies([]);

  const [values, setValues] = useState({});


  const logOut = () => {
    window.location.replace('http://localhost:4000/logout');
    return false;
  }


  const generateError = (err) => toast.error(err);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/createuser", { ...values },
        { withCredentials: true, });
      console.log(data);
      if (data) {
        if (data.errors) {
          const { email } = data.errors;
          if (email) generateError(email);
        } else {
          toast.success("User created successfully")
        }
      }

    } catch (err) {
      if (err.message.includes("401") || err.message.includes("403")) {
        window.location.replace('http://localhost:4000/logout');
        return false;
      }
    }
  };

  return (
    <>
      <div><Toaster position="top-center" reverseOrder={false} /></div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand >Note App | Admin Panel</Navbar.Brand>
          <Nav defaultActiveKey="/admin/create" className="me-auto">
            <Nav.Link href="/admin">Home</Nav.Link>
            <Nav.Link href="/admin/create">Create User</Nav.Link>
            <Nav.Link onClick={logOut}>Log Out</Nav.Link>
          </Nav>
        </Container>
      </Navbar>


      <div>
        <h2>CreateUser</h2>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
              name="email" type="email" placeholder="Enter email" />
            <Form.Text className="text-muted"> </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

      </div>

    </>
  )
}
