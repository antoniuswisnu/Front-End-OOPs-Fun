import React, { useState, useEffect } from "react";
import "./style/listQuestion.css";
import { Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

function ListQuestion() {
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
  const [keyLabel, setKey] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const labels = JSON.parse(localStorage.getItem("key") || []);
    setLabel(labels.label);
    setKey(labels.key);

    const getQuestions = async () => {
      await fetch("http://localhost:8080/teacher/class/quiz/question", {
        method: "post",
        body: JSON.stringify({ keyQuiz: JSON.parse(localStorage.getItem("keyQuiz")).keyQuiz }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          setQuestions(response.question);
          return response;
        });
    };

    getQuestions();
  }, []);

  const addQuestion = async () => {
    nav("/teacher/class/quiz/question/listlabel");
  };

  const seeGrades = () => {
    nav("/teacher/class/quiz/grades");
  };

  const deleteQuestion = async (index) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      await fetch(`http://localhost:8080/teacher/class/quiz/question/delete`, {
        method: "post",
        body: JSON.stringify({ keyQuiz: JSON.parse(localStorage.getItem("keyQuiz")).keyQuiz, index: index }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.location.reload();
    } else {
      // do nothing
    }
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

  return (
    <div className="container">

      <div className="close-question-quiz">
        <Link to="/teacher/class/quiz">
          <button type="button" class="btn-close">
            <span class="icon-cross"></span>
            <span class="visually-hidden">Close</span>
          </button>
        </Link>
      </div>

      <h1 className="judul mb-3">List Question</h1>

      <hr></hr>

      <div className="container tengah mb-4">
        <Button variant="primary btn-add-question" onClick={() => addQuestion()}>
          Add Question
        </Button>
        <Button variant="primary ms-3 btn-see-grades" onClick={() => seeGrades()}>
          See Grades
        </Button>
      </div>

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
              <Button variant="danger text-lg btn-delete-quiz" onClick={() => deleteQuestion(index, question._id)}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListQuestion;
