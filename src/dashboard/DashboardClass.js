import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import NavDashboard from "./navDashboard";
import Card from "../modal/cardClass";

function makeid(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const DashboardClass = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [classs, setClass] = useState("");
  const [classes, setClasses] = React.useState([]);

  let items = [];

  React.useEffect(() => {
    localStorage.removeItem("key");

    const getData = async () => {
      await fetch("http://127.0.0.1:8080/dashboard/create-class", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          return response.class;
        })
        .then((response) => {
          let arrIn = [];
          for (let i = 0; i < response.length; i++) {
            arrIn.push(response[i]);
          }
          setClasses(arrIn);
        });
    };
    getData();
  }, []);

  const postClass = async () => {
    let result = await fetch(`http://localhost:8080/dashboard/create-class/createclass`, {
      method: "post",
      body: JSON.stringify({ class: classs, token: makeid(6) }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      window.location.reload();
      return response.json();
    });
    console.log(result);
  };

  for (let i = 0; i < classes.length; i++) {
    items.push(<Card label={classes[i]} />);
  }

  return (
    <>
      <div className="container mt-5">
        <NavDashboard className="mt-5"></NavDashboard>

        <Button className="mt-4 button-5" variant="primary" onClick={handleShow}>
          Create a new Class
        </Button>

        <Modal className="mt-5" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a New Class</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Class Name</Form.Label>
                <Form.Control value={classs} onChange={(e) => setClass(e.target.value)} type="text" placeholder="" autoFocus />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={postClass}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="mt-4">{items}</div>
      </div>
    </>
  );
};

export default DashboardClass;
