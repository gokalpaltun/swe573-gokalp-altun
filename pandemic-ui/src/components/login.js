import React, { Component } from "react";
import { Form, Button, Container } from "react-bootstrap";
import UserService from "../services/user";
import { connect } from "react-redux";
import { userLogin } from "../actions/userLogin";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      user: {},
    };
    this.userService = new UserService();
  }
  handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { user } = await this.userService.userLogin({
        username: this.state.username,
        password: this.state.password,
      });
      this.props.userLogin(user);
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
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleLogin}>
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
            Login
          </Button>
        </Form>
      </Container>
    );
  }
}

export default connect(null, { userLogin })(Login);
