import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "./components/Navbar";
import { SearchPage } from "./pages/SearchPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";

class App extends Component {
  constructor() {
    super();
    this.state = {
      userCtx: {},
    };
  }
  componentDidMount() {
    const { userCtx } = this.props.ctx;
    this.setState({ userCtx });
  }
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/search" component={SearchPage} />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  ctx: state.ctx,
});
export default connect(mapStateToProps, {})(App);
