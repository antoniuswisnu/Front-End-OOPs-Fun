import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import NavDashboard from "../modal/modal/navDashboard";
import CardLabel from "../modal/modal/cardLabel";
import { Link } from "react-router-dom";

const ListLabel = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [label, setLabel] = useState("");
  const [labels, setLabels] = React.useState([]);

  let items = [];

  React.useEffect(() => {
    const getData = async () => {
      let result = await fetch("http://127.0.0.1:8080/dashboard/create-question", {
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
      return response.json();
    });

    console.log(result);
  };

  for (let i = 0; i < labels.length; i++) {
    items.push(<CardLabel label={labels[i]} />);
  }

  return (
    <>
      <div className="container mt-5">
        <div className="mt-5"></div>

        <div className="close">
          <Link to="/teacher/class/quiz/question">
            <button type="button" class="btn-close">
              <span class="icon-cross"></span>
              <span class="visually-hidden">Close</span>
            </button>
          </Link>
        </div>

        <h1 className="judul mb-3">Daftar Label Soal</h1>

        <hr></hr>
        {items}
      </div>
    </>
  );
};

export default ListLabel;
