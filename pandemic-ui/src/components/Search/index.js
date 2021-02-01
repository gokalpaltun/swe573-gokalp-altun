import React from "react";
import { Button, Card, Container, Form, Row, Col } from "react-bootstrap";
import ReactLoading from "react-loading";
import { Redirect } from "react-router-dom";
export const Search = ({
  searchChange,
  query,
  onAnalysisClicked,
  onShowGraphClicked,
  filteredAnalysisList,
  redirectPage,
  loadingActive,
}) => {
  return redirectPage ?
    (
      <Redirect to={redirectPage} />
    ) :
    loadingActive ?
      (
        <Container>
          <Row>
            <Col>
              <ReactLoading type="bubbles" color="#fff" />
            </Col>
            <Col>
              <ReactLoading type="bubbles" color="#fff" />
            </Col>
            <Col>
              <ReactLoading type="bubbles" color="#fff" />
            </Col>
            <Col>
              <ReactLoading type="bubbles" color="#fff" />
            </Col>
            <Col>
              <ReactLoading type="bubbles" color="#fff" />
            </Col>
            <Col>
              <ReactLoading type="bubbles" color="#fff" />
            </Col>
            <Col>
              <ReactLoading type="bubbles" color="#fff" />
            </Col>
          </Row>
          <Row>
            <Col>
              <h1>Please wait or come back later...</h1>
              <img img src="https://media.tenor.com/images/5852445904ca128a7527e60b13301c26/tenor.gif" alt="W3Schools.com" style={{"width":"512px","height":"360px","border-radius": "36px"}}></img>
            </Col>
          </Row>
        </Container>
      )
      :
      (
        <Container>
          <hr />
          <Container>
            <Form onSubmit={onAnalysisClicked}>
              <Form.Group>
                <Form.Label>Search</Form.Label>
                <Form.Control
                  value={query}
                  onChange={searchChange}
                  name="query"
                  type="text"
                  placeholder="Search items with one space"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Start Analysis
          </Button>
            </Form>
          </Container>
          <Row>
            {filteredAnalysisList
              ? filteredAnalysisList.map((analysis) => {
                return (
                  <Card
                    key={Math.floor(Math.random() * 10000)}
                    text={"dark"}
                    style={{ width: "18rem" }}
                    className="mb-2"
                  >
                    <Card.Header>{analysis.query}</Card.Header>
                    <Card.Body>
                      <Card.Title>Graph Features</Card.Title>
                      <Card.Text>
                        Total Nodes:{analysis.graph_data.nodes}
                      Total Edges:{analysis.graph_data.edges}
                      </Card.Text>
                      <Button onClick={onShowGraphClicked} value={analysis.query}>
                        Show
                    </Button>
                    </Card.Body>
                  </Card>
                );
              })
              : null}
          </Row>
        </Container>
      );
};
