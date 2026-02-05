import HumidityGraph from "./components/HumidityGraph";
import SoilTempGraph from "./components/SoilTempGraph";
import SoilWetnessGraph from "./components/SoilWetnessGraph";
import WindSpeedGraph from "./components/WindSpeedGraph";
import type { THumidityParams, TSoilFactor, TSoilWetnessParams } from "./types";

export const years = [
  2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013,
  2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
];

export const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export const humidityParams: THumidityParams[] = [
  "specific-humidity",
  "relative-humidity",
  "average-precipitation",
  "sum-average-precipitation",
];

export const soilWetnessParams: TSoilWetnessParams[] = [
  "top-soil",
  "root-soil",
];

export const soilFactors: TSoilFactor[] = [
  {
    name: "Wind Speed",
    description:
      "This plays a vital role in pollination and soil erosion and irrigation efficiency",
    Graph: WindSpeedGraph,
    hasParams: false,
  },
  {
    name: "Soil Skin Temperature",
    description:
      "This plays a role in seed germination, heat stress in crops and soil microbial activity",
    Graph: SoilTempGraph,
    hasParams: false,
  },
  {
    name: "Humidity and Precipitation",
    description:
      "These play a vital role in prediciting rainfall, plant growth and soil moisture retention",
    Graph: HumidityGraph,
    hasParams: true,
  },
  {
    name: "Soil Wetness",
    description:
      "This helps in plant growth and could be a indication of constant rainfall",
    Graph: SoilWetnessGraph,
    hasParams: true,
  },
];
