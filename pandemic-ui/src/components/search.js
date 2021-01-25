import React from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";

export const Search = ({
  searchChange,
  query,
  onAnalysisClicked,
  onShowGraphClicked,
  filteredAnalysisList,
}) => {
  return (
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
