import React, { useState, useEffect } from "react";

import Mymethods from "../Mymethods";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { updateUser } from "../actions/UsersActions";

export default function UpdateModal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  //   const initial_value = {
  //     id: props.userData.id,
  //     Name: props.userData.Name,
  //     Address: props.userData.Address,
  //   };
  const [User, setUser] = useState();
  const handleChangeEvent = (event) => {
    const { name, value } = event.target;
    setUser({ ...User, [name]: value });
  };

  const updateData = () => {
    debugger;
    var Newdata = {
      Name: User.Name,
      Address: User.Address,
    };

    Mymethods.update(User.id, Newdata)
      .then((res) => {
        console.log(res);
        handleClose();
        props.RefreshData();
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="Name"
                placeholder="Enter Name"
                value={User.Name}
                onChange={handleChangeEvent}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="Address"
                placeholder="Enter Address"
                value={User.Address}
                onChange={handleChangeEvent}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={updateData}>
            Update
          </Button>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
