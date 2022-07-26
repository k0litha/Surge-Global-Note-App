import React, { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Navbar, Table, Button, ButtonGroup, Container, Nav, Form, Row, Col } from 'react-bootstrap';
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

  const handleSearch = async (e) => {
    try {
      if (e.target.value == "") { fetchUsers(page) }


      const result = await axios.get(`http://localhost:4000/usersearch/${e.target.value}`, { withCredentials: true, })
      setUsers(result.data.users)


    } catch (error) {
      if (error.message.includes("401") || error.message.includes("403")) {
        window.location.replace = 'http://localhost:4000/logout';
        return false;
      }
    }
  };





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


  function dateConvert(date) {
    return new Date(date).toLocaleDateString();
  }

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
    <div class="d-flex  justify-content-center">
      <h2 class="m-3">All Users</h2>
    </div>
    <div class="d-flex flex-wrap justify-content-center">


      <Table striped bordered hover style={{ width: '75vw' }}>
        <thead >

          <tr>
            <th class="text-center">First Name</th>
            <th class="text-center">Last Name</th>
            <th class="text-center">Email</th>
            <th class="text-center">Phone Number</th>
            <th class="text-center">Birth Day</th>
            <th class="text-center">

              <Form>
                <Row>
                  <Col xs={10}>
                    <Form.Control onChange={(e) => handleSearch(e)} name="item" placeholder="Search by email" />
                  </Col>
                </Row>
              </Form>


            </th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user =>
              <tr key={user._id} >
                <td class="text-center">{user.firstName}</td>
                <td class="text-center">{user.lastName}</td>
                <td class="text-center">{user.email}</td>
                <td class="text-center">{user.phone}</td>
                <td class="text-center">{dateConvert(user.dateOfBirth)}</td>
                <td class="text-center"><div className="container mt-3">
                  <ViewUserModel
                    uid={user._id}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    email={user.email}
                    phone={user.phone}
                    dob={user.dateOfBirth}
                    status={user.status}
                    accountType={user.accountType}
                  />
                </div></td>

              </tr>
            )
          }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6} >
              <div class="m-2 d-flex justify-content-center">
                <ButtonGroup className="mb-2">
                  <Button onClick={previousPage}>&lt;Prev</Button>
                  <Button> {pages.currentPage} of {pages.totalPages} </Button>
                  <Button onClick={nextPage}>Next&gt;</Button>
                </ButtonGroup>

              </div>



            </td>

          </tr>
        </tfoot>
      </Table>

    </div>
  </div >)
}