import React, { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Navbar, Table, Button, Container, Nav, Form } from 'react-bootstrap';
import ViewUserModel from './ViewUserModel'
import jwt_decode from 'jwt-decode';

export default function AdminHome() {
  const navigate = useNavigate();

  const [cookie] = useCookies([]);

  const token = cookie.jwt;
  const decoded = jwt_decode(token)

  const logOut = () => {
    window.location.replace('http://localhost:4000/logout');
    return false;
  }
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState({});
  var [page, setPage] = useState(1);




  const fetchUsers = async () => {
    try {
      const result = await axios.get(`http://localhost:4000/allusers/${page}`, { withCredentials: true, })
      setUsers(result.data.users)
      setPages(result.data.pages)


    } catch (error) {
      if (error.message.includes("401") || error.message.includes("403")) {
        window.location.replace = 'http://localhost:4000/logout';
        return false;
      }
    }
  }

  const nextPage = () => {
    if (pages.totalPages > page)
      setPage(++page)
  }

  const previousPage = () => {
    if (1 < page)
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
          <Nav.Link onClick={logOut}>Log Out ({decoded.email})</Nav.Link>
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
              <td><div className="container mt-3">
                <ViewUserModel uid={user._id} />
              </div></td>

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