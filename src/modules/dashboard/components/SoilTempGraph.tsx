"use client";
import { soilTemp } from "../../../utilities/data/soil-temp";
import { Chart } from "chart.js";
import { CategoryScale } from "chart.js";
import { months } from "../data";
import { Line } from "react-chartjs-2";

import { generateChartData } from "@/utilities/helper";
import type { TGraphProps, TSoilDataType } from "../types";

export default function SoilTempGraph({
  lat = 10.25,
  lng = 10.25,
}: TGraphProps) {
  const soilTempData: TSoilDataType = []; //Wind speed for the given location over the years
  const years: number[] = [];
  const latitude = lat;
  const longitude = lng;

  soilTemp.forEach((speed) => {
    years.push(speed.YEAR);
    if (speed.LAT === latitude && speed.LON === longitude) {
      soilTempData.push(speed);
    }
  });

  Chart.register(CategoryScale);
  const chartData = {
    labels: months,
    datasets: generateChartData(soilTempData),
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Soil Skin Temperature (C)", // Y-axis label
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
