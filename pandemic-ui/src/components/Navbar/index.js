import React, { Component } from "react";
import { Navbar, Nav, Button, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
class NavbarPandemics extends Component {
  render() {
    const { userCtx, isLoggedIn } = this.props.ctx;
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
              <Row>
                <Col md={1}>
                  <Navbar.Brand href="search">
                    <BsSearch href="search" size={50} />
                  </Navbar.Brand>
                </Col>
                <hr></hr>
                <Col md={10}>
                  <div>
                    Signed in as: <p>{userCtx.username || ""}</p>
                  </div>
                </Col>
              </Row>
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
