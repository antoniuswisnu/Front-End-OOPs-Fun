import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import "./style/register-login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      nav("/dashboard/create-class");
    }
  }, [nav]);

  const LogIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }

    let result = await fetch("http://127.0.0.1:8080/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        return response;
      });

    if (result.email) {
      localStorage.setItem("user", JSON.stringify(result));
      if (result.roles === "teacher") {
        nav("/dashboard/create-class");
      } else {
        nav("/student/inputtoken/");
      }
    } else {
      alert("Wrong email or password!");
    }
  };

  return (
    <Container>
      <Row className="vh-100 justify-content-center align-items-center">
        <div className="mb-3 mt-md-5">
          <div>
            <h2 className="fw-bold mb-2 text-center textlogin">Welcome Back!</h2>
            <p className="text-center">Please login to your account</p>
          </div>

          <div className="mb-3">
            <Form onSubmit={LogIn}>
              <div className="formaligment">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control id="formbg" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control-login" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3 text-center" controlId="formBasicPassword">
                  <Form.Control id="formbg" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control-login" placeholder="Enter password" required />
                </Form.Group>
              </div>

              <div className="tengah">
                <Button variant="success" type="submit" onClick={LogIn} className="buttonSend">
                  Login
                </Button>
              </div>
            </Form>

            <div>
              <p className="text-center">
                Don't have an account?{" "}
                <a href="/register" className="fw-bold">
                  register
                </a>
              </p>
            </div>
          </div>
        </div>
        {showAlert && (
          <Row className="justify-content-center">
            <Col md={6}>
              <Alert variant="danger" onClose={() => setShowAlert(false)}>
                Email and password cannot be empty!
              </Alert>
            </Col>
          </Row>
        )}
      </Row>
    </Container>
  );
};

export default Login;
