"use client";
import { useMemo } from "react";
import { Line } from "recharts";

import CustomLineChart from "@/components/CustomLineChart";
import { generateRechartData, getYearColor } from "@/utilities/helper";
import { soilTemp } from "@/utilities/data/soil-temp";
import type { TGraphProps, TSoilDataType } from "../types";
import useHandleYearFilter from "@/utilities/hooks/useHandleYearFilter";

export default function SoilTempGraph({
  lat = 10.25,
  lng = 10.25,
}: TGraphProps) {
  const { selectedYears, addSelectedYear, removeSelectedYear } =
    useHandleYearFilter();

  const latitude = lat;
  const longitude = lng;
  const soilTempData: TSoilDataType = useMemo(
    () =>
      soilTemp.filter(({ LAT, LON }) => LAT === latitude && LON === longitude),
    [latitude, longitude],
  ); //Soil Temperature for the given location over the years

  const years = useMemo(() => {
    const filteredYears = new Set(soilTempData.map((d) => d.YEAR));
    return Array.from(filteredYears);
  }, [soilTempData]);

  return (
    <CustomLineChart
    selectedYears={selectedYears}
      addSelectedYear={addSelectedYear}
      removeSelectedYear={removeSelectedYear}
      data={generateRechartData(soilTempData)}
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
