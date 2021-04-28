import React, { useState, useEffect } from "react";

import Mymethods from "../Mymethods";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveUsers,
  findUsersByName,
  updateUser,
  deleteUser,
  retrieveUsersByid,
} from "../actions/UsersActions";
import Insertmodal from "./Insertmodal";

export default function Home() {
  const dispatch = useDispatch(); // To call the actions..
  const userList = useSelector((state) => state.usersList); // Redux store ko local Component state and props ke sath connect karne ke liye useSelector ka use karte h ..
  const [data, setdata] = useState([]);
  const [openMsg, setOpenmsg] = useState(false); // yeh msg ke liye h ..
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const handleChangeEvent = (event) => {
    const { name, value } = event.target;
    setUser({ ...User, [name]: value });
  };

  const RefreshData = () => {
    dispatch(retrieveUsers())
      .then((res) => {
        if (res.length !== 0) {
          setOpenmsg(false);
          console.log(res);
          setdata(res);
        } else {
          setOpenmsg(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Onload me data call kiya...
  useEffect(() => {
    RefreshData();
  }, []);

  // Update data code...
  const initial_value = {
    id: null,
    Name: "",
    Address: "",
  };

  const [User, setUser] = useState(initial_value);

  const handleUpdate = (id) => {
    handleShow();
    dispatch(retrieveUsersByid(id))
      .then((res) => {
        console.log(res);
        setUser({
          id: res.id,
          Name: res.Name,
          Address: res.Address,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateData = () => {
    var Newdata = {
      Name: User.Name,
      Address: User.Address,
    };

    dispatch(updateUser(User.id, Newdata))
      .then((res) => {
        console.log(res);
        handleClose();
        RefreshData();
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Search code starts here ...

  const onChangeSearchName = (e) => {
    const SearchName = e.target.value;
    setSearchName(SearchName);
  };

  const [SearchName, setSearchName] = useState("");
  const findByName = () => {
    if (SearchName !== "") {
      dispatch(findUsersByName(SearchName))
        .then((response) => {
          console.log(response);
          if (response.length === 0) {
            setOpenmsg(true);
          } else {
            setdata(response);
            setOpenmsg(false);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      alert("Enter exact name ..!!");
    }
  };

  //Delete All users On Single Click...
  const removeAllUsers = () => {
    setdata("");
    for (var i = 0; i < userList.length; i++) {
      Mymethods.remove(userList[i].id).then((res) => {
        console.log(res);
      });
    }
    RefreshData();
  };

  return (
    <>
      <div className="container">
        <div className="list row">
          <div className="col-md-12">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Name"
                value={SearchName}
                onChange={onChangeSearchName}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={findByName}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        <Insertmodal dataRefresh={RefreshData} />
        <button className="m-3 btn btn-sm btn-danger" onClick={removeAllUsers}>
          Remove All
        </button>
        <button className="m-3 btn btn-sm btn-secondary" onClick={RefreshData}>
          Refresh Data
        </button>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Click</th>
            </tr>
          </thead>
          <tbody>
            {openMsg && (
              <tr className="text-center text-danger font-weight-bold ">
                <td colSpan="4" className="">
                  Data not Found....
                </td>
              </tr>
            )}
            {userList &&
              userList.map((val, index) => {
                return (
                  <tr key={index}>
                    <td>{val.id}</td>
                    <td>{val.Name}</td>
                    <td>{val.Address}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleUpdate(val.id)}
                      >
                        Edit
                      </button>
                      &nbsp;
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          dispatch(deleteUser(val.id));
                          RefreshData();
                        }}
                      >
                        Del
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
