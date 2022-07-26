import { Modal, Button } from 'react-bootstrap';
import React, { useState } from 'react';

function ViewUserModel({
    uid,
    firstName,
    lastName,
    email,
    phone,
    dob,
    status,
    accountType }) {

    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    function dateConvert(date) {
        return new Date(date).toLocaleDateString();
    }



    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Full Details
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Full User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <h4>Email:  {email}</h4>
                    <h4>First Name:  {firstName}</h4>
                    <h4>Last Name:  {lastName}</h4>
                    <h4>ID:  {uid}</h4>
                    <h4>Phone Number:  {phone}</h4>
                    <h4>Date of Birth:  {dateConvert(dob)}</h4>
                    <h4>Activated:  {`${status}`}</h4>
                    <h4>Account type:  {accountType}</h4>

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