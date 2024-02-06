import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "./style/dashboardQuiz.css";

const DashboardQuiz = () => {
  const nav = useNavigate();
  const [QuestionList, setQuestionQuiz] = useState([]);

  React.useEffect(() => {
    localStorage.removeItem("Questions");

    const getQuestionsFromAPI = async () => {
      await fetch("http://localhost:8080/student/class/quiz/started", {
        method: "post",
        body: JSON.stringify({ key: JSON.parse(localStorage.getItem("keyQuiz")).keyQuiz }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          return response.quiz[0];
        })
        .then((response) => {
          return response.listQuestion;
        })
        .then((response) => {
          setQuestionQuiz(response);
          return response;
        });
    };
    getQuestionsFromAPI();

    const getGrading = async () => {
      await fetch("http://localhost:8080/student/search/thequiz", {
        method: "post",
        body: JSON.stringify({ userID: JSON.parse(localStorage.getItem("user"))._id, quizID: JSON.parse(localStorage.getItem("keyQuiz")).keyQuiz }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          document.getElementById("attempt").innerHTML = response.attemp;
          document.getElementById("lastGrading").innerHTML = response.lastGrading;
          document.getElementById("firstGrading").innerHTML = response.firstGrading;
          return response;
        });
    };
    getGrading();
  }, []);

  const StartQuiz = () => {
    localStorage.setItem("Questions", JSON.stringify(QuestionList));
    nav("/student/class/quiz/started/");
  };

  return (
    <>
      <div className="dashboardQuiz">
        <div className="close3">
          <Link to="/student/class">
            <button type="button" class="btn-close">
              <span class="icon-cross"></span>
              <span class="visually-hidden">Close</span>
            </button>
          </Link>
        </div>

        <div className="container mt-5 history">
          <h1>Quiz Rules</h1>
          <hr></hr>
          <ol>
            <li>This quiz consists of {QuestionList.length} questions</li>
            <li>Participants are expected to answer questions honestly without using the help of other parties or seeking answers outside the permitted resources.</li>
            <li>It is strictly forbidden to use help from friends, books, or other sources that are not permitted by the teacher.</li>
            <li>Participants must complete the quiz within the specified time. If there is a time limit, participants must adhere to the specified time.</li>
            <li>Participants are prohibited from sharing or uploading answers, questions, or any information related to the quiz unless permitted by the instructor.</li>
          </ol>

          <Button className="mt-1 mb-1 btn-start" onClick={() => StartQuiz()}>
            Start Quiz
          </Button>
        </div>

        <div className="container mt-3 grid-container">
          <div className="history grid-item">
            <h1>
              Attempt 
              <hr className="garis-history"></hr>
              <h3 id="attempt">0</h3>
            </h1>
          </div>

          <div className="history grid-item">
            <h1>
              Last Grading <hr className="garis-history"></hr> <h3 id="lastGrading">0</h3>
            </h1>
          </div>

          <div className="history grid-item">
            <h1>
              First Grading <hr className="garis-history"></hr> <h3 id="firstGrading">0</h3>
            </h1>
          </div>
        </div>

      </div>
    </>
  );
};

export default DashboardQuiz;
