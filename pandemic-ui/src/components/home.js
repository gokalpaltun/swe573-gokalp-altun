import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
    };
  }

  render() {
    const { userCtx } = this.props.ctx;
    return (
      <Container>
        <h1>Hello User</h1>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  ctx: state.ctx,
});

export default connect(mapStateToProps, {})(Home);
