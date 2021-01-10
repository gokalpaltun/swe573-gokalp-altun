import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Container } from "react-bootstrap";
import UserService from "../services/user";
import { userSignup } from "../actions/userSignup";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      user: {},
    };
    this.userService = new UserService();
  }
  handleSignup = async (event) => {
    event.preventDefault();
    try {
      const { token, user } = await this.userService.userSignup({
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
      });
      this.props.userSignup(user);
      this.props.history.push("/home");
    } catch (error) {
      alert(error.message);
    }
  };
  handleChange = (event) => {
    if (event.currentTarget.name === "username") {
      this.setState({ username: event.currentTarget.value });
    }
    if (event.currentTarget.name === "password") {
      this.setState({ password: event.currentTarget.value });
    }
    if (event.currentTarget.name === "email") {
      this.setState({ email: event.currentTarget.value });
    }
  };
  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignup}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              value={this.state.username}
              onChange={this.handleChange}
              name="username"
              type="text"
              placeholder="Enter Username"
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={this.state.email}
              onChange={this.handleChange}
              name="email"
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
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
  }
}
export default connect(null, { userSignup })(SignUp);
