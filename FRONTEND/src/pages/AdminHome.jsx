import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useCookies } from "react-cookie";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function AdminHome() {
  const navigate = useNavigate();

  const [cookie, removeCookie] = useCookies([]);


  const logOut = () => {
    window.location.replace('http://localhost:4000/logout');
    return false;
  }
  const [users, setUsers] = useState([]);
  const [pages, setP] = useState({});
  var [page, setPage] = useState(1);




  const fetchUsers = async () => {
    try {
      const result = await axios.get(`http://localhost:4000/allusers/${page}`, { withCredentials: true, })
      setUsers(result.data.users)
      setP(result.data.pages)


    } catch (error) {
      if (error.message.includes("401") || error.message.includes("403")) {
        window.location.replace = 'http://localhost:4000/logout';
        return false;
    }
  }
}

  const nextPage = () => {

    setPage(++page)
  }

  const previousPage = () => {
    setPage(--page)
  }

  useEffect(() => {
    fetchUsers(page)
  }, [page])


  return (<div>

    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand >Note App | Admin Panel</Navbar.Brand>
        <Nav defaultActiveKey="/admin" className="me-auto">
          <Nav.Link href="/admin">Home</Nav.Link>
          <Nav.Link href="/admin/create">Create User</Nav.Link>
          <Nav.Link onClick={logOut}>Log Out</Nav.Link>
        </Nav>
      </Container>
    </Navbar>


    <Table striped bordered hover  >
      <thead >
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Birth Day</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map(user =>
            <tr key={user._id} >
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.dateOfBirth}</td>

            </tr>
          )
        }
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={5} >
            <Button onClick={previousPage} variant="secondary">Previous page</Button>{' '}
            <Button onClick={nextPage} variant="primary">Next page</Button>{' '}
            &nbsp;
            &nbsp;
            Page {pages.currentPage} of {pages.totalPages}
          </td>



        </tr>
      </tfoot>
    </Table>
  </div>)
}