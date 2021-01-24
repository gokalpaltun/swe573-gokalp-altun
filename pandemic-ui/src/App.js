import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signup";
import Home from "./components/home";
import { connect } from "react-redux";
import NavbarPandemics from "./components/NavbarPandemics";
import { SearchPage } from "./pages/SearchPage";

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
        <NavbarPandemics />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/home" component={Home} />
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
