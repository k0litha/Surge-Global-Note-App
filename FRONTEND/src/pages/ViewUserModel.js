import { Modal, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from "axios";
function ViewUserModel({ uid }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [user, setUser] = useState([]);

    const fetchUser = async () => {
        try {
            const result = await axios.get(`http://localhost:4000/getuser/${uid}`, { withCredentials: true, })
            setUser(result.data.user)

        } catch (error) {
            if (error.message.includes("401") || error.message.includes("403")) {
                window.location.replace = 'http://localhost:4000/logout';
                return false;
            }
        }
    }



    useEffect(() => {
        fetchUser(uid)
    }, [uid])






    return (
        <>

            <Button variant="primary" onClick={handleShow}>
                View User
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{uid}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {
                        user.map(detail =>
                            <div>
                                <h2>{detail._id}</h2>
                                <h2>{detail.firstName}</h2>
                                <h2>{detail.lastName}</h2>
                                <h2>{detail.email}</h2>
                                <h2>{detail.phone}</h2>
                                <h2>{detail.dateOfBirth}</h2>
                            </div>

                        )
                    }



                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ViewUserModel