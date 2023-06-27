import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { json, useNavigate } from "react-router-dom";
import Learning from "./img/learning.avif";
import "./style/cardStudentQuiz.css";

const WithHeaderExample = ({ label }) => {
  const nav = useNavigate();
  const [QuestionQuiz, setQuestionQuiz] = useState([]);

  const StartQuiz = (labels, levelMinimum) => {
    localStorage.setItem("keyQuiz", JSON.stringify({ keyQuiz: labels }));
    if (JSON.parse(localStorage.getItem("user")).level >= levelMinimum) {
      nav("/student/class/quiz/");
    } else {
      alert("Level anda belum mencukupi untuk mengerjakan quiz ini");
    }
  };

  return (
    <Card className="container ms-2 card-quiz">
      <Card.Img variant="top" src={Learning} className="img-card" />
      <Card.Body>
        <Card.Title className="label-nameQuiz">{label.nameQuiz}</Card.Title>
        <Card.Text className="label-level">{label.levelMinimum}</Card.Text>
        <Card.Text className="label-description">Silahkan mengerjakan soal dengan baik</Card.Text>
        {/* <Button variant="danger" onClick={() => deleteQuiz(label._id)}>Delete Quiz (blm jadi)</Button> */}
        <Button className="btn-enter-quiz" variant="primary" onClick={() => StartQuiz(label._id, label.levelMinimum)}>
          Enter Quiz
        </Button>
      </Card.Body>
    </Card>
  );
};

export default WithHeaderExample;
