import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import "./style/studentQuiz.css";
import { useNavigate } from "react-router-dom";

const StudentQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [rightAnswers, setRightAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [experience, setExperience] = useState(0);
  const [level, setLevel] = useState(1);

  const quizData = JSON.parse(localStorage.getItem("Questions"));
  const usr = JSON.parse(localStorage.getItem("user"));
  const nav = useNavigate();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    if (timeLeft === 0) {
      handleAnswer("");
    }

    return () => clearInterval(countdown);
  }, [timeLeft]);

  const handleAnswer = (selectedOption) => {
    clearInterval(timeLeft);

    const currentQuiz = quizData[currentQuestion];
    const correctOption = currentQuiz.correctAnswer;

    if (selectedOption === correctOption) {
      setScore(score + 10);
      setRightAnswers(rightAnswers + 1);
      setExperience(experience + 5);
    } else {
      setWrongAnswers(wrongAnswers + 1);
    }

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(10);
    } else {
      setShowScore(true);
      setTimeLeft(false);
      if (experience >= 100) {
        setExperience(experience - 100);
        setLevel(level + 1);
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setRightAnswers(0);
    setWrongAnswers(0);
    setShowScore(false);
    setTimeLeft(10);
    setExperience(0);
    setLevel(1);
  };

  const saveQuiz = async () => {
    localStorage.setItem("grade", JSON.stringify({ grade: (rightAnswers / quizData.length) * 100 }));

    nav("/student/class/quiz/started/saved/");
  };

  return (
    <Container className="quiz-app">
      {showScore ? (
        <>
          <div className="score-section">
            <h2>Your Score: {(rightAnswers / quizData.length) * 100}</h2>
            <p>Right Answers: {rightAnswers}</p>
            <p>Wrong Answers: {wrongAnswers}</p>
            <p>Experience: {usr.experience}</p>
            <p>Level: {usr.level}</p>
            {/* <Button onClick={restartQuiz}>Restart Quiz</Button> */}
            {/* <Button onClick={saveQuiz()}>Done</Button> */}
            <div className="hidden">
              {setTimeout(() => {
                saveQuiz();
              }, 5000)}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="timer-bar" style={{ width: `${(timeLeft / 10) * 100}%` }}></div>

          <div className="container mt-5">
            <div className="question-section">
              <h2 className="quiz-title">Question {currentQuestion + 1}</h2>
              <h3 className="quiz-question">{quizData[currentQuestion].question}</h3>
            </div>

            <div className="options-section">
              {Object.keys(quizData[currentQuestion]).map((key) => {
                if (key.startsWith("option")) {
                  const option = quizData[currentQuestion][key];
                  return (
                    <Button key={key} onClick={() => handleAnswer(key)} disabled={timeLeft === 0} className="option-button">
                      {option}
                    </Button>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default StudentQuiz;
