import React from "react";
import Nav from "react-bootstrap/Nav";
import { useLocation } from "react-router-dom";
import "./style/navDashboard.css";

const NavDashboard = () => {
  const location = useLocation();

  return (
    <>
      <h1 className="judul">Welcome to OOPs Fun</h1>

      <Nav justify variant="tabs">
        <Nav.Item className="tab">
          <Nav.Link className={`tab ${location.pathname === "/dashboard/create-class" ? "active-tab" : ""}`} href="/dashboard/create-class">
            Class
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="tab">
          <Nav.Link className={`tab ${location.pathname === "/dashboard/create-question" ? "active-tab" : ""}`} href="/dashboard/create-question">
            Question
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default NavDashboard;
