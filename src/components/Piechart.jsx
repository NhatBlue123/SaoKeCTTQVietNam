import React from "react";
import { PieChart } from "@mantine/charts";
import { MantineProvider } from "@mantine/core";

const PieChartUI = () => {
  const data = [
    { name: "USA", value: 400, color: "indigo.6" },
    { name: "India", value: 300, color: "yellow.6" },
    { name: "Japan", value: 300, color: "teal.6" },
    { name: "Other", value: 200, color: "gray.6" },
  ];
  return (
    <>
      <MantineProvider>
        <PieChart
          withLabelsLine
          labelsPosition="outside"
          labelsType="value"
          withLabels
          data={data}
        />
      </MantineProvider>
    </>
  );
};
export default PieChartUI;
