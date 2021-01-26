import React, { Component } from "react";
import UserService from "../../services/user";
import { connect } from "react-redux";
import { userLogin } from "../../actions/userLogin";
import { Login } from "../../components/Login/index";

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      user: {},
      redirectPage: null,
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
      this.setState({ redirectPage: "/search" });
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
      <Login
        handleLogin={this.handleLogin}
        username={this.state.username}
        handleChange={this.handleChange}
        password={this.state.password}
        redirectPage={this.state.redirectPage}
      />
    );
  }
}

export default connect(null, { userLogin })(LoginPage);
