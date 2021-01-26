import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
export const Login = ({
  handleLogin,
  username,
  handleChange,
  password,
  redirectPage,
}) => {
  return redirectPage ? (
    <Redirect to={redirectPage} />
  ) : (
    <Container>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={username}
            onChange={handleChange}
            name="username"
            type="text"
            placeholder="Enter Username"
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};
