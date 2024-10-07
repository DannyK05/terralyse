"use client";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { GoogleGenerativeAI } from "@google/generative-ai";
import soil_temp from "../../utilities/data/soil_temp.json";
import soil_wetness from "../../utilities/data/soil_wetness.json";
import wind_speed from "../../utilities/data/wind_speed.json";
import AppLayout from "@/layout/layout";
export default function Map() {
  const mapKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const aiKey: string = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY
    ? process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY
    : "";
  const genAI = new GoogleGenerativeAI(aiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const prompt = `Using these summarized data, return a JSON of farming feasibility percentage based on these conditions: 
Soil Temperature: ${JSON.stringify(soil_temp.slice(0, 10))},
Soil Wetness: ${JSON.stringify(soil_wetness.slice(0, 10))}, 
Wind Speed: ${JSON.stringify(wind_speed.slice(0, 10))}.`;
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
    height: "80%",
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
    <AppLayout>
      <section>
        <h1>Map</h1>
        <LoadScript googleMapsApiKey={mapKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            {/* Additional components like Markers or InfoWindows go here */}
          </GoogleMap>
        </LoadScript>
        <button type="button" onClick={getResult}>
          Get Result
        </button>
      </section>
    </AppLayout>
  );
}
