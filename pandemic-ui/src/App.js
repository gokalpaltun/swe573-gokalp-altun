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

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>PandemicTweetsApp</h2>
        </div>
      </div>
    );
  }
}

export default App;
