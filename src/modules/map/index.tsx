"use client";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { GoogleGenerativeAI } from "@google/generative-ai";
import soil_temp from "../../utilities/data/soil_temp.json";
import soil_wetness from "../../utilities/data/soil_wetness.json";
import wind_speed from "../../utilities/data/wind_speed.json";
import humidity from "../../utilities/data/humidity.json";
import AppLayout from "@/layout/layout";
import { TSoilTemp } from "../dashboard/components/SoilTempGraph";
import { TSoilWetness } from "../dashboard/components/SoilWetnessGraph";
import { TWindSpeed } from "../dashboard/components/WindSpeedGraph";
import { THumidity } from "../dashboard/components/HumidityGraph";
export default function Map() {
  const mapKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const aiKey: string = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY
    ? process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY
    : "";
  const genAI = new GoogleGenerativeAI(aiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const soilTemp: TSoilTemp = [];
  const topSoilWetness: TSoilWetness = [];
  const windSpeed: TWindSpeed = [];
  const specificHumidity: THumidity = [];
  const rootSoilWetness: TSoilWetness = [];
  const relativeHumidity: THumidity = [];
  const averagePrecipitation: THumidity = [];
  const sumAveragePrecipitation: THumidity = [];

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

  const prompt = `Using these summarized data of the change in agricultural factors from 2020 to 2021 of northern nigeria, return a JSON of farming feasibility, drought feasibility and flooding feasibility percentage for each coordinate based on these conditions: 
Soil Temperature: ${JSON.stringify(soilTemp)},
Top Soil Wetness: ${JSON.stringify(topSoilWetness)},
Specific Humidity: ${JSON.stringify(specificHumidity)},
Root Soil Wetness: ${JSON.stringify(rootSoilWetness)},
Average Precipitation: ${JSON.stringify(averagePrecipitation)},
Wind Speed: ${JSON.stringify(windSpeed)}.`;
  // const prompt = "List two types of flowers";

  const getResult = async () => {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
  };

  const center = {
    lat: 10.25,
    lng: 10.25, // Example coordinates, set your default center
  };
  const containerStyle = {
    width: "100%",
    height: "600px",
  };

  if (!mapKey) {
    return (
      <div>
        Error: Google Maps API key is missing. Please add it to the environment
        variables.
      </div>
    );
  }
  return (
    <AppLayout activePage="map">
      <section className="flex flex-col items-center space-y-2 mb-[80px] ">
        <div className="w-full bg-terra text-center p-4 mb-4 shadow-lg">
          <h1 className="text-terra-white  text-3xl">
            Prediction Map integrated with Google Gemini 1.5
          </h1>
        </div>
        <button
          className="p-2 w-[80%] rounded-lg bg-terra text-white active:bg-terra-accent-bg active:text-terra hover:text-terra hover:bg-terra-accent-bg"
          type="button"
          onClick={getResult}
        >
          Get Prediction
        </button>
        <LoadScript googleMapsApiKey={mapKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            {/* Additional components like Markers or InfoWindows go here */}
          </GoogleMap>
        </LoadScript>
      </section>
    </AppLayout>
  );
}
