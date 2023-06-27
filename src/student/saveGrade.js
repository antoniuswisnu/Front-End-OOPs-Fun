import { useEffect, useLayoutEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const SaveGrade = () => {
  const nav = useNavigate();
  useLayoutEffect(() => {
    const saveQuiz = async () => {
      let result = await fetch("http://localhost:8080/student/search/grade", {
        method: "post",
        body: JSON.stringify({ userID: JSON.parse(localStorage.getItem("user"))._id, quizID: JSON.parse(localStorage.getItem("keyQuiz")).keyQuiz, grade: JSON.parse(localStorage.getItem("grade")).grade }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          localStorage.removeItem("grade");
          if (response.data) {
            console.log("tes");
            localStorage.removeItem("user");
          }
          return response;
        })
        .then((response) => {
          if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data[0]));
            window.location.replace("/");
          }
        });
    };
    setTimeout(function () {
      saveQuiz();
      window.location.replace("/");
    }, 2000);
  }, []);

  return (
    <div className="container mt-5">
      <h1>Sedang menyimpan nilai Quiz...</h1>
    </div>
  );
};

export default SaveGrade;
