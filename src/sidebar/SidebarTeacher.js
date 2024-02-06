/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./style/sidebarTeacher.css";
import logo from "./img/logo.png";
import Learn from "./img/learn.png";
import Leaderboard from "./img/leaderboard.png";
import Logout from "./img/logout.png";
import Dashboard from "./img/dashboard.webp";
import { useNavigate } from "react-router-dom";

const SidebarTeacher = () => {
  const nav = useNavigate();
  const logout = () => {
    localStorage.removeItem("key");
    localStorage.removeItem("user");
    nav("/");
  };
  return (
    <div className="sidebar">
      <img className="imgLogo" src={logo} />

      <hr></hr>

      <ul>
        <a href="/">
          <li className="card-sidebar">
            <img className="imgItem" src={Dashboard} />
           Dashboard
          </li>
        </a>

        <a href="/teacher/class/quiz">
          <li className="card-sidebar">
            <img className="imgItem" src={Learn} />
           Quiz
          </li>
        </a>

        <a href="/teacher/class/leaderboard">
          <li className="card-sidebar">
            <img className="imgItem" src={Leaderboard} />
          Leaderboard
          </li>
        </a>

        <a onClick={logout}>
          <li className="card-sidebar">
            <img className="imgItem" src={Logout} />
          Log Out
          </li>
        </a>
      </ul>
    </div>
  );
};

export default SidebarTeacher;
