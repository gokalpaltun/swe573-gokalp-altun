import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
const axios = require("axios").default;

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "asdfasssssdf",
    };
  }

  handleLogin = async () => {
    let data = this.state;
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/v1/hello/");
    } catch (error) {
      console.log(error.response);
    }
  };
  handleUserNameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Pandemics Tweets</h2>
          <input onChange={this.handleUserNameChange}></input>
          <input onChange={this.handlePasswordChange}></input>
          <button onClick={this.handleLogin}> hello</button>
        </div>
      </div>
    );
  }
}

export default App;
