import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import "./style/register-login.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [roles, setRoles] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/dashboard/create-class");
    }
  });

  const collectData = async () => {
    if (password === password2) {
      let result = await fetch("http://127.0.0.1:8080/register", {
        method: "post",
        body: JSON.stringify({ name, email, password, roles }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          return response;
        });
      console.warn(result);

      if (result.notes) {
        alert("Email telah tersedia!");
      } else {
        alert("Berhasil mendaftar");
        navigate("/");
      }
    } else {
      alert("Password must be same!");
    }
  };

  return (
    <div className="container mt-5">
      <div>
        <Container>
          <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col md={8} lg={6} xs={12}>
              <div className="mb-3 mt-md-5">
                <div className="textlogin">
                  <h2 className="fw-bold mb-2 text-center ">Sign Up</h2>
                </div>
                <Form name="signUp-form">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Username" id="formbg2" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" type="email" placeholder="Enter email" id="formbg2" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter password" id="formbg2" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} className="form-control" placeholder="Confirm password" id="formbg2" />
                  </Form.Group>

                  <label>Roles</label>

                  <div className="kolom">
                    <br></br>
                    <label>
                      <input type="radio" label="Teacher" id="teacher" name="roles" value={roles} onChange={(e) => setRoles("teacher")} />
                    </label>
                    <label className="ms-3">Teacher</label>
                    <br></br>
                    <label>
                      <input type="radio" id="student" label="student" name="roles" value={roles} onChange={(e) => setRoles("student")} />
                    </label>
                    <label className="ms-3">Student</label>
                  </div>

                  <div className="btnCenter">
                    <Button variant="primary" type="button" onClick={collectData} className="buttonSend">
                      Submit
                    </Button>
                  </div>

                  <p className="mt-3 forgot-password text-center">
                    Already registered{" "}
                    <a href="/" className="fw-bold">
                      sign in?
                    </a>
                  </p>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default Register;
