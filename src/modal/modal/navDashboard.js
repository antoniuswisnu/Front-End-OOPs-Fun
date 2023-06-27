import Nav from "react-bootstrap/Nav";
import "./style/navDashboard.css";
import { Link } from "react-router-dom";

const NavDashboard = () => {
  return (
    <>
      <h1 className="judul">Selamat Datang di OOPs Fun</h1>

      {/* <hr className="garis-kelas"></hr> */}

      <Nav justify variant="tabs">
        <Nav.Item className="tab">
          <Nav.Link className="tab" href="/dashboard/create-class">
            Class
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="tab">
          <Nav.Link className="tab" href="/dashboard/create-question">
            Question
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default NavDashboard;
