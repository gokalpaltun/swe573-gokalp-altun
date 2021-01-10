import React, { Component, useRef, useCallback } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";

import {
  ForceGraph2D,
  ForceGraph3D,
  ForceGraphVR,
  ForceGraphAR,
} from "react-force-graph";

import data from "./test.json";
import login from "./login";

const FocusGraph = () => {
  const fgRef = useRef();

  const aaa = async () => {
    setTimeout(() => {
      alert("hello");
    }, 5000);
  };

  const handleClick = useCallback(
    (node) => {
      // Aim at node from outside it
      const distance = 40;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

      fgRef.current.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        node, // lookAt ({ x, y, z })
        3000 // ms transition duration
      );
      // aaa();
    },
    [fgRef]
  );

  const handleLinkClick = useCallback((link) => {
    // Aim at node from outside it
    console.log(link);
    alert(link.Text);
  });

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
      data: data,
    };
  }

  render() {
    const { userCtx } = this.props.ctx;
    if (userCtx.username) {
      return <FocusGraph />;
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
