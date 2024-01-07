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
          <li className="item-sidebar">
            <img className="imgItem" src={Dashboard} />
            <p className="p-sidebar-dashboard">Dashboard</p>
          </li>
        </a>

        <a href="/teacher/class/quiz">
          <li className="item-sidebar">
            <img className="imgItem" src={Learn} />
            <p className="p-sidebar-quiz">Quiz</p>
          </li>
        </a>

        <a href="/teacher/class/leaderboard">
          <li className="item-sidebar">
            <img className="imgItem" src={Leaderboard} />
            <p className="p-sidebar-leaderboard">Leaderboard</p>
          </li>
        </a>

        <a onClick={logout}>
          <li className="item-sidebar">
            <img className="imgItem" src={Logout} />
            <p className="p-sidebar-logout">Log Out</p>
          </li>
        </a>
      </ul>
    </div>
  );
};

export default SidebarTeacher;
