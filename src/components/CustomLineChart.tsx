import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  // Tooltip,
  // Legend,
} from "recharts";

type TCustomLineChart = {
  data: Record<string, number | string>[];
  yLabel?: string;
  children: React.ReactNode;
};

export default function CustomLineChart({
  data,
  yLabel,
  children,
}: TCustomLineChart) {
  return (
    <LineChart className="w-full h-full" responsive data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis label={yLabel} width="auto" />
      {/* <Tooltip trigger="click" /> */}
      {/* <Legend /> */}

      {children}
    </LineChart>
  );
}
