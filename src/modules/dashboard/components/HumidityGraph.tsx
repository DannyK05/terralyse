"use client";
import data from "../../../utilities/data/humidity.json";
import { Chart } from "chart.js";
import { CategoryScale } from "chart.js";
import { months } from "..";
import { Line } from "react-chartjs-2";
type THumidity = {
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

export default function HumidityGraph() {
  const humidity: THumidity = data;
  const humidityData: THumidity = []; //Wind speed for the giving location over the years
  const years: number[] = [];
  let latitude = 10.25;
  let longitude = 10.25;
  let param = "specificHumidity";

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
    datasets: humidityData.map(
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
          text: "Specific Humidity (m/s)", // Y-axis label
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
    <>
      {" "}
      <Line data={chartData} options={options} />
    </>
  );
}
