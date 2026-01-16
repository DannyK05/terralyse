"use client";
import { useMemo } from "react";
import { Line } from "recharts";

import CustomLineChart from "@/components/CustomLineChart";
import { generateRechartData, getYearColor } from "@/utilities/helper";
import { windSpeed } from "../../../utilities/data/wind-speed";
import type { TGraphProps, TSoilDataType } from "../types";

export default function WindSpeedGraph({
  lat = 10.25,
  lng = 10.25,
}: TGraphProps) {
  const latitude = lat;
  const longitude = lng;

  const windSpeedData: TSoilDataType = useMemo(
    () =>
      windSpeed.filter(({ LAT, LON }) => LAT === latitude && LON === longitude),
    [latitude, longitude]
  ); //Wind Speed for the given location over the years

  const years = useMemo(() => {
    const filteredYears = new Set(windSpeedData.map((d) => d.YEAR));
    return Array.from(filteredYears);
  }, [windSpeedData]);

  return (
    <CustomLineChart data={generateRechartData(windSpeedData)}>
      {years.map((year, id) => (
        <Line
          key={id}
          type="monotone"
          dataKey={year.toString()}
          stroke={getYearColor(year)}
          activeDot={{ r: 8 }}
        />
      ))}
    </CustomLineChart>
  );
}
