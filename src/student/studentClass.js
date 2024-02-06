import React, { useState } from "react";
import SidebarStudent from "../sidebar/SidebarStudent";
import CardStudentQuiz from "../modal/cardStudentQuiz";
import Sound from "react-sound";
import soundfile from "./sound/sound.mp3";
import music from "./img/music.png";
import "./style/studentClass.css";
import StudentLevel from "./studentLevel";

function StudentClass(handleSoundLoading, handleSoundPlaying, handleSongFinishedPlaying) {
  const auth = localStorage.getItem("user");
  const [show, setShow] = useState(false);
  const [labels, setLabels] = React.useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [quiz, setQuiz] = useState("");
  const [listQuiz, setListQuiz] = useState([]);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const value = 50;
  const max = 100;
  const height = 20;
  const color = "orange";

  let items = [];

  React.useEffect(() => {
    localStorage.removeItem("keyQuiz");
    localStorage.removeItem("keyLabel");
    localStorage.removeItem("Questions");
    localStorage.removeItem("grade");

    const getData = async () => {
      await fetch("http://localhost:8080/teacher/class/quiz", {
        method: "post",
        body: JSON.stringify({ key: JSON.parse(auth).class }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          return response.quiz;
        })
        .then((response) => {
          let arrIn = [];
          for (let i = 0; i < response.length; i++) {
            arrIn.push(response[i]);
          }
          setListQuiz(arrIn);
        });
    };
    getData();
  }, []);

  const postQuiz = async () => {
    let result = await fetch(`http://localhost:8080/teacher/class/quiz/createquiz`, {
      method: "post",
      body: JSON.stringify({ keyClass: JSON.parse(localStorage.getItem("key")).key, nameQuiz: quiz }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      return response.json();
    });
    console.log(result);
  };

  for (let i = 0; i < listQuiz.length; i++) {
    items.push(<CardStudentQuiz label={listQuiz[i]} />);
  }

  return (
    <div className="container mt-5">
      <SidebarStudent />

      <StudentLevel value={value} max={max} height={height} color={color} />

      <div className="container-student-class">

        <div className="card-student-quiz">{items}</div>

        <div className="item-music">
          <Sound
            url={soundfile}
            playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED}
            playFromPosition={300}
            onLoading={handleSoundLoading}
            onPlaying={handleSoundPlaying}
            onFinishedPlaying={handleSongFinishedPlaying}
          />
        </div>

        <button className="btn-music">
          <img className="img-music" src={music} onClick={() => setIsPlaying(!isPlaying)} />
         </button>

      </div>

      

    </div>
  );
}

export default StudentClass;
