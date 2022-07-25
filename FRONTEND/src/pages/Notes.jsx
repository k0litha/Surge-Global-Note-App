import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from 'axios';
import { Toaster, toast } from "react-hot-toast"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function Notes() {
  const navigate = useNavigate();

  const [cookies, setCookies, removeCookie] = useCookies([]);




  const logOut = () => {
    removeCookie("jwt");
    navigate('/');

  };



  return (
    <><div><Toaster position="top-center" reverseOrder={false} /></div>
      <div>
      <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand >Note App | Notes</Navbar.Brand>
        <Nav defaultActiveKey="/notes" className="me-auto">
          <Nav.Link href="/notes">My notes</Nav.Link>
          <Nav.Link href="/notes/create">Create note</Nav.Link>
          <Nav.Link onClick={logOut}>Log Out</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    Notes
      </div>
    </>
  )
}
