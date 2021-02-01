import React from "react";
import { Container } from "react-bootstrap";
import { ForceGraph2D } from "react-force-graph";
import "./index.css";
export const FocusGraph = ({ data, colorizeNodes }) => {
  return (
    <Container>
      <ForceGraph2D
        width={1110}
        graphData={data}
        nodeLabel="id"
        linkDirectionalParticles="value"
        linkDirectionalParticleSpeed={(d) => d.value * 0.001}
        nodeColor={(node) => colorizeNodes(node)}
        nodeRelSize={4}
      />
    </Container>
  );
};
