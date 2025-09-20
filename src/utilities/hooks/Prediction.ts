import { soil_temp } from "../data/soil-temp";
import { soil_wetness } from "../data/soil-wetness";
import { wind_speed } from "../data/wind-speed";
import { coordinate } from "../data/coordinate";
import { humidity } from "../data/humidity";
import { TSoilTemp } from "../../modules/dashboard/components/SoilTempGraph";
import { TSoilWetness } from "../../modules/dashboard/components/SoilWetnessGraph";
import { TWindSpeed } from "../../modules/dashboard/components/WindSpeedGraph";
import { THumidity } from "../../modules/dashboard/components/HumidityGraph";

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

const soilTemp: TSoilTemp = [];
const topSoilWetness: TSoilWetness = [];
const windSpeed: TWindSpeed = [];
const specificHumidity: THumidity = [];
const rootSoilWetness: TSoilWetness = [];
const relativeHumidity: THumidity = [];
const averagePrecipitation: THumidity = [];
const sumAveragePrecipitation: THumidity = [];

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

soil_temp.find((data) => {
  if (data.YEAR === 2020 || data.YEAR === 2021) {
    soilTemp.push(data);
  }
});

soil_wetness.find((data) => {
  if (
    (data.PARAMETER === "topSoil" && data.YEAR === 2020) ||
    (data.YEAR === 2021 && data.PARAMETER === "topSoil")
  ) {
    topSoilWetness.push(data);
  }
  if (
    (data.PARAMETER === "rootSoil" && data.YEAR === 2020) ||
    (data.YEAR === 2021 && data.PARAMETER === "rootSoil")
  ) {
    rootSoilWetness.push(data);
  }
});

wind_speed.find((data) => {
  if (data.YEAR === 2020 || data.YEAR === 2021) {
    windSpeed.push(data);
  }
});

humidity.find((data) => {
  if (
    (data.PARAMETER === "specificHumidity" && data.YEAR === 2020) ||
    (data.PARAMETER === "specificHumidity" && data.YEAR === 2021)
  ) {
    specificHumidity.push(data);
  }
  if (
    (data.PARAMETER === "relativeHumidity" && data.YEAR === 2020) ||
    (data.PARAMETER === "relativeHumidity" && data.YEAR === 2021)
  ) {
    relativeHumidity.push(data);
  }
  if (
    (data.PARAMETER === "averagePrecipitation" && data.YEAR === 2020) ||
    (data.PARAMETER === "averagePrecipitation" && data.YEAR === 2021)
  ) {
    averagePrecipitation.push(data);
  }
  if (
    (data.PARAMETER === "sumAveragePrecipitation" && data.YEAR === 2020) ||
    (data.PARAMETER === "sumAveragePrecipitation" && data.YEAR === 2021)
  ) {
    sumAveragePrecipitation.push(data);
  }
});
console.log(soilTemp);

export const getPrediction = () => {
  for (let i = 0; i < coordinate.length; i++) {
    const selectedCoordinate = coordinate[i];
    const selectedSpecificHumidity = specificHumidity.find(
      ({ LAT, LON }) =>
        selectedCoordinate.lat === LAT && selectedCoordinate.lng === LON
    );
    const selectedRelativeHumidity = relativeHumidity.find(
      ({ LAT, LON }) =>
        selectedCoordinate.lat === LAT && selectedCoordinate.lng === LON
    );
    const selectedSoilTemp = soilTemp.find(
      ({ LAT, LON }) =>
        selectedCoordinate.lat === LAT && selectedCoordinate.lng === LON
    );
    const selectedWindSpeed = windSpeed.find(
      ({ LAT, LON }) =>
        selectedCoordinate.lat === LAT && selectedCoordinate.lng === LON
    );
    const selectedTopSoilWetness = topSoilWetness.find(
      ({ LAT, LON }) =>
        selectedCoordinate.lat === LAT && selectedCoordinate.lng === LON
    );
    const selectedRootSoilWetness = rootSoilWetness.find(
      ({ LAT, LON }) =>
        selectedCoordinate.lat === LAT && selectedCoordinate.lng === LON
    );
    const selectedAveragePrecipitation = averagePrecipitation.find(
      ({ LAT, LON }) =>
        selectedCoordinate.lat === LAT && selectedCoordinate.lng === LON
    );
    const selectedSumAveragePrecipitation = sumAveragePrecipitation.find(
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
