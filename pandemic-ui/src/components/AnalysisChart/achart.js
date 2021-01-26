import React from "react";
import { Line } from "react-chartjs-2";
import { Container } from "react-bootstrap";

export const Achart = ({ title, centralityData, centralityType }) => {
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  let labelText = "";
  let borderColor = "";
  switch (centralityType) {
    case 1:
      labelText = " Betweenness Centrality";
      borderColor = "rgba(0, 255, 0, 0.5)";
      break;
    case 2:
      labelText = " # of degree";
      borderColor = "rgba(255, 0, 0, 0.5)";
      break;
    default:
      borderColor = "rgba(255, 0, 0, 0.5)";
      break;
  }
  const labels = Object.entries(centralityData).map((cd) => cd[0]);
  const innerData = Object.entries(centralityData).map((cd) =>
    cd[1].toPrecision(4)
  );
  const data = {
    labels: labels,
    datasets: [
      {
        label: labelText,
        data: innerData,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: borderColor,
      },
    ],
  };

  return (
    <Container>
      <div className="header">
        <h1 className="title">{title}</h1>
        <div className="links">Top 20 Users in Network</div>
      </div>
      <Line data={data} options={options} />
    </Container>
  );
};
