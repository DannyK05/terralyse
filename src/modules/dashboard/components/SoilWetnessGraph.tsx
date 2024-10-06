"use client";
import data from "../../../utilities/data/soil_wetness.json";
import { Chart } from "chart.js";
import { CategoryScale } from "chart.js";
import { months } from "..";
import { Line } from "react-chartjs-2";
type TSoilWetness = {
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
export default function SoilWetnessGraph() {
  const soilWetness: TSoilWetness = data;
  const soilWetnessData: TSoilWetness = []; //Wind speed for the giving location over the years
  const years: number[] = [];
  let latitude = 10.25;
  let longitude = 10.25;
  let param = "topSoil";

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

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
          label: `Year ${YEAR}`,
          data: [JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC],
          borderColor: getRandomColor(),
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
          text: `${"Surface Soil Wetness"}`, // Y-axis label
        },
      },
      x: {
        title: {
          display: true,
          text: "Month", // X-axis label
        },
      },
    },
  };

  return (
    <div className="bg-terra-white p-2">
      <Line data={chartData} options={options} />
    </div>
  );
}
