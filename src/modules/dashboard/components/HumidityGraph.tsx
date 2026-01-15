"use client";
import { Chart } from "chart.js";
import { CategoryScale } from "chart.js";
import { months } from "../data";
import { Line } from "react-chartjs-2";

import { generateChartData } from "@/utilities/helper";
import { humidity } from "../../../utilities/data/humidity";
import type { TGraphProps, TSoilDataTypeWithParams } from "../types";

export default function HumidityGraph({
  lat = 10.25,
  lng = 10.25,
  param = "specific-humidity",
}: TGraphProps) {
  const humidityData: TSoilDataTypeWithParams = []; //Wind speed for the giving location over the years
  const years: number[] = [];
  const latitude = lat;
  const longitude = lng;

  humidity.forEach((speed) => {
    years.push(speed.YEAR);
    if (
      speed.LAT === latitude &&
      speed.LON === longitude &&
      speed.PARAMETER === param
    ) {
      humidityData.push(speed);
    }
  });

  const getYAxisName = () => {
    switch (param) {
      case "specific-humidity":
        return "Specific Humidity";
      case "relative-humidity":
        return "Relative Humidity";
      case "average-precipitation":
        return "Average Precipitation";
      case "sum-average-precipitation":
        return "Sum Average Precipitation";
      default:
        break;
    }
  };

  Chart.register(CategoryScale);
  const chartData = {
    labels: months,
    datasets: generateChartData(humidityData),
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: getYAxisName(), // Y-axis label
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
