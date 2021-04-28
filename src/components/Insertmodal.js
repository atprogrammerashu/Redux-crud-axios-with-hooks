import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Mymethods from "../Mymethods";
import { createUser } from "../actions/UsersActions";
import { useDispatch } from "react-redux";
function Insertmodal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setUser(initial_value); // to clear textbox data..
  };

  const dispatch = useDispatch();
  const initial_value = {
    id: null,
    Name: "",
    Address: "",
  };

  const [User, setUser] = useState(initial_value);

  const handleChangeEvent = (event) => {
    const { name, value } = event.target;
    setUser({ ...User, [name]: value });
  };

  const saveDaata = () => {
    var Newdata = {
      Name: User.Name,
      Address: User.Address,
    };

    dispatch(createUser(Newdata))
      .then((res) => {
        setUser({
          id: res.id,
          Name: res.Name,
          Address: res.Address,
        });
        handleClose();
        props.dataRefresh();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Button
        className="m-3 btn btn-sm "
        variant="primary"
        onClick={handleShow}
      >
        Insert
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Record</Modal.Title>
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
          <Button variant="primary" type="submit" onClick={saveDaata}>
            Insert
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Insertmodal;
