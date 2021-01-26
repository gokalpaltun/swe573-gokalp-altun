import React from "react";
import ReactWordcloud from "react-wordcloud";
import { select } from "d3-selection";
export const WordCloud = ({ data }) => {
  const words = Object.entries(data.word_freq).map((wordAndCount) => ({
    text: wordAndCount[0],
    value: wordAndCount[1],
  }));
  function getCallback(callback) {
    return function (word, event) {
      const isActive = callback !== "onWordMouseOut";
      const element = event.target;
      const text = select(element);
      text
        .on("click", () => {
          if (isActive) {
            window.open(`https://en.wikipedia.org/wiki/${word.text}`, "_blank");
          }
        })
        .transition()
        .attr("background", "white")
        .attr("font-size", isActive ? "300%" : "100%")
        .attr("text-decoration", isActive ? "underline" : "none");
    };
  }

  const callbacks = {
    getWordTooltip: (word) => `${word.value}`,
    onWordClick: getCallback("onWordClick"),
  };
  const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [5, 60],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000,
  };
  return (
    <div>
      <div style={{ height: 400, width: 600 }}>
        <ReactWordcloud callbacks={callbacks} options={options} words={words} />
      </div>
    </div>
  );
};
