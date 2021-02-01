import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AnalysisGraph } from "../AnalysisGraph/index";
import { FocusGraph } from "../FocusGraph/index";
import { Redirect } from "react-router-dom";
import { Achart } from "../AnalysisChart/achart";
import { WordCloud } from "../WordCloud";
export const Home = ({
  betweenness_centrality,
  degree,
  query,
  analysisBtnOnclick,
  data,
  colorizeNodes,
  comparison_centrality,
  redirectPage,
}) => {
  return redirectPage ? (
    <Redirect to={redirectPage} />
  ) : (
    <div>
      <Container>
        <Row>
          <AnalysisGraph
            key={Math.random() * 1000}
            analysisBtnOnclick={analysisBtnOnclick}
            betweenness_centrality={betweenness_centrality}
            degree={degree}
            query={query}
          />
        </Row>
        <Row>
          <Col>
            <Achart
              title="Betweenees Centrality"
              centralityData={betweenness_centrality}
              centralityType={1}
            />
          </Col>
          <Col>
            <Achart
              title="Degree Centrality"
              centralityData={degree}
              centralityType={2}
            />
          </Col>
        </Row>
        <Row>
          <WordCloud key={Math.random() * 1000} data={data} />
        </Row>
      </Container>
      <FocusGraph
        key={Math.random() * 1000}
        colorizeNodes={colorizeNodes}
        data={data}
      />
    </div>
  );
};
