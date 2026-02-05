"use client";
import { useMemo, useState } from "react";
import { Line } from "recharts";

import CustomLineChart from "@/components/CustomLineChart";
import { generateRechartData, getYearColor } from "@/utilities/helper";
import { humidity } from "../../../utilities/data/humidity";
import type { TGraphProps, TSoilDataTypeWithParams } from "../types";
import useHandleYearFilter from "@/utilities/hooks/useHandleYearFilter";

export default function HumidityGraph({
  lat = 10.25,
  lng = 10.25,
  param = "specific-humidity",
}: TGraphProps) {
  const { selectedYears, addSelectedYear, removeSelectedYear } =
    useHandleYearFilter();

  const latitude = lat;
  const longitude = lng;

  const humidityData: TSoilDataTypeWithParams = useMemo(
    () =>
      humidity.filter(
        ({ LAT, LON, PARAMETER }) =>
          LAT === latitude && LON === longitude && PARAMETER === param,
      ),
    [param, latitude, longitude],
  ); //Humidity for the giving location over the years

  const years = useMemo(() => {
    const filteredYears = new Set(humidityData.map((d) => d.YEAR));
    return Array.from(filteredYears);
  }, [humidityData]);

  // const getYAxisLabel = () => {
  //   switch (param) {
  //     case "specific-humidity":
  //       return "Specific Humidity";
  //     case "relative-humidity":
  //       return "Relative Humidity";
  //     case "average-precipitation":
  //       return "Average Precipitation";
  //     case "sum-average-precipitation":
  //       return "Sum Average Precipitation";
  //     default:
  //       return "Y-axis";
  //   }
  // };

  return (
    <CustomLineChart
      selectedYears={selectedYears}
      addSelectedYear={addSelectedYear}
      removeSelectedYear={removeSelectedYear}
      data={generateRechartData(humidityData)}
      // yLabel={getYAxisLabel()}
    >
      {selectedYears.length !== 0
        ? selectedYears.map((year, id) => (
            <Line
              key={id}
              type="monotone"
              dataKey={year.toString()}
              stroke={getYearColor(year)}
              activeDot={{ r: 5 }}
            />
          ))
        : years.map((year, id) => (
            <Line
              key={id}
              type="monotone"
              dataKey={year.toString()}
              stroke={getYearColor(year)}
              activeDot={{ r: 5 }}
            />
          ))}
    </CustomLineChart>
  );
}
