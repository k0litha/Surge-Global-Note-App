import React, { useState } from 'react';
import { useCookies } from "react-cookie";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import jwt_decode from 'jwt-decode';
import { Navbar, Button, Container, Nav, Form } from 'react-bootstrap';

export default function CreateNote() {

//cookie decode
  const [cookie] = useCookies([]);
  const token = cookie.jwt;
  const decoded = jwt_decode(token)

  const [values, setValues] = useState({
    userid: decoded.id
  });

//logout
  const logOut = () => {
    window.location.replace('http://localhost:4000/logout');
    return false;
  };

//generate toast per error
  const generateError = (err) => toast.error(err);


//handle note creation 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/createnote", { ...values },
        { withCredentials: true, });
      console.log(data);
      if (data) {
        if (data.errors) {
          const { title, description } = data.errors;
          if (title) generateError(title);
          else if (description) generateError(description);
        } else {
          toast.success("Note created successfully")
        }
      }
    } catch (err) {
      if (err.message.includes("401") || err.message.includes("403")) {
        window.location.replace = 'http://localhost:4000/logout';
        return false;
      }
    }
  };




  return (
    <>
      <div><Toaster position="top-center" reverseOrder={false} /></div>
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand >Note App | Notes</Navbar.Brand>
            <Nav defaultActiveKey="/notes/create" className="me-auto">
              <Nav.Link href="/notes">My notes</Nav.Link>
              <Nav.Link href="/notes/create">Create note</Nav.Link>
              <Nav.Link onClick={logOut}>Log Out ({decoded.email})</Nav.Link>
            </Nav>
          </Container>
        </Navbar>


        <div class="p-5 d-flex justify-content-center">

          <Form onSubmit={(e) => handleSubmit(e)}>
            <h2 class="m-1">Create Note</h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                name="title" type="text" placeholder="title" />
              <Form.Text className="text-muted"> </Form.Text>

              <Form.Label>Description</Form.Label>
              <Form.Control onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                name="description" type="text" placeholder="Description " />
              <Form.Text className="text-muted"> </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              Create
            </Button>

          </Form>

        </div>
      </div>
    </>
  )
}
