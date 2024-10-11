"use client";
import data from "../../../utilities/data/wind_speed.json";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { months } from "..";
import { colors } from "../../../utilities/data/chart_colors";

export type TWindSpeed = {
  YEAR: number;
  LAT: number;
  LON: number;
  JAN: number;
  FEB: number;
  MAR: number;
  APR: number;
  MAY: number;
  JUN: number;
  JUL: number;
  AUG: number;
  SEP: number;
  OCT: number;
  NOV: number;
  DEC: number;
}[];

export default function WindSpeedGraph({
  lat = 10.25,
  lng = 10.25,
}: {
  lat: number;
  lng: number;
}) {
  const windSpeed: TWindSpeed = data;
  const windSpeedData: TWindSpeed = []; //Wind speed for the giving location over the years
  const years: number[] = [];
  const latitude = lat;
  const longitude = lng;

  windSpeed.forEach((speed) => {
    years.push(speed.YEAR);
    if (speed.LAT === latitude && speed.LON === longitude) {
      windSpeedData.push(speed);
    }
  });

  const getYearColor = (YEAR: number) => {
    const yearColor = colors.find((color) => color.year === YEAR);
    return yearColor?.color;
  };

  Chart.register(CategoryScale);
  const chartData = {
    labels: months,
    datasets: windSpeedData.map(
      ({
        YEAR,
        JAN,
        FEB,
        MAR,
        APR,
        MAY,
        JUN,
        JUL,
        AUG,
        SEP,
        OCT,
        NOV,
        DEC,
      }) => {
        return {
          label: `${YEAR}`,
          data: [JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC],
          borderColor: getYearColor(YEAR),
          backgroundColor: getYearColor(YEAR),
          borderWidth: 3,
          fill: false,
        };
      }
    ),
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
