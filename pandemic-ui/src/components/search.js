import React from "react";
import { Button, Container, Form } from "react-bootstrap";

export const Search = ({
  searchChange,
  query,
  existedAnalysisList,
  onAnalysisClicked,
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

      {/* {existedAnalysisList.map((analyItem, index) => (<h1>hello</h1>))} */}
    </Container>
  );
};
