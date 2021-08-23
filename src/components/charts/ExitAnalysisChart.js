import { Pie, PieChart, Tooltip } from "recharts";
export default function ExitAnalysisChart(props) {
  return (
    <div className="p-3">
      <PieChart width={parseInt(props.width)} height={parseInt(props.height)}>
        <Pie
          data={props.data}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          fill="#82ca9d"
          label
        />
        <Tooltip wrapperStyle={{ zIndex: 1 }} />
      </PieChart>
    </div>
  );
}
