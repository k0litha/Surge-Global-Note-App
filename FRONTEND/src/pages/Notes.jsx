import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import axios from 'axios';
import { Toaster } from "react-hot-toast"
import { Navbar, Button, Container, Nav, Card, ButtonGroup } from 'react-bootstrap';
import UpdateNoteModel from './UpdateNoteModel'
import DeleteNoteModel from './DeleteNoteModel'
import jwt_decode from 'jwt-decode';


export default function Notes() {


  const [cookie] = useCookies([]);
  const token = cookie.jwt;
  const decoded = jwt_decode(token)


  const [notes, setUsers] = useState([]);
  const [pages, setPages] = useState({});
  var [page, setPage] = useState(1);
  const [show, setShow] = useState(false);



  const logOut = () => {
    window.location.replace('http://localhost:4000/logout');
    return null;
  };



  const fetchNotes = async () => {
    try {
      const result = await axios.get(`http://localhost:4000/allnotes/${decoded.id}/${page}`,
        { withCredentials: true, })
      setUsers(result.data.notes)
      setPages(result.data.pages)
    } catch (error) {
      if (error.message.includes("401") || error.message.includes("403")) {
        window.location.replace('http://localhost:4000/logout');
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
  const updatePage = (show) => {
    setShow(show)
  }



  useEffect(() => {
    fetchNotes(page)
  }, [page, show])



  function dateConvert(date) {
    return new Date(date).toLocaleDateString();
  }



  return (
    <><div><Toaster position="top-center" reverseOrder={false} /></div>
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand >Note App | Notes</Navbar.Brand>
            <Nav defaultActiveKey="/notes" className="me-auto">
              <Nav.Link href="/notes">My notes</Nav.Link>
              <Nav.Link href="/notes/create">Create note</Nav.Link>
              <Nav.Link onClick={logOut}>Log Out ({decoded.email})</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <div className="d-flex  justify-content-center">
          <h2>Notes</h2>
        </div>

        <div className="d-flex flex-wrap justify-content-center">
          {
            notes.map(detail =>
              <div className="m-2">
                <Card key={detail._id} style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>{detail.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{dateConvert(detail.date)}</Card.Subtitle>
                    <Card.Text>
                      {detail.description}
                    </Card.Text>

                    <UpdateNoteModel
                      noteid={detail._id}
                      title={detail.title}
                      description={detail.description}
                      updatePage={updatePage}
                    />
                    <DeleteNoteModel
                      noteid={detail._id}
                      title={detail.title}
                      updatePage={updatePage}
                    />
                  </Card.Body>
                </Card>
              </div>
            )
          }

        </div>
        <div className="m-2 d-flex justify-content-center">
          <ButtonGroup className="mb-2">
            <Button onClick={previousPage}>&lt;Prev</Button>
            <Button> {pages.currentPage} of {pages.totalPages} </Button>
            <Button onClick={nextPage}>Next&gt;</Button>
          </ButtonGroup>
        </div>

      </div>
    </>
  )
}
