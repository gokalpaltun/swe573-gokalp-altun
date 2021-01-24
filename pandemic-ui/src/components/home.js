/* eslint-disable react-hooks/exhaustive-deps */
import React, { Component, useRef, useCallback } from "react";
import { connect } from "react-redux";

import { ForceGraph3D } from "react-force-graph";

const FocusGraph = () => {
  const fgRef = useRef();
  const handleClick = useCallback(
    (node) => {
      const distance = 40;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

      fgRef.current.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        node,
        3000
      );
      // call function
    },
    [fgRef]
  );
  const handleLinkClick = useCallback((link) => {
    alert(link.Text);
  });
  const data = JSON.parse(localStorage.getItem("graphData"));
  return (
    <ForceGraph3D
      ref={fgRef}
      graphData={data}
      nodeLabel="id"
      nodeAutoColorBy="group"
      nodeColor={(no) => (no.id === "bisma86607792" ? "#ff0000" : "#00ff00")}
      onNodeClick={handleClick}
      onLinkClick={handleLinkClick}
      linkDirectionalArrowLength={3.5}
      linkDirectionalArrowRelPos={1}
      linkCurvature={0.25}
    />
  );
};
class Home extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      data: JSON.parse(localStorage.getItem("graphData")),
    };
  }

  render() {
    const { userCtx } = this.props.ctx;
    if (userCtx.username) {
      if (this.state.data) {
        return <FocusGraph />;
      } else {
        this.props.history.push("/search");
      }
    } else {
      this.props.history.push("/login");
      return <login />;
    }
  }
}
const mapStateToProps = (state) => ({
  ctx: state.ctx,
});

export default connect(mapStateToProps, {})(Home);
