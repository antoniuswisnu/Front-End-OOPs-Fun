import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function AddListQuestion() {
  const [questions, setQuestions] = useState([]);
  const [label, setLabel] = useState("");
  const [keyQuiz, setQuizkey] = useState("");

  useEffect(() => {
    const labels = JSON.parse(localStorage.getItem("keyLabel") || []);
    setLabel(labels.keyLabel);
    const quizkey = JSON.parse(localStorage.getItem("keyQuiz") || []);
    setQuizkey(quizkey.keyQuiz);

    const getQuestions = async () => {
      await fetch("http://localhost:8080/dashboard/create-question/getquestions", {
        method: "post",
        body: JSON.stringify({ key: JSON.parse(localStorage.getItem("keyLabel")).keyLabel }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          setQuestions(response);
          return response;
        });
    };

    getQuestions();
  }, []);

  const tambahQuestion = async (keyQuiz, keyQuestion) => {
    await fetch("http://localhost:8080/teacher/class/quiz/question/listlabel/listquestion/addquestion", {
      method: "post",
      body: JSON.stringify({ keyQuestion: keyQuestion, keyQuiz: keyQuiz }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(alert("Berhasil ditambahkan"))
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
  };

  return (
    <div className="container">
      <div className="close2">
        <Link to="/teacher/class/quiz/question/listlabel">
          <button type="button" class="btn-close">
            <span class="icon-cross"></span>
            <span class="visually-hidden">Close</span>
          </button>
        </Link>
      </div>
      <h1 className="judul">List Questions</h1>

      <hr></hr>

      {questions.map((question, index) => (
        <div key={index} className="card mb-2">
          <div className="card-body">
            <h5 className="card-title">
              {index + 1}. {question.question}
            </h5>
            <ul className="list-group">
              <li className="list-group-item">A. {question.option1}</li>
              <li className="list-group-item">B. {question.option2}</li>
              <li className="list-group-item">C. {question.option3}</li>
              <li className="list-group-item">D. {question.option4}</li>
              <li className="list-group-item">E. {question.option5}</li>
            </ul>
            <div className="kanan mt-2">
              <Button variant="text-sm btn-enter-class" onClick={() => tambahQuestion(keyQuiz, question._id)}>
                add question
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AddListQuestion;
