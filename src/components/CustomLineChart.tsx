import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  TooltipContentProps,
} from "recharts";

import { getYearColor } from "@/utilities/helper";
import { years } from "@/modules/dashboard/data";

type TCustomLineChart = {
  data: Record<string, number | string>[];
  yLabel?: string;
  children: React.ReactNode;
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<string | number, string>) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white z-10 text-black p-3 rounded shadow text-sm space-y-1">
      <p className="font-semibold">{label}</p>
      <div className="w-full grid gap-4 grid-cols-5">
        {payload.map(({ dataKey, value, color }) => (
          <div
            key={dataKey}
            className="flex items-center space-x-2"
            style={{ color }}
          >
            <span>{dataKey}:</span>
            <span className="font-medium">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CustomLegend = () => {
  return (
    <div className="w-full grid grid-cols-6 gap-x-2 gap-y-1 lg:grid-cols-11">
      {years.map((year) => (
        <div
          className="flex items-center space-x-1 border rounded-lg px-1 cursor-pointer"
          style={{ borderColor: getYearColor(year), color: getYearColor(year) }}
        >
          <p>{year}</p>
        </div>
      ))}
    </div>
  );
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
      <YAxis label={yLabel} width="auto" tickLine={false} tickCount={10} />
      <Tooltip content={CustomTooltip} position={{ x: 0, y: 100 }} />
      <Legend content={CustomLegend} verticalAlign="top" />

      {children}
    </LineChart>
  );
}
