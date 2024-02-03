import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import "./style/register-login.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [roles, setRoles] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/dashboard/create-class");
    }
  });

  const collectData = async () => {
    if (!name || !email || !password || !password2 || !roles) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

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
              <div>
                <div>
                  <h2 className="fw-bold mb-2 text-center textlogin">Sign Up</h2>
                  <p className="text-center">Please sign up to your account</p>
                </div>

                <Form name="signUp-form">
                  <div className="formaligment">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="">Username</Form.Label>
                      <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Enter username" id="formbg2" />
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
                  </div>

                  <div className="geser">
                    <label>Roles</label>

                    <div>
                      <label>
                        <input type="radio" label="Teacher" id="teacher" name="roles" value={roles} onChange={(e) => setRoles("teacher")} />
                      </label>

                      <label className="ms-3 p-roles">Teacher</label>

                      <label>
                        <input type="radio" id="student" label="student" name="roles" value={roles} onChange={(e) => setRoles("student")} className="ms-3" />
                      </label>

                      <label className="ms-3 p-roles">Student</label>
                    </div>
                  </div>

                  <div className="tengah">
                    <Button variant="primary" type="button" onClick={collectData} className="buttonSend2">
                      Submit
                    </Button>
                  </div>

                  <p className="mt-3 forgot-password text-center">
                    Already have an account?{" "}
                    <a href="/" className="fw-bold">
                      Sign in
                    </a>
                  </p>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {showAlert && (
        <Row className="justify-content-center">
          <Col md={6}>
            <Alert variant="danger" onClose={() => setShowAlert(false)}>
              Field cannot be empty!
            </Alert>
          </Col>
        </Row>
      )}
    </div>
  );
};
export default Register;
