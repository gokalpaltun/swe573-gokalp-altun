import React from "react";
import { Container } from "react-bootstrap";
import { Timeline } from "react-twitter-widgets";

export const TwitterTimeline = ({ screenName }) => {
  return (
    <Container>
      <Timeline
        dataSource={{
          sourceType: "profile",
          screenName: screenName,
        }}
        options={{
          height: "700",
        }}
      />
    </Container>
  );
};
