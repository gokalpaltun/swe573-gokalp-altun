import { Chart } from "react-google-charts";
export const AnalysisChart = ({ comparison_centrality }) => {
  const title = [
    ["Twitter User Name", "Betweenness Centrality", "Degree Centrality"],
  ];
  const innerData = Object.entries(comparison_centrality).map((i) => [
    i[0],
    i[1]["bc"],
    i[1]["dc"],
  ]);
  const data = title.concat(innerData);
  return (
    <Chart
      width={"1260px"}
      height={"500px"}
      chartType="SteppedAreaChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        title: "Centrality Comparison",
        vAxis: { title: "Accumulated Rating" },
        isStacked: true,
      }}
      rootProps={{ "data-testid": "1" }}
    />
  );
};
