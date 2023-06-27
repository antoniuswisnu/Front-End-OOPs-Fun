import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import NavDashboard from "../modal/modal/navDashboard";
import CardGrade from "../modal/modal/cardGrade";
import { Link } from "react-router-dom";
import "./style/listGradeClass.css";

const ListGradeInClass = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [label, setLabel] = useState("");
  const [datas, setData] = React.useState([]);

  let items = [];

  React.useEffect(() => {
    const getData = async () => {
      let result = await fetch("http://127.0.0.1:8080/teacher/class/quiz/grades", {
        method: "post",
        body: JSON.stringify({ keyQuiz: JSON.parse(localStorage.getItem("keyQuiz")).keyQuiz }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          return response.data;
        })
        .then((response) => {
          let arrIn = [];
          for (let i = 0; i < response.length; i++) {
            arrIn.push(response[i]);
          }

          setData(arrIn);
        });
    };
    getData();
  }, []);

  console.log(datas);

  for (let i = 0; i < datas.length; i++) {
    items.push(<CardGrade data={datas[i]} />);
  }

  return (
    <>
      <div className="container mt-5">
        <div className="mt-5"></div>

        <div className="close-list-grade">
          <Link to="/teacher/class/quiz/question">
            <button type="button" class="btn-close">
              <span class="icon-cross"></span>
              <span class="visually-hidden">Close</span>
            </button>
          </Link>
        </div>

        <h1 className="judul mb-3">Daftar Nilai</h1>

        <hr></hr>
        {items}
      </div>
    </>
  );
};

export default ListGradeInClass;
