import React from "react";
import { Bar } from "react-chartjs-2";
import { Container } from "react-bootstrap";

export const BarChart = ({ title, data, centralityType }) => {
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
  let labelText = " # of frequency";
  let borderColor = "rgba(255, 0, 0, 0.5)";

  const words = Object.entries(data.word_freq).map((wordAndCount) => ({
    text: wordAndCount[0],
    value: wordAndCount[1],
  }));
  const top20Words = words.sort((a, b) => b.value - a.value).slice(0, 20);
  const labels = top20Words.map((t20W) => t20W.text);
  const innerData = top20Words.map((t20W) => t20W.value);

  const dataProcessed = {
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
        <div className="links">Top 20 Frequent Words in Tweets</div>
      </div>
      <Bar data={dataProcessed} options={options} />
    </Container>
  );
};
