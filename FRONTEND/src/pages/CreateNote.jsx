import React, { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
export default function CreateNote() {
  const navigate = useNavigate();


  const [cookie] = useCookies([]);
  const token = cookie.jwt;
  var uid = '';

  try {
    if (token) {
      const decoded = jwt_decode(token)
      uid = decoded.id;
    }
  } catch (err) {
    console.log(err);
  }


  const [values, setValues] = useState({
    userid: uid
  });

  const logOut = () => {
    window.location.replace = 'http://localhost:4000/logout';
    return false;
  };



  const generateError = (err) => toast.error(err);

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
          <Nav.Link onClick={logOut}>Log Out</Nav.Link>
        </Nav>
      </Container>
    </Navbar>

        <h2>Create Note</h2>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor='title'>Title</label>
            <input type="text" name="title" placeholder="title" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
          </div>
          <div>
            <label htmlFor='description'>Description</label>
            <input type="text" name="description" placeholder="description" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
          </div>

          <div>

            <button type="submit">Submit</button>
          </div>
        </form>
      </div>

    </>
  )
}
