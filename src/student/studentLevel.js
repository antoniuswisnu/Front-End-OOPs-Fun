import React, { useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./style/studentLevel.css";
import Foto from "./img/foto.png";

function StudentLevel() {
  const [exp, setExp] = useState(0);
  const [level, setLevel] = useState(1);
  const sisaExp = 0;

  const usr = JSON.parse(localStorage.getItem("user"));
  // const keyClass = JSON.parse(localStorage.getItem("key"));

  return (
    <div className="container mt-5 level">
      <img className="pp" src={Foto} alt="Foto" />
      <h1 className="level-name">{usr.name}</h1>
      {/* <h4>{keyClass.class}</h4> */}
      <ProgressBar striped variant="warning" animated now={usr.experience} />
      <h4>Level {usr.level}</h4>

      <div className="footer">
        <div className="exp">
          <p>Exp: {usr.experience}</p>
        </div>
      </div>
    </div>
  );
}

export default StudentLevel;
