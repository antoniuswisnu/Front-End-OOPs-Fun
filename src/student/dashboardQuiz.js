import React, { useState, useEffect } from "react";
import { Text, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "./style/dashboardQuiz.css";

const DashboardQuiz = () => {
  const nav = useNavigate();
  const [QuestionList, setQuestionQuiz] = useState([]);

  React.useEffect(() => {
    localStorage.removeItem("Questions");

    const getQuestionsFromAPI = async () => {
      let result = await fetch("http://localhost:8080/student/class/quiz/started", {
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
      let result = await fetch("http://localhost:8080/student/search/thequiz", {
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
    // console.warn((QuestionList));
    localStorage.setItem("Questions", JSON.stringify(QuestionList));
    nav("/student/class/quiz/started/");
  };

  return (
    <>
      <div className="dashboardQuiz">
        <div className="close">
          <Link to="/student/class">
            <button type="button" class="btn-close">
              <span class="icon-cross"></span>
              <span class="visually-hidden">Close</span>
            </button>
          </Link>
        </div>

        <div className="container mt-5 history">
          <h1>Peraturan Pengerjaan Quiz</h1>
          <hr></hr>
          <ol>
            <li>Quiz ini terdiri dari {QuestionList.length} soal</li>
            <li>Peserta diharapkan untuk menjawab pertanyaan dengan jujur tanpa menggunakan bantuan pihak lain atau mencari jawaban di luar sumber daya yang diperbolehkan.</li>
            <li>Dilarang keras menggunakan bantuan dari teman, buku, atau sumber lainnya yang tidak diperbolehkan oleh pengajar.</li>
            <li>Peserta harus menyelesaikan quiz dalam waktu yang ditentukan. Jika ada batasan waktu, peserta harus mematuhi waktu yang telah ditetapkan.</li>
            <li>Peserta dilarang membagikan atau mengunggah jawaban, soal, atau informasi apapun terkait quiz kecuali diperbolehkan oleh pengajar.</li>
            <li>Tidak diperkenankan mengirimkan jawaban kepada peserta lain atau mengungkapkan jawaban kepada mereka sebelum quiz selesai.</li>
          </ol>

          <Button className="mt-5 btn-start" onClick={() => StartQuiz()}>
            Start Quiz
          </Button>
        </div>

        <div className="container mt-5 grid-container">
          <div className="history grid-item">
            <h1>
              Attempt <h3 id="attempt">0</h3>
            </h1>
          </div>

          <div className="history grid-item">
            <h1>
              Last Grading <h3 id="lastGrading">0</h3>
            </h1>
          </div>

          <div className="history grid-item">
            <h1>
              First Grading <h3 id="firstGrading">0</h3>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardQuiz;
