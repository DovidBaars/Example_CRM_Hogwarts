import React from "react";
import Paper from "@material-ui/core/Paper";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const NewChart = ({ data }) => {
  return (
    <Paper
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <ResponsiveContainer minHeight={350}>
        <BarChart
          data={data}
          layout={"vertical"}
          barSize={10}
          barCategoryGap={5}
        >
          <CartesianGrid strokeDasharray="1" />
          <XAxis type="number" domain={[0, "dataMax + 5"]} />
          <YAxis
            dataKey="skill"
            type="category"
            width={90}
            angle={-45}
            textAnchor="end"
          />
          <Tooltip />
          <Legend />
          <Bar stackId="1" dataKey="Level" fill="#82ca9d" />
          <Bar stackId="1" dataKey="Goal" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};
export default NewChart;
