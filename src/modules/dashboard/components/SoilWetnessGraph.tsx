"use client";
import { useMemo } from "react";
import { Line } from "recharts";

import CustomLineChart from "@/components/CustomLineChart";
import { generateRechartData, getYearColor } from "@/utilities/helper";
import { soilWetness } from "../../../utilities/data/soil-wetness";
import type { TGraphProps, TSoilDataTypeWithParams } from "../types";

export default function SoilWetnessGraph({
  lat = 10.25,
  lng = 10.25,
  param = "top-soil",
}: TGraphProps) {
  const latitude = lat;
  const longitude = lng;

  const soilWetnessData: TSoilDataTypeWithParams = useMemo(
    () =>
      soilWetness.filter(
        ({ LAT, LON, PARAMETER }) =>
          LAT === latitude && LON === longitude && PARAMETER === param
      ),
    [param, latitude, longitude]
  ); //Soil Wetness for the giving location over the years

  const years = useMemo(() => {
    const filteredYears = new Set(soilWetnessData.map((d) => d.YEAR));
    return Array.from(filteredYears);
  }, [soilWetnessData]);

  return (
    <CustomLineChart data={generateRechartData(soilWetnessData)}>
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
