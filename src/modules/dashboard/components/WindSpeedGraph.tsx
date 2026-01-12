"use client";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

import { generateChartData} from "@/utilities/helper";
import { windSpeed } from "../../../utilities/data/wind-speed";
import { months } from "../data";
import type { TGraphProps, TSoilDataType } from "../types";

export default function WindSpeedGraph({
  lat = 10.25,
  lng = 10.25,
}: TGraphProps) {
  const windSpeedData: TSoilDataType = []; //Wind speed for the giving location over the years
  const years: number[] = [];
  const latitude = lat;
  const longitude = lng;

  windSpeed.forEach((speed) => {
    years.push(speed.YEAR);
    if (speed.LAT === latitude && speed.LON === longitude) {
      windSpeedData.push(speed);
    }
  });

  Chart.register(CategoryScale);
  const chartData = {
    labels: months,
    datasets: generateChartData(windSpeedData)
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Wind Speed (m/s)", // Y-axis label
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

  return (
    <div className="bg-terra-white p-2 h-full">
      <Line data={chartData} options={options} />
    </div>
  );
}
