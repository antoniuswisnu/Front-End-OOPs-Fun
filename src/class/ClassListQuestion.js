import React, { useState, useEffect } from "react";
import "../createQuiz/style/createQuiz.css";
import { Link } from "react-router-dom";

function ClassListQuestion() {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [option5, setOption5] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [questions, setQuestions] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [label, setLabel] = useState("");
  const [keyQuiz, setQuizkey] = useState("");

  useEffect(() => {
    const labels = JSON.parse(localStorage.getItem("keyLabel") || []);
    setLabel(labels.keyLabel);
    const quizkey = JSON.parse(localStorage.getItem("keyQuiz") || []);
    setQuizkey(quizkey.keyQuiz);
    // const data = JSON.parse(localStorage.getItem("data")) || [];
    // setQuestions(data);

    const getQuestions = async () => {
      let result = await fetch("http://localhost:8080/dashboard/create-question/getquestions", {
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
    let result = await fetch("http://localhost:8080/teacher/class/quiz/question/listlabel/listquestion/addquestion", {
      method: "post",
      body: JSON.stringify({ keyQuestion: keyQuestion, keyQuiz: keyQuiz }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
  };

  function editQuestion(index) {
    const question = questions[index];
    setQuestion(question.question);
    setOption1(question.option1);
    setOption2(question.option2);
    setOption3(question.option3);
    setOption4(question.option4);
    setOption5(question.option5);
    setEditing(true);
    setEditingIndex(index);
  }

  function resetForm() {
    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setOption5("");
    setCorrectAnswer(null);
    setEditing(false);
    setEditingIndex(null);
  }

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
      <h1 className="judul">Daftar Soal</h1>

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
            <div className="mt-2">
              <button type="button" className="btn btn-success" onClick={() => tambahQuestion(keyQuiz, question._id)}>
                Tambah Soal
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ClassListQuestion;
