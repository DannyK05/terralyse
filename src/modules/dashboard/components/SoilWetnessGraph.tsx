"use client";
import data from "../../../utilities/data/soil_wetness.json";
import { Chart } from "chart.js";
import { CategoryScale } from "chart.js";
import { months } from "..";
import { Line } from "react-chartjs-2";
import { colors } from "../../../utilities/data/chart_colors";
export type TSoilWetness = {
  PARAMETER: string;
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
  ANN: number;
}[];
export default function SoilWetnessGraph({
  lat = 10.25,
  lng = 10.25,
  param = "topSoil",
}: {
  lat: number;
  lng: number;
  param?: "topSoil" | "rootSoil";
}) {
  const soilWetness: TSoilWetness = data;
  const soilWetnessData: TSoilWetness = []; //Wind speed for the giving location over the years
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

  const getYearColor = (YEAR: number) => {
    const yearColor = colors.find((color) => color.year === YEAR);
    return yearColor?.color;
  };

  Chart.register(CategoryScale);
  const chartData = {
    labels: months,
    datasets: soilWetnessData.map(
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
          text: `${
            param === "topSoil"
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

  return (
    <div className="bg-terra-white p-2 h-full">
      <Line data={chartData} options={options} />
    </div>
  );
}
