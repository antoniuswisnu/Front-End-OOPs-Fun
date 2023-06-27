import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Sidebar from "../sidebar/sidebar";
import CardQuiz from "../modal/modal/cardQuiz";
import Table from "react-bootstrap/Table";
import "./style/class.css";

function ClassPage() {
  const [show, setShow] = useState(false);
  const [labels, setLabels] = React.useState([]);
  const [level, setLevel] = useState(1);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [quiz, setQuiz] = useState("");
  const [listQuiz, setListQuiz] = useState([]);

  let items = [];

  React.useEffect(() => {
    localStorage.removeItem("keyQuiz");
    localStorage.removeItem("keyLabel");

    const getData = async () => {
      let result = await fetch("http://localhost:8080/teacher/class/quiz", {
        method: "post",
        body: JSON.stringify({ key: JSON.parse(localStorage.getItem("key")).key }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          return response.quiz;
        })
        .then((response) => {
          let arrIn = [];
          for (let i = 0; i < response.length; i++) {
            arrIn.push(response[i]);
          }
          setListQuiz(arrIn);
        });
    };
    getData();
  }, []);

  const postQuiz = async () => {
    let result = await fetch(`http://localhost:8080/teacher/class/quiz/createquiz`, {
      method: "post",
      body: JSON.stringify({ keyClass: JSON.parse(localStorage.getItem("key")).key, nameQuiz: quiz, levelMinimum: level }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      return response.json();
    });
    console.log(result);
  };

  for (let i = 0; i < listQuiz.length; i++) {
    items.push(<CardQuiz label={listQuiz[i]} />);
  }

  return (
    <div className="container mt-5">
      <Sidebar />

      <h1 className="judul">Selamat Datang di OOPs Fun</h1>

      <hr className="garis-kelas"></hr>

      <Button className="mt-3 button-5" variant="primary" onClick={handleShow}>
        Add Quiz
      </Button>

      <Modal className="mt-5" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Quiz Name</Form.Label>
              <Form.Control value={quiz} onChange={(e) => setQuiz(e.target.value)} type="text" placeholder="" autoFocus required />
              <Form.Label>Minimun Level</Form.Label>
              <Form.Control value={level} onChange={(e) => setLevel(e.target.value)} type="number" placeholder="" autoFocus required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={postQuiz}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="mt-5"></div>

      {items}
    </div>
  );
}

export default ClassPage;
