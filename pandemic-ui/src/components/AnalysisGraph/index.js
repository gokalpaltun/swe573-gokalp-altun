import { Container, Row, Col, CardDeck, Card, Button } from "react-bootstrap";
export const AnalysisGraph = ({
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
          <Card className="bg-dark" key={Math.random() * 10000}>
            <Card.Body>
              <Card.Title>Betweenness Centrality Analysis</Card.Title>
              {Object.entries(betweenness_centrality).map((bc) => {
                return (
                  <Button
                    variant="success"
                    onClick={analysisBtnOnclick}
                    id={bc[0]}
                    value={bc[1]}
                    key={Math.random() * 10000}
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
          <Card className="bg-dark" key={Math.random() * 10000}>
            <Card.Body>
              <Card.Title>Degree Centrality</Card.Title>
              {Object.entries(degree).map((bc) => {
                return (
                  <Button
                    variant="danger"
                    onClick={analysisBtnOnclick}
                    id={bc[0]}
                    value={bc[1]}
                    key={Math.random() * 10000}
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
        </CardDeck>
      </Row>
    </Container>
  );
};
