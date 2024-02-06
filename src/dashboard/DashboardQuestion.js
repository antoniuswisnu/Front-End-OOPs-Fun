import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import NavDashboard from "./navDashboard";
import Card from "../modal/cardQuestion";

const DashboardQuestion = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [label, setLabel] = useState("");
  const [labels, setLabels] = React.useState([]);

  let items = [];

  React.useEffect(() => {
    localStorage.removeItem("key");
    localStorage.removeItem("data");

    const getData = async () => {
      await fetch("http://127.0.0.1:8080/dashboard/create-question", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          return response.label;
        })
        .then((response) => {
          let arrIn = [];
          for (let i = 0; i < response.length; i++) {
            arrIn.push(response[i]);
          }
          setLabels(arrIn);
        });
    };
    getData();
  }, []);

  const postLabel = async () => {
    let result = await fetch(`http://localhost:8080/dashboard/create-question/createLabel`, {
      method: "post",
      body: JSON.stringify({ label }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      window.location.reload();
      return response.json();
    });

    console.log(result);
  };

  for (let i = 0; i < labels.length; i++) {
    items.push(<Card label={labels[i]} />);
  }

  return (
    <>
      <div className="container mt-5">
        <NavDashboard className="mt-5"></NavDashboard>

        <Button className="mt-4 button-5" variant="primary" onClick={handleShow}>
          Create a new Label
        </Button>

        <Modal className="mt-5" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a New Label</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Topic Name</Form.Label>
                <Form.Control value={label} onChange={(e) => setLabel(e.target.value)} type="text" placeholder="" autoFocus />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary" onClick={postLabel}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="mt-5"></div>

        {items}
      </div>
    </>
  );
};

export default DashboardQuestion;
