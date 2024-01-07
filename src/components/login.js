import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import "./style/register-login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      nav("/dashboard/create-class");
    }
  });

  const LogIn = async () => {
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
      alert("belum berhasil masuk");
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
                  <h2 className="fw-bold mb-2 text-center ">Login</h2>
                </div>
                <div className="mb-3">
                  <Form>
                    <div className="formaligment">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter email" id="formbg" />
                      </Form.Group>

                      <Form.Group className="mb-3 text-center" controlId="formBasicPassword">
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter password" id="formbg" />
                      </Form.Group>
                    </div>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
                    <div className="btnCenter">
                      <Button variant="success" type="submit" onClick={LogIn} className="buttonSend">
                        Login
                      </Button>
                    </div>
                  </Form>
                  <div className="mt-3">
                    <p className="mb-0  text-center">
                      Don't have an account?{" "}
                      <a href="/register" className="fw-bold">
                        register
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Login;
