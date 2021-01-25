/* eslint-disable react-hooks/exhaustive-deps */
import React, { Component, useRef, useCallback } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, CardDeck, Card, Button } from "react-bootstrap";

import { ForceGraph2D } from "react-force-graph";

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

  const colorizeNodes = (node) => {
    const { betweenness_centrality, degree } = data;
    if (betweenness_centrality[node.id]) {
      return "#00ff00"; //green
    } else if (degree[node.id]) {
      return "#ff0000"; //red
    }
    return "#FFFFFF";
  };
  const sizesNodes = (node) => {
    const { betweenness_centrality, degree } = data;
    // if (betweenness_centrality[node.id] && degree[node.id]) {
    //   return "#FFC300" //orange
    // }
    if (betweenness_centrality[node.id]) {
      return 4; //red
    }
    if (degree[node.id]) {
      return 4; //yellow
    }
    return 4;
  };
  return (
    <Container>
      {/* <ForceGraph3D
        ref={fgRef}
        graphData={data}
        nodeLabel="id"
        nodeAutoColorBy="group"
        nodeColor={(node) => colorizeNodes(node)}
        onNodeClick={handleClick}
        onLinkClick={handleLinkClick}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkCurvature={0.25}
        nodeRelSize={10}
        linkResolution={7}
        nodeLabel={"TEST"}

        // eslint-disable-next-line no-restricted-globals
        width={screen.width * 0.45}
        // eslint-disable-next-line no-restricted-globals
        height={screen.height * 0.75}
      /> */}
      <ForceGraph2D
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

const AnalysisGraph = ({
  betweenness_centrality,
  degree,
  query,
  analysisBtnOnclick,
}) => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>{query}</h1>
        </Col>
      </Row>
      <Row>
        <CardDeck>
          <Card className="bg-dark">
            <Card.Body>
              <Card.Title>Betweenness Centrality Analysis</Card.Title>
              {/* <Card.Text>
                This is a wider card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer.
              </Card.Text> */}

              {Object.entries(betweenness_centrality).map((bc) => {
                return (
                  <Button
                    variant="success"
                    onClick={analysisBtnOnclick}
                    id={bc[0]}
                    value={bc[1]}
                  >
                    {bc[0]}
                  </Button>
                );
              })}
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">TOP 20 nodes with red colors</small>
            </Card.Footer>
          </Card>
          <Card className="bg-dark">
            <Card.Body>
              <Card.Title>Degree Centrality</Card.Title>
              {/* <Card.Text>
                This is a wider card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer.
              </Card.Text> */}
              {Object.entries(degree).map((bc) => {
                return (
                  <Button
                    variant="danger"
                    onClick={analysisBtnOnclick}
                    id={bc[0]}
                    value={bc[1]}
                  >
                    {bc[0]}
                  </Button>
                );
              })}
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">
                TOP 20 nodes with yellow colors
              </small>
            </Card.Footer>
          </Card>
        </CardDeck>
      </Row>
    </Container>
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
  analysisBtnOnclick = (e) => {
    alert(e.target.value);
  };

  render() {
    const { userCtx } = this.props.ctx;
    if (userCtx.username) {
      if (this.state.data) {
        return (
          <Container>
            <Row>
              <Col style={{ marginLeft: "10px" }}>
                <AnalysisGraph
                  query={this.state.data.query}
                  betweenness_centrality={
                    this.state.data.betweenness_centrality
                  }
                  degree={this.state.data.degree}
                  analysisBtnOnclick={this.analysisBtnOnclick}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <FocusGraph />
              </Col>
            </Row>
          </Container>
        );
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
