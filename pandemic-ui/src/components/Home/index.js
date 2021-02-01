import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AnalysisGraph } from "../AnalysisGraph/index";
import { FocusGraph } from "../FocusGraph/index";
import { Redirect } from "react-router-dom";
import { Achart } from "../AnalysisChart/Achart";
import { WordCloud } from "../WordCloud";
import { TwitterTimeline } from "../Twitter";
import { BarChart } from "../AnalysisChart/Barchart";
export const Home = ({
  betweenness_centrality,
  degree,
  query,
  analysisBtnOnclick,
  data,
  colorizeNodes,
  comparison_centrality,
  redirectPage,
  lookupTwitterUserName,
  onNodeClick,
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
        {lookupTwitterUserName ? (
          <Row>
            <Col>
              <WordCloud key={Math.random() * 1000} data={data} />
              <BarChart data={data} centralityType={2} />
            </Col>
            <Col>
              <TwitterTimeline screenName={lookupTwitterUserName} />
            </Col>
          </Row>
        ) : (
          <Row>
            <Col>
              <WordCloud key={Math.random() * 1000} data={data} />
            </Col>
            <Col>
              <BarChart data={data} centralityType={2} />
            </Col>
          </Row>
        )}
      </Container>
      <FocusGraph
        key={Math.random() * 1000}
        colorizeNodes={colorizeNodes}
        data={data}
        onNodeClick={onNodeClick}
      />
    </div>
  );
};
