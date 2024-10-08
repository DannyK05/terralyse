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
  const mapKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const center = {
    lat: mapLocation.lat,
    lng: mapLocation.lng,
  };
  const containerStyle = {
    width: "100%",
    height: "200px",
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
    <AppLayout>
      <>
        <div className=" bg-terra text-center p-4 mb-4">
          <h1 className="text-terra-white text-3xl">
            Northen Nigeria Soil Analysis Dashboard
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-x-2 gap-y-4">
          <section className=" h-[45vh] bg-terra p-4 rounded-lg lg:col-span-2">
            <h1 className="text-terra-white text-2xl">Map</h1>
            <div>
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
          <section className="h-[74vh] bg-terra p-4 rounded-lg">
            <h1 className="text-terra-white text-2xl h-[8%]">Wind Speed</h1>
            <p className="text-terra-white h-[10%] mb-2">
              Wind speed plays a vtal role in pollination and soil erosion and
              irrigation efficiency
            </p>
            <div className="h-[80%]">
              <WindSpeedGraph lat={mapLocation.lat} lng={mapLocation.lng} />
            </div>
          </section>
          <section className="h-[74vh] bg-terra p-4 rounded-lg">
            <h1 className="text-terra-white text-2xl h-[8%]">
              Soil Skin Temperature
            </h1>
            <p className="text-terra-white h-[10%] mb-2">
              {" "}
              It plays a role in seed germination, heat stress in crops and soil
              microbial activity
            </p>
            <div className="h-[80%]">
              <SoilTempGraph lat={mapLocation.lat} lng={mapLocation.lng} />
            </div>
          </section>
          <section className="h-[74vh] bg-terra p-4 rounded-lg">
            <h1 className="text-terra-white text-2xl h-[8%]">
              Humidity and Precipation
            </h1>
            <p className="text-terra-white h-[10%] mb-2">
              Humidity and Precipation plays a vital role in prediciting
              rainfall, plant growth and soil moisture retention
            </p>
            <div className="h-[80%]">
              <HumidityGraph lat={mapLocation.lat} lng={mapLocation.lng} />
            </div>
          </section>
          <section className="h-[74vh] bg-terra p-4 rounded-lg">
            <div className="h-[18%]">
              <h1 className="text-terra-white text-2xl">
                Surface & Root Soil Wetness
              </h1>
              <p className="text-terra-white mb-2">
                Soil Wetness helps us plant growth and water absorption,
              </p>
              <div className="flex items-center space-x-2 mb-8">
                <span
                  className="p-2 bg-terra-white rounded-lg"
                  onClick={() => setWetnessParam("topSoil")}
                >
                  Top Soil
                </span>
                <span
                  className="p-2 bg-terra-white rounded-lg"
                  onClick={() => setWetnessParam("rootSoil")}
                >
                  Root Soil
                </span>
              </div>
            </div>
            <div className="h-[80%]">
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
