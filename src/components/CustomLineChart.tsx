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

type TCustomLegendProps = {
  selectedYears: number[];
  addSelectedYear: (year: number) => void;
  removeSelectedYear: (year: number) => void;
};

type TCustomLineChart = {
  data: Record<string, number | string>[];
  yLabel?: string;
  children: React.ReactNode;
  selectedYears: number[];
} & TCustomLegendProps;

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<string | number, string>) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white z-20 text-black p-3 rounded shadow text-sm space-y-1">
      <p className="font-semibold">{label}</p>
      <div className="w-full grid gap-4 grid-cols-3">
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

const CustomLegend = ({
  selectedYears,
  addSelectedYear,
  removeSelectedYear,
}: TCustomLegendProps) => {
  return (
    <div className="w-full static grid grid-cols-6 gap-x-2 gap-y-1 mb-1 lg:grid-cols-11">
      {years.map((year, index) => (
        <div
          onClick={() => {
            selectedYears.includes(year)
              ? removeSelectedYear(year)
              : addSelectedYear(year);
          }}
          key={index}
          className="flex items-center space-x-1 border rounded-lg px-1 cursor-pointer"
          style={{
            borderColor: getYearColor(year),
            color: selectedYears.includes(year) ? "white" : getYearColor(year),
            backgroundColor: selectedYears.includes(year)
              ? getYearColor(year)
              : "white",
          }}
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
  selectedYears,
  addSelectedYear,
  removeSelectedYear,
}: TCustomLineChart) {
  return (
    <LineChart className="w-full h-full" responsive data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis label={yLabel} width="auto" tickLine={false} tickCount={10} />
      <Tooltip
        wrapperClassName="z-100"
        content={CustomTooltip}
        position={{ y: 100 }}
      />
      <Legend
        content={
          <CustomLegend
            selectedYears={selectedYears}
            addSelectedYear={addSelectedYear}
            removeSelectedYear={removeSelectedYear}
          />
        }
        verticalAlign="top"
      />

      {children}
    </LineChart>
  );
}
