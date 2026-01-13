"use client";
import { Chart } from "chart.js";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";

import { generateChartData } from "@/utilities/helper";
import { soilWetness } from "../../../utilities/data/soil-wetness";
import { months } from "../data";
import type { TGraphProps, TSoilDataTypeWithParams } from "../types";

export default function SoilWetnessGraph({
  lat = 10.25,
  lng = 10.25,
  param = "top-soil",
}: TGraphProps) {
  const soilWetnessData: TSoilDataTypeWithParams = []; //Wind speed for the giving location over the years
  const years: number[] = [];
  const latitude = lat;
  const longitude = lng;

  soilWetness.forEach((speed) => {
    years.push(speed.YEAR);
    if (
      speed.LAT === latitude &&
      speed.LON === longitude &&
      speed.PARAMETER === param
    ) {
      soilWetnessData.push(speed);
    }
  });

  Chart.register(CategoryScale);
  const chartData = {
    labels: months,
    datasets: generateChartData(soilWetnessData),
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: `${
            param === "top-soil"
              ? "Surface Soil Wetness"
              : "Root Soil Wetness (10m)"
          }`, // Y-axis label
        },
      },
      x: {
        title: {
          display: true,
          text: "Month", // X-axis label
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return <Line data={chartData} options={options} />;
}
