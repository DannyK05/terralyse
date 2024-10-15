import soil_temp from "../data/soil_temp.json";
import soil_wetness from "../data/soil_wetness.json";
import wind_speed from "../data/wind_speed.json";
import humidity from "../data/humidity.json";
import { TSoilTemp } from "../../modules/dashboard/components/SoilTempGraph";
import { TSoilWetness } from "../../modules/dashboard/components/SoilWetnessGraph";
import { TWindSpeed } from "../../modules/dashboard/components/WindSpeedGraph";
import { THumidity } from "../../modules/dashboard/components/HumidityGraph";
import coordinate from "../data/coordinate.json";

const prediction: {
  lat: number;
  lng: number;
  drought: number;
  flood: number;
  farming: number;
}[] = [];

const soilTemp: TSoilTemp = [];
const topSoilWetness: TSoilWetness = [];
const windSpeed: TWindSpeed = [];
const specificHumidity: THumidity = [];
const rootSoilWetness: TSoilWetness = [];
const relativeHumidity: THumidity = [];
const averagePrecipitation: THumidity = [];
const sumAveragePrecipitation: THumidity = [];

const droughtSoilTemp = 0;
const droughtWindSpeed = 0;
const droughtSpecificHumidity = 0;
const droughtRootSoilWetness = 0;
const droughtTopSoilWetness = 0;
const droughtRelativeHumidity = 0;
const droughtAveragePrecipitation = 0;
const droughtSumAveragePrecipitation = 0;

const floodSoilTemp = 0;
const floodWindSpeed = 0;
const floodSpecificHumidity = 0;
const floodRootSoilWetness = 0;
const floodTopSoilWetness = 0;
const floodRelativeHumidity = 0;
const floodAveragePrecipitation = 0;
const floodSumAveragePrecipitation = 0;

const farmingSoilTemp = 0;
const farmingWindSpeed = 0;
const farmingSpecificHumidity = 0;
const farmingRootSoilWetness = 0;
const farmingTopSoilWetness = 0;
const farmingRelativeHumidity = 0;
const farmingAveragePrecipitation = 0;
const farmingSumAveragePrecipitation = 0;

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

const getPrediction = () => {
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

    // Drought Prediction Data
    // These are conditional variables to check if the selected variable is undefined
    let DAvgPrecip = selectedAveragePrecipitation
      ? selectedAveragePrecipitation.ANN / droughtAveragePrecipitation
      : 0;
    let DSumAvgPrecip = selectedSumAveragePrecipitation
      ? selectedSumAveragePrecipitation.ANN / droughtSumAveragePrecipitation
      : 0;
    let DRelHumid = selectedRelativeHumidity
      ? selectedRelativeHumidity.ANN / droughtRelativeHumidity
      : 0;
    let DSpecHumid = selectedSpecificHumidity
      ? selectedSpecificHumidity.ANN / droughtSpecificHumidity
      : 0;
    let DRootSoil = selectedRootSoilWetness
      ? selectedRootSoilWetness.ANN / droughtRootSoilWetness
      : 0;
    let DTopSoil = selectedTopSoilWetness
      ? selectedTopSoilWetness.ANN / droughtTopSoilWetness
      : 0;
    let DWindSpeed = selectedWindSpeed
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
        (12 * droughtWindSpeed)
      : 0;
    let DSoilTemp = selectedSoilTemp
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
        (12 * droughtSoilTemp)
      : 0;
    const DroughtPrediction =
      ((DAvgPrecip +
        DSumAvgPrecip +
        DRelHumid +
        DSpecHumid +
        DRootSoil +
        DTopSoil +
        DSoilTemp +
        DWindSpeed) /
        8) *
      100;

    // Flood prediction data
    // These are conditional variables to check if the selected variable is undefined
    let FAvgPrecip = selectedAveragePrecipitation
      ? selectedAveragePrecipitation.ANN / floodAveragePrecipitation
      : 0;
    let FSumAvgPrecip = selectedSumAveragePrecipitation
      ? selectedSumAveragePrecipitation.ANN / floodSumAveragePrecipitation
      : 0;
    let FRelHumid = selectedRelativeHumidity
      ? selectedRelativeHumidity.ANN / floodRelativeHumidity
      : 0;
    let FSpecHumid = selectedSpecificHumidity
      ? selectedSpecificHumidity.ANN / floodSpecificHumidity
      : 0;
    let FRootSoil = selectedRootSoilWetness
      ? selectedRootSoilWetness.ANN / floodRootSoilWetness
      : 0;
    let FTopSoil = selectedTopSoilWetness
      ? selectedTopSoilWetness.ANN / floodTopSoilWetness
      : 0;
    let FWindSpeed = selectedWindSpeed
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
        (12 * floodWindSpeed)
      : 0;
    let FSoilTemp = selectedSoilTemp
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
        (12 * floodSoilTemp)
      : 0;

    const FloodPrediction =
      ((FAvgPrecip +
        FSumAvgPrecip +
        FRelHumid +
        FSpecHumid +
        FRootSoil +
        FTopSoil +
        FSoilTemp +
        FWindSpeed) /
        8) *
      100;

    // Farming possibility data
    // These are conditional variables to check if the selected variable is undefined
    let FmAvgPrecip = selectedAveragePrecipitation
      ? selectedAveragePrecipitation.ANN / farmingAveragePrecipitation
      : 0;
    let FmSumAvgPrecip = selectedSumAveragePrecipitation
      ? selectedSumAveragePrecipitation.ANN / farmingSumAveragePrecipitation
      : 0;
    let FmRelHumid = selectedRelativeHumidity
      ? selectedRelativeHumidity.ANN / farmingRelativeHumidity
      : 0;
    let FmSpecHumid = selectedSpecificHumidity
      ? selectedSpecificHumidity.ANN / farmingSpecificHumidity
      : 0;
    let FmRootSoil = selectedRootSoilWetness
      ? selectedRootSoilWetness.ANN / farmingRootSoilWetness
      : 0;
    let FmTopSoil = selectedTopSoilWetness
      ? selectedTopSoilWetness.ANN / farmingTopSoilWetness
      : 0;
    let FmWindSpeed = selectedWindSpeed
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
        (12 * farmingWindSpeed)
      : 0;
    let FmSoilTemp = selectedSoilTemp
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
        (12 * farmingSoilTemp)
      : 0;

    const FarmingPossibility =
      ((FmAvgPrecip +
        FmSumAvgPrecip +
        FmRelHumid +
        FmSpecHumid +
        FmRootSoil +
        FmTopSoil +
        FmSoilTemp +
        FmWindSpeed) /
        8) *
      100;

    prediction.push({
      lat: selectedCoordinate.lat,
      lng: selectedCoordinate.lng,
      drought: DroughtPrediction,
      farming: FarmingPossibility,
      flood: FloodPrediction,
    });
  }

  return [getPrediction, { prediction }];
};
