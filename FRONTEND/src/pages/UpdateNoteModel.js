import { Toaster, toast } from "react-hot-toast";
import React, { useState, useEffect } from 'react';
import { Navbar, Modal, Table, Button, Container, Nav, Card, Form } from 'react-bootstrap';
import axios from "axios";
function UpdateNoteModel({ noteid, title, description,updatePage }) {

    const [show, setShow] = useState(false);


    const [values, setValues] = useState({
        title: title,
        description: description,
        date:new Date()
    });

    const generateError = (err) => toast.error(err);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    useEffect(() => {
        updatePage(show)
    }, [show])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`http://localhost:4000/updatenote/${noteid}`, { ...values },
                { withCredentials: true, });
            console.log(data);
            if (data) {
                if (data.errors) {
                    const { title, description } = data.errors;
                    if (title) generateError(title);
                    else if (description) generateError(description);
                } else {
                    toast.success("Note updated successfully")
                    handleClose()
                 
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
            <Button variant="primary" size="sm" onClick={handleShow}>
                Edit
            </Button>
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                                name="title" type="text" placeholder="title" value={values.title} />
                            <Form.Text className="text-muted" > </Form.Text>
                            <Form.Label>Descripton</Form.Label>
                            <Form.Control onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                                name="description" type="text" placeholder="description" value={values.description} />
                            <Form.Text className="text-muted"> </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>



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
export default UpdateNoteModel