"use client";
import AppLayout from "@/layout/layout";
import HumidityGraph from "./components/HumidityGraph";
import SoilTempGraph from "./components/SoilTempGraph";
import SoilWetnessGraph from "./components/SoilWetnessGraph";
import WindSpeedGraph from "./components/WindSpeedGraph";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import coordinate from "../../utilities/data/coordinate.json";
import { useState } from "react";
export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export default function Dashboard() {
  const [mapLocation, setMapLocation] = useState<{ lat: number; lng: number }>({
    lat: 10.25,
    lng: 10.25,
  });
  const [wetnessParam, setWetnessParam] = useState<"topSoil" | "rootSoil">(
    "topSoil"
  );
  const [humidityParam, setHumidityParam] = useState<
    | "specificHumidity"
    | "relativeHumidity"
    | "averagePrecipitation"
    | "sumAveragePrecipitation"
  >("specificHumidity");

  const mapKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const center = {
    lat: mapLocation.lat,
    lng: mapLocation.lng,
  };
  const containerStyle = {
    width: "100%",
    height: "250px",
  };

  const handleLocationSelection = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newLat = e.latLng.lat();
      const newLng = e.latLng.lng();
      setMapLocation((mapLocation) => ({
        ...mapLocation,
        lat: newLat,
        lng: newLng,
      }));
    }
  };

  return (
    <AppLayout activePage="dashboard">
      <>
        <div className=" bg-terra text-center p-4 mb-4 shadow-lg">
          <h1 className="text-terra-white  text-3xl">
            Northen - Nigeria Analysis Dashboard
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-x-2 gap-y-4">
          <section className=" h-[50vh] bg-terra w-full p-4 rounded-lg lg:col-span-2">
            <h1 className="text-terra-white text-2xl">Map Selection</h1>
            <div className="w-full">
              {mapKey && mapKey !== " " ? (
                <LoadScript googleMapsApiKey={mapKey}>
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                  >
                    {coordinate.map(({ lng, lat }, index) => (
                      <Marker
                        onClick={handleLocationSelection}
                        key={index}
                        position={{ lat: lat, lng: lng }}
                      />
                    ))}
                  </GoogleMap>
                </LoadScript>
              ) : (
                <div>Api key is invalid or expires</div>
              )}
            </div>
          </section>
          <section className="h-[95vh] bg-terra p-4 rounded-lg shadow-lg">
            <div className="w-full h-[25%]">
              <h1 className="text-terra-white text-2xl">Wind Speed</h1>
              <p className="text-terra-white h- mb-2">
                Wind speed plays a vtal role in pollination and soil erosion and
                irrigation efficiency
              </p>
            </div>
            <div className="h-[70%] mt-5">
              <WindSpeedGraph lat={mapLocation.lat} lng={mapLocation.lng} />
            </div>
          </section>
          <section className="h-[95vh] bg-terra p-4 rounded-lg shadow-lg">
            <div className="w-full h-[25%]">
              <h1 className="text-terra-white text-2xl">
                Soil Skin Temperature
              </h1>
              <p className="text-terra-white mb-2">
                {" "}
                It plays a role in seed germination, heat stress in crops and
                soil microbial activity
              </p>
            </div>
            <div className="h-[70%] mt-5">
              <SoilTempGraph lat={mapLocation.lat} lng={mapLocation.lng} />
            </div>
          </section>
          <section className="h-[95vh] bg-terra p-4 rounded-lg shadow-lg">
            <div className="w-full h-[20%]">
              <h1 className="text-terra-white text-2xl">
                Humidity and Precipitation
              </h1>
              <p className="text-terra-white mb-2">
                Humidity and Precipitation plays a vital role in prediciting
                rainfall, plant growth and soil moisture retention
              </p>

              <div className="flex items-center space-x-2">
                <span
                  className={`${
                    humidityParam === "specificHumidity" &&
                    "bg-terra-accent-bg text-terra font-bold"
                  } p-2 bg-terra-white rounded-lg text-sm text-center cursor-pointer hover:bg-terra-accent-bg hover:text-terra`}
                  onClick={() => setHumidityParam("specificHumidity")}
                >
                  Specific Humidity
                </span>
                <span
                  className={`${
                    humidityParam === "relativeHumidity" &&
                    "bg-terra-accent-bg text-terra font-bold"
                  } p-2 bg-terra-white rounded-lg text-sm text-center cursor-pointer hover:bg-terra-accent-bg hover:text-terra`}
                  onClick={() => setHumidityParam("relativeHumidity")}
                >
                  Relative Humidity
                </span>
                <span
                  className={`${
                    humidityParam === "averagePrecipitation" &&
                    "bg-terra-accent-bg text-terra font-bold"
                  } p-2 bg-terra-white rounded-lg text-sm text-center cursor-pointer hover:bg-terra-accent-bg hover:text-terra`}
                  onClick={() => setHumidityParam("averagePrecipitation")}
                >
                  Average Precipitation
                </span>
                <span
                  className={`${
                    humidityParam === "sumAveragePrecipitation" &&
                    "bg-terra-accent-bg text-terra font-bold"
                  } p-2 bg-terra-white rounded-lg text-sm text-center cursor-pointer hover:bg-terra-accent-bg hover:text-terra`}
                  onClick={() => setHumidityParam("sumAveragePrecipitation")}
                >
                  Sum Average Precipitation
                </span>
              </div>
            </div>
            <div className="h-[70%] mt-10">
              <HumidityGraph
                param={humidityParam}
                lat={mapLocation.lat}
                lng={mapLocation.lng}
              />
            </div>
          </section>
          <section className="h-[95vh] bg-terra p-4 rounded-lg shadow-lg">
            <div className="h-[25%]">
              <h1 className="text-terra-white text-2xl">
                Surface & Root Soil Wetness
              </h1>
              <p className="text-terra-white mb-2">
                Soil Wetness helps in plant growth and water absorption and
                could be a indication of constant rainfall
              </p>
              <div className="flex items-center space-x-2">
                <span
                  className={`${
                    wetnessParam === "topSoil" &&
                    "bg-accent-terra-bg text-terra font-bold"
                  } p-2 bg-terra-white rounded-lg text-sm cursor-pointer hover:bg-terra-accent-bg hover:text-terra`}
                  onClick={() => setWetnessParam("topSoil")}
                >
                  Top Soil
                </span>
                <span
                  className={`${
                    wetnessParam === "rootSoil" &&
                    "bg-accent-terra-bg text-terra font-bold"
                  } p-2 bg-terra-white rounded-lg text-sm cursor-pointer hover:bg-terra-accent-bg hover:text-terra`}
                  onClick={() => setWetnessParam("rootSoil")}
                >
                  Root Soil
                </span>
              </div>
            </div>
            <div className="h-[70%] mt-5">
              <SoilWetnessGraph
                param={wetnessParam}
                lat={mapLocation.lat}
                lng={mapLocation.lng}
              />
            </div>
          </section>
        </div>
      </>
    </AppLayout>
  );
}
