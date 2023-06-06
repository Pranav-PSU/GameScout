import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import {  Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email: ", email);
    console.log("Password: ", password);
    navigate('/dashboard');
};

  return (
    <Container style={{ maxWidth: "400px" }}>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
