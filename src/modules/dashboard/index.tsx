"use client";
import { useState } from "react";
import "leaflet/dist/leaflet.css";

import AppLayout from "@/layout/layout";
import HumidityGraph from "./components/HumidityGraph";
import SoilTempGraph from "./components/SoilTempGraph";
import SoilWetnessGraph from "./components/SoilWetnessGraph";
import WindSpeedGraph from "./components/WindSpeedGraph";
import { coordinate } from "../../utilities/data/coordinate";
import LogoIcon from "@/app/assets/svgs/LogoIcon";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function Dashboard() {
  const [mapLocation, setMapLocation] = useState<{ lat: number; lng: number }>({
    lat: 10.25,
    lng: 10.25,
  });
  const [locationAddress, setLocationAddress] = useState(
    "Galambi, Bauchi, Bauchi State, Nigeria"
  );
  const apiKey = process.env.NEXT_PUBLIC_LOCATION_IQ_KEY;

  const [wetnessParam, setWetnessParam] = useState<"topSoil" | "rootSoil">(
    "topSoil"
  );

  const [humidityParam, setHumidityParam] = useState<
    | "specificHumidity"
    | "relativeHumidity"
    | "averagePrecipitation"
    | "sumAveragePrecipitation"
  >("specificHumidity");

  const generateAddress = async () => {
    const options = {
      method: "POST",
      headers: { accept: "application/json" },
    };

    try {
      const response = await fetch(
        `https://us1.locationiq.com/v1/reverse?key=${apiKey}&lat=${mapLocation.lat}&lon=${mapLocation.lng}&format=json&`,
        options
      );

      const data = await response.json();

      setLocationAddress(data.display_name);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AppLayout activePage="dashboard">
      <>
        <div className=" bg-terra w-full flex items-center space-between lg:block lg:w-auto text-center p-4 mb-4 shadow-lg">
          <span className="fill-white mr-4 lg:hidden w-1/5">
            <LogoIcon />
          </span>
          <h1 className="text-xl text-terra-white md:text-2xl lg:text-3xl">
            Northen - Nigeria Analysis Dashboard
          </h1>
        </div>

        <div className="w-full flex flex-col items-center space-y-2 ">
          <section className="bg-terra flex flex-col items-center space-y-2 w-full lg:w-full md:w-full p-4 rounded-lg lg:col-span-2">
            <h1 className="text-terra-white font-blade text-xl md:text-2xl lg:text-2xl">
              Map Selection
            </h1>
            <div className="w-full h-1/4">
              <MapContainer
                className="h-[300px] w-full"
                center={[mapLocation.lat, mapLocation.lng]}
                zoom={13}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {coordinate.map(({ lat, lng }, key) => (
                  <Marker
                    key={key}
                    eventHandlers={{
                      click: () => {
                        setMapLocation({ lat: lat, lng: lng });
                        generateAddress();
                      },
                    }}
                    position={[lat, lng]}
                  >
                    <Popup>{`Latitude: ${lat} and Longitude: ${lng}`}</Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </section>

          <section className="h-[95vh] w-full lg:w-full md:w-full bg-terra p-4 rounded-lg shadow-lg">
            <div className="w-full h-[25%]">
              <h1 className="text-terra-white font-blade text-xl md:text-2xl lg:text-2xl">
                Wind Speed {locationAddress && `at ${locationAddress}`}
              </h1>

              <p className="text-terra-white h- mb-2">
                Wind speed plays a vtal role in pollination and soil erosion and
                irrigation efficiency
              </p>
            </div>

            <div className="h-[70%] mt-5">
              <WindSpeedGraph lat={mapLocation.lat} lng={mapLocation.lng} />
            </div>
          </section>

          <section className="h-[95vh] bg-terra w-full lg:w-full md:w-full p-4 rounded-lg shadow-lg">
            <div className="w-full h-[25%]">
              <h1 className="text-terra-white font-blade text-xl md:text-2xl lg:text-2xl">
                Soil Skin Temperature{" "}
                {locationAddress && `at ${locationAddress}`}
              </h1>

              <p className="text-terra-white mb-2">
                It plays a role in seed germination, heat stress in crops and
                soil microbial activity
              </p>
            </div>
            <div className="h-[70%] mt-5">
              <SoilTempGraph lat={mapLocation.lat} lng={mapLocation.lng} />
            </div>
          </section>

          <section className="h-[100vh] lg:h-[95vh] w-full lg:w-full md:w-full bg-terra p-4 rounded-lg shadow-lg">
            <div className="w-full h-[20%]">
              <h1 className="text-terra-white font-blade text-xl md:text-2xl lg:text-2xl">
                Humidity and Precipitation{" "}
                {locationAddress && `at ${locationAddress}`}
              </h1>

              <p className="text-terra-white mb-2">
                They play a vital role in prediciting rainfall, plant growth and
                soil moisture retention
              </p>

              <div className="flex flex-wrap items-center space-y-1 space-x-2">
                <span
                  className={`${
                    humidityParam === "specificHumidity" &&
                    "bg-terra-accent-bg text-terra font-bold"
                  } w-[45%] lg:w-[23%] p-2 bg-terra-white rounded-lg text-sm text-center cursor-pointer active:bg-terra-accent-bg text-terra active:text-terra lg:hover:bg-terra-accent-bg lg:hover:text-terra`}
                  onClick={() => setHumidityParam("specificHumidity")}
                >
                  Specific Humidity
                </span>

                <span
                  className={`${
                    humidityParam === "relativeHumidity" &&
                    "bg-terra-accent-bg text-terra font-bold"
                  }  w-[45%] lg:w-[23%] p-2 bg-terra-white rounded-lg text-sm text-center cursor-pointer active:bg-terra-accent-bg text-terra active:text-terra lg:hover:bg-terra-accent-bg lg:hover:text-terra`}
                  onClick={() => setHumidityParam("relativeHumidity")}
                >
                  Relative Humidity
                </span>

                <span
                  className={`${
                    humidityParam === "averagePrecipitation" &&
                    "bg-terra-accent-bg text-terra font-bold"
                  }  w-[45%] lg:w-[23%] p-2 bg-terra-white rounded-lg text-sm text-center cursor-pointer active:bg-terra-accent-bg text-terra active:text-terra lg:hover:bg-terra-accent-bg lg:hover:text-terra`}
                  onClick={() => setHumidityParam("averagePrecipitation")}
                >
                  Average Precipitation
                </span>

                <span
                  className={`${
                    humidityParam === "sumAveragePrecipitation" &&
                    "bg-terra-accent-bg text-terra font-bold"
                  }  w-[45%] lg:w-[23%] p-2 bg-terra-white rounded-lg text-sm text-center cursor-pointer active:bg-terra-accent-bg text-terra active:text-terra lg:hover:bg-terra-accent-bg lg:hover:text-terra`}
                  onClick={() => setHumidityParam("sumAveragePrecipitation")}
                >
                  Sum Average Precipitation
                </span>
              </div>
            </div>

            <div className="h-[70%] mt-[60px]">
              <HumidityGraph
                param={humidityParam}
                lat={mapLocation.lat}
                lng={mapLocation.lng}
              />
            </div>
          </section>

          <section className="h-[95vh] w-full lg:w-full mb-[80px] lg:mb-auto md:w-full bg-terra p-4 rounded-lg shadow-lg">
            <div className="h-[25%]">
              <h1 className="text-terra-white font-blade text-xl md:text-2xl lg:text-2xl">
                Soil Wetness {locationAddress && `at ${locationAddress}`}
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
                  } p-2 bg-terra-white rounded-lg text-sm cursor-pointer active:bg-terra-accent-bg text-terra active:text-terra lg:hover:bg-terra-accent-bg lg:hover:text-terra`}
                  onClick={() => setWetnessParam("topSoil")}
                >
                  Top Soil
                </span>

                <span
                  className={`${
                    wetnessParam === "rootSoil" &&
                    "bg-accent-terra-bg text-terra font-bold"
                  } p-2 bg-terra-white rounded-lg text-sm cursor-pointer active:bg-terra-accent-bg text-terra active:text-terra lg:hover:bg-terra-accent-bg lg:hover:text-terra`}
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
