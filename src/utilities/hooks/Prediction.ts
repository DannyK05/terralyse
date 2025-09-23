import { soilTemp } from "../data/soil-temp";
import { soilWetness } from "../data/soil-wetness";
import { windSpeed } from "../data/wind-speed";
import { coordinate } from "../data/coordinate";
import { humidity } from "../data/humidity";
import {
  TSoilDataType,
  TSoilDataTypeWithParams,
} from "@/modules/dashboard/types";

export const prediction: {
  lat: number;
  lng: number;
  specificHumidity: number;
  relativeHumidity: number;
  soilTemp: number;
  windSpeed: number;
  topSoilWetness: number;
  rootSoilWetness: number;
  averagePrecipitation: number;
  sumAveragePrecipitation: number;
}[] = [];

const soilTempFilter: TSoilDataTypeWithParams = [];
const topSoilWetnessFilter: TSoilDataTypeWithParams = [];
const windSpeedFilter: TSoilDataType = [];
const specificHumidityFilter: TSoilDataTypeWithParams = [];
const rootSoilWetnessFilter: TSoilDataTypeWithParams = [];
const relativeHumidityFilter: TSoilDataTypeWithParams = [];
const averagePrecipitationFilter: TSoilDataTypeWithParams = [];
const sumAveragePrecipitationFilter: TSoilDataTypeWithParams = [];

// const droughtSoilTemp = 35;
// const droughtWindSpeed = 10;
// const droughtSpecificHumidity = 7.5;
// const droughtRootSoilWetness = 0.9;
// const droughtTopSoilWetness = 0.1;
// const droughtRelativeHumidity = 25;
// const droughtAveragePrecipitation = 10;
// const droughtSumAveragePrecipitation = 120;

// const floodSoilTemp = 12;
// const floodWindSpeed = 20;
// const floodSpecificHumidity = 25;
// const floodRootSoilWetness = 0.9;
// const floodTopSoilWetness = 0.9;
// const floodRelativeHumidity = 95;
// const floodAveragePrecipitation = 35;
// const floodSumAveragePrecipitation = 300;

// const farmingSoilTemp = 20;
// const farmingWindSpeed = 3;
// const farmingSpecificHumidity = 13;
// const farmingRootSoilWetness = 0.6;
// const farmingTopSoilWetness = 0.6;
// const farmingRelativeHumidity = 70;
// const farmingAveragePrecipitation = 10;
// const farmingSumAveragePrecipitation = 150;

soilTemp.find((data) => {
  if (data.YEAR === 2020 || data.YEAR === 2021) {
    soilTemp.push(data);
  }
});

soilWetness.find((data) => {
  if (
    (data.PARAMETER === "topSoil" && data.YEAR === 2020) ||
    (data.YEAR === 2021 && data.PARAMETER === "topSoil")
  ) {
    topSoilWetnessFilter.push(data);
  }
  if (
    (data.PARAMETER === "rootSoil" && data.YEAR === 2020) ||
    (data.YEAR === 2021 && data.PARAMETER === "rootSoil")
  ) {
    rootSoilWetnessFilter.push(data);
  }
});

windSpeed.find((data) => {
  if (data.YEAR === 2020 || data.YEAR === 2021) {
    windSpeed.push(data);
  }
});

humidity.find((data) => {
  if (
    (data.PARAMETER === "specificHumidity" && data.YEAR === 2020) ||
    (data.PARAMETER === "specificHumidity" && data.YEAR === 2021)
  ) {
    specificHumidityFilter.push(data);
  }
  if (
    (data.PARAMETER === "relativeHumidity" && data.YEAR === 2020) ||
    (data.PARAMETER === "relativeHumidity" && data.YEAR === 2021)
  ) {
    relativeHumidityFilter.push(data);
  }
  if (
    (data.PARAMETER === "averagePrecipitation" && data.YEAR === 2020) ||
    (data.PARAMETER === "averagePrecipitation" && data.YEAR === 2021)
  ) {
    averagePrecipitationFilter.push(data);
  }
  if (
    (data.PARAMETER === "sumAveragePrecipitation" && data.YEAR === 2020) ||
    (data.PARAMETER === "sumAveragePrecipitation" && data.YEAR === 2021)
  ) {
    sumAveragePrecipitationFilter.push(data);
  }
});
console.log(soilTemp);

export const getPrediction = () => {
  for (let i = 0; i < coordinate.length; i++) {
    const selectedCoordinate = coordinate[i];
    const selectedSpecificHumidity = specificHumidityFilter?.find(
      ({ LAT, LON }) =>
        selectedCoordinate.lat === LAT && selectedCoordinate.lng === LON
    );
    const selectedRelativeHumidity = relativeHumidityFilter?.find(
      ({ LAT, LON }) =>
        selectedCoordinate.lat === LAT && selectedCoordinate.lng === LON
    );
    const selectedSoilTemp = soilTempFilter?.find(
      ({ LAT, LON }) =>
        selectedCoordinate.lat === LAT && selectedCoordinate.lng === LON
    );
    const selectedWindSpeed = windSpeedFilter?.find(
      ({ LAT, LON }) =>
        selectedCoordinate.lat === LAT && selectedCoordinate.lng === LON
    );
    const selectedTopSoilWetness = topSoilWetnessFilter?.find(
      ({ LAT, LON }) =>
        selectedCoordinate.lat === LAT && selectedCoordinate.lng === LON
    );
    const selectedRootSoilWetness = rootSoilWetnessFilter.find(
      ({ LAT, LON }) =>
        selectedCoordinate.lat === LAT && selectedCoordinate.lng === LON
    );
    const selectedAveragePrecipitation = averagePrecipitationFilter.find(
      ({ LAT, LON }) =>
        selectedCoordinate.lat === LAT && selectedCoordinate.lng === LON
    );
    const selectedSumAveragePrecipitation = sumAveragePrecipitationFilter.find(
      ({ LAT, LON }) =>
        selectedCoordinate.lat === LAT && selectedCoordinate.lng === LON
    );

    // Sum  of all months and divide by 12 to get the average
    // These are conditional variables to check if the selected variable is undefined
    const DAvgPrecip = selectedAveragePrecipitation?.ANN ?? 0;
    const DSumAvgPrecip = selectedSumAveragePrecipitation?.ANN ?? 0;
    const DRelHumid = selectedRelativeHumidity?.ANN ?? 0;
    const DSpecHumid = selectedSpecificHumidity?.ANN ?? 0;
    const DRootSoil = selectedRootSoilWetness?.ANN ?? 0;
    const DTopSoil = selectedTopSoilWetness?.ANN ?? 0;
    const DWindSpeed = selectedWindSpeed
      ? (selectedWindSpeed.JAN +
          selectedWindSpeed.FEB +
          selectedWindSpeed.MAR +
          selectedWindSpeed.APR +
          selectedWindSpeed.MAY +
          selectedWindSpeed.JUN +
          selectedWindSpeed.JUL +
          selectedWindSpeed.AUG +
          selectedWindSpeed.SEP +
          selectedWindSpeed.OCT +
          selectedWindSpeed.NOV +
          selectedWindSpeed.DEC) /
        12
      : 0;
    const DSoilTemp = selectedSoilTemp
      ? (selectedSoilTemp.JAN +
          selectedSoilTemp.FEB +
          selectedSoilTemp.MAR +
          selectedSoilTemp.APR +
          selectedSoilTemp.MAY +
          selectedSoilTemp.JUN +
          selectedSoilTemp.JUL +
          selectedSoilTemp.AUG +
          selectedSoilTemp.SEP +
          selectedSoilTemp.OCT +
          selectedSoilTemp.NOV +
          selectedSoilTemp.DEC) /
        12
      : 0;

    prediction.push({
      lat: selectedCoordinate.lat,
      lng: selectedCoordinate.lng,
      specificHumidity: DSpecHumid,
      relativeHumidity: DRelHumid,
      soilTemp: DSoilTemp,
      windSpeed: DWindSpeed,
      topSoilWetness: DTopSoil,
      rootSoilWetness: DRootSoil,
      averagePrecipitation: DAvgPrecip,
      sumAveragePrecipitation: DSumAvgPrecip,
    });
  }
};
// In case I forget , todo: make sure the  avearage is for the two years using for each to add each factors value for 2020 and 2021
// Also I wanted to feed the sum average to gemini to generate a object of the drough, farming and flood percentages
