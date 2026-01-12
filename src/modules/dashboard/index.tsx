"use client";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import AppLayout from "@/layout/layout";
import { coordinate } from "../../utilities/data/coordinate";
import LogoIcon from "@/app/assets/svgs/LogoIcon";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import FactorContainer from "./components/FactorContainer";
// Fix marker icons for Next.js
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { soilFactors } from "./data";

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => string })
  ._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

export default function Dashboard() {
  const [mapLocation, setMapLocation] = useState<{ lat: number; lng: number }>({
    lat: 10.25,
    lng: 10.25,
  });
  const [locationAddress, setLocationAddress] = useState(
    "Galambi, Bauchi, Bauchi State, Nigeria"
  );
  const apiKey = process.env.NEXT_PUBLIC_LOCATION_IQ_KEY;

  const generateAddress = async (lat: number, lon: number) => {
    const options = {
      method: "POST",
      headers: { accept: "application/json" },
    };

    try {
      const response = await fetch(
        `https://us1.locationiq.com/v1/reverse?key=${apiKey}&lat=${lat}&lon=${lon}&format=json&`,
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
          <h1 className="text-xl text-terra-black md:text-2xl lg:text-3xl">
            Northen - Nigeria Analysis Dashboard
          </h1>
        </div>

        <div className="w-full flex flex-col items-center space-y-2 ">
          <section className="bg-terra flex flex-col items-center space-y-2 w-full lg:w-full md:w-full p-4 rounded-lg lg:col-span-2">
            <h1 className="text-terra-black text-center font-blade text-xl md:text-2xl lg:text-2xl">
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
                        generateAddress(lat, lng);
                      },
                    }}
                    position={[lat, lng]}
                  >
                    <Popup>{locationAddress}</Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </section>

          <>
            {soilFactors.map((soilFactor, id) => (
              <FactorContainer
                key={id}
                location={locationAddress}
                lat={mapLocation.lat}
                lng={mapLocation.lng}
                {...soilFactor}
              />
            ))}
          </>
        </div>
      </>
    </AppLayout>
  );
}
