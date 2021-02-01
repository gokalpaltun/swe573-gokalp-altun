/* eslint-disable react-hooks/exhaustive-deps */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Home } from "../../components/Home/index";

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      data: JSON.parse(localStorage.getItem("graphData")),
      redirectPage: null,
      lookupTwitterUserName: null,
    };
  }
  analysisBtnOnclick = (e) => {
    this.setState({ lookupTwitterUserName: e.target.value });
    alert(e.target.value);
  };
  colorizeNodes = (node) => {
    const { betweenness_centrality, degree } = this.state.data;
    if (betweenness_centrality[node.id] && degree[node.id]) {
      return "#eeff42";
    } else if (betweenness_centrality[node.id]) {
      return "#00ff00"; //green
    } else if (degree[node.id]) {
      return "#ff0000"; //red
    }
    return "#FFFFFF";
  };

  render() {
    const { userCtx } = this.props.ctx;
    let redirectPage = null;
    if (!userCtx.username) {
      redirectPage = "/login";
    } else if (!this.state.data) {
      redirectPage = "/search";
    }
    if (redirectPage) {
      this.setState({ redirectPage });
      return <Home redirectPage={redirectPage} />;
    }
    return (
      <Home
        analysisBtnOnclick={this.analysisBtnOnclick}
        betweenness_centrality={this.state.data.betweenness_centrality}
        colorizeNodes={this.colorizeNodes}
        data={this.state.data}
        degree={this.state.data.degree}
        query={this.state.data.query}
        comparison_centrality={this.state.data.comparison_centrality}
        key={Math.random() * 1000}
        redirectPage={redirectPage}
      />
    );
  }
}
const mapStateToProps = (state) => ({
  ctx: state.ctx,
});

export default connect(mapStateToProps, {})(HomePage);
