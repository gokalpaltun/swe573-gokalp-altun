import React, { Component } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TestService from "../services/test";

class NavbarPandemics extends Component {
  constructor() {
    super();
    this.testService = new TestService();
  }
  handleTest = async () => {
    try {
      await this.testService.hello();
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  render() {
    const { userCtx, isLoggedIn } = this.props.ctx;
    console.log(userCtx, isLoggedIn);
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="home">PandemicTweetsApp</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end px-3">
            <Nav.Item hidden={isLoggedIn}>
              <Button href="Signup" variant="outline-info">
                Signup
              </Button>
            </Nav.Item>
            <Nav.Item hidden={isLoggedIn}>
              <Button href="Login" variant="outline-info">
                Login
              </Button>
            </Nav.Item>
            <Navbar.Text hidden={!isLoggedIn}>
              Signed in as: <p>{userCtx.username || ""}</p>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  ctx: state.ctx,
});
export default withRouter(connect(mapStateToProps, {})(NavbarPandemics));
