import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from 'axios';
import { Toaster, toast } from "react-hot-toast"
import { Navbar, Table, Button, Container, Nav, Card } from 'react-bootstrap';
import UpdateNoteModel from './UpdateNoteModel'
import DeleteNoteModel from './DeleteNoteModel'
import jwt_decode from 'jwt-decode';


export default function Notes() {
  const navigate = useNavigate();

  const [cookie, setCookies, removeCookie] = useCookies([]);

  const token = cookie.jwt;
  const decoded = jwt_decode(token)


  const [notes, setUsers] = useState([]);
  const [pages, setPages] = useState({});
  var [page, setPage] = useState(1);
  const [show, setShow] = useState(false);





  const logOut = () => {
    window.location.replace('http://localhost:4000/logout');
    return false;
  };




  const fetchNotes = async () => {
    try {
      const result = await axios.get(`http://localhost:4000/allnotes/${decoded.id}/${page}`, { withCredentials: true, })
      setUsers(result.data.notes)
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
  const updatePage = (show) => {
    setShow(show)
}


  useEffect(() => {
    fetchNotes(page)
  }, [page,show])

  function  dateConvert(date){
   return  new Date(date).toLocaleDateString();
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
        Notes

        
        {
          notes.map(detail =>
    
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
          )
        }

<Button onClick={previousPage} variant="secondary">Previous page</Button>{' '}
            <Button onClick={nextPage} variant="primary">Next page</Button>{' '}
            &nbsp;
            &nbsp;
            Page {pages.currentPage} of {pages.totalPages}


      </div>
    </>
  )
}
