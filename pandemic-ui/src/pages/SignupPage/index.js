import React, { Component } from "react";
import { connect } from "react-redux";
import UserService from "../../services/user";
import { userSignup } from "../../actions/userSignup";
import { Signup } from "../../components/Signup/index";

class SignUpPage extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      user: {},
      redirectPage: "",
    };
    this.userService = new UserService();
  }
  handleSignup = async (event) => {
    event.preventDefault();
    try {
      const { user } = await this.userService.userSignup({
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
      });
      this.props.userSignup(user);
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
    if (event.currentTarget.name === "email") {
      this.setState({ email: event.currentTarget.value });
    }
  };
  render() {
    return (
      <Signup
        handleSignup={this.handleSignup}
        username={this.state.username}
        handleChange={this.handleChange}
        email={this.state.email}
        password={this.state.password}
        redirectPage={this.state.redirectPage}
      />
    );
  }
}
export default connect(null, { userSignup })(SignUpPage);
