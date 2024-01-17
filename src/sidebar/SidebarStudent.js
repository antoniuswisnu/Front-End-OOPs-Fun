/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./style/sidebarStudent.css";
import logo from "./img/logo.png";
import Learn from "./img/learn.png";
import Leaderboard from "./img/leaderboard.png";
import LogOut from "./img/logout.png";
import { useNavigate } from "react-router-dom";

const SidebarStudent = () => {
  const nav = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    nav("/");
  };

  return (
    <div className="sidebar">
      <img className="imgLogo" src={logo} width="150" height="80" />

      <hr></hr>

      

      <ul>
        <a href="/student/class/">
          <li className="card-sidebar">
            <img className="imgItem" src={Learn} />
            Quiz
          </li>
        </a>

        <a href="/student/class/leaderboard" >
          <li className="card-sidebar">
            <img className="imgItem" src={Leaderboard} />
            Leaderboard
          </li>
        </a>

        <a onClick={logout}>
          <li className="card-sidebar"id="lead" >
            <img className="imgItem" src={LogOut} />
            Log Out
          </li>
        </a>
      </ul>
    </div>
  );
};

export default SidebarStudent;
