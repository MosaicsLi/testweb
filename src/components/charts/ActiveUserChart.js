import {
  LineChart,
  Line,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
} from "recharts";

export default function ActiveUserChart(props) {
  return (
    <div className="p-3">
      <LineChart
        style={{ margin: "auto" }}
        width={props.width}
        height={props.height}
        data={props.data} // data is an array of objects
        margin={{ top: 5, right: 20, left: 20, bottom: 15 }}
      >
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="active_user" stroke="#8884d8" />
        <Line type="monotone" dataKey="interactions" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}
