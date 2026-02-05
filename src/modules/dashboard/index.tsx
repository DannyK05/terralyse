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
    "Galambi, Bauchi, Bauchi State, Nigeria",
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
        options,
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
        <div className="bg-terra w-full flex items-center space-between mb-4 text-center shadow-lg p-4 lg:block lg:w-auto">
          <span className="w-1/5 mr-4 fill-white lg:hidden">
            <LogoIcon />
          </span>
          <h1 className="text-xl text-terra-white md:text-2xl lg:text-3xl">
            Northen - Nigeria Analysis Dashboard
          </h1>
        </div>

        <div className="w-full flex flex-col items-center space-y-4 ">
          <section className="bg-terra-white w-full flex flex-col items-start space-y-2 border border-terra p-4 rounded-lg lg:w-full md:w-full lg:col-span-2">
            <h1 className="text-terra-black text-center text-xl md:text-2xl lg:text-2xl">
              Map Selection
            </h1>
            <p className="text-gray-500 text-lg">
              Click any of the markers to get the analysis of the selected area
            </p>

            <div className="bg-terra-white w-full h-1/4 p-3 border rounded-md">
              <MapContainer
                className="h-[300px] w-full z-0"
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

          <div className="w-full grid grid-cols-1 gap-y-2 lg:grid-cols-2 lg:gap-2">
            {soilFactors.map((soilFactor, id) => (
              <FactorContainer
                key={id}
                location={locationAddress}
                lat={mapLocation.lat}
                lng={mapLocation.lng}
                {...soilFactor}
              />
            ))}
          </div>
        </div>
      </>
    </AppLayout>
  );
}
