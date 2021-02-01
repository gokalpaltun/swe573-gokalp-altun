import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
export const Signup = ({
  handleSignup,
  username,
  handleChange,
  email,
  password,
  redirectPage,
}) => {
  return redirectPage ? (
    <Redirect to={redirectPage} />
  ) : (
    <Container>
      <Form onSubmit={handleSignup}>
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
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Enter email"
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
          Signup
        </Button>
      </Form>
    </Container>
  );
};
