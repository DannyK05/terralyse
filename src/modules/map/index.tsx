"use client";
import "leaflet/dist/leaflet.css";
import AppLayout from "@/layout/layout";
import LogoIcon from "@/app/assets/svgs/LogoIcon";
// import { getPrediction, prediction } from "@/utilities/hooks/Prediction";
// import Flood from "../../app/assets/svgs/flood.svg";
// import Drought from "../../app/assets/svgs/drought.svg";
// import Plant from "../../app/assets/svgs/plant.svg";
import { MapContainer, TileLayer } from "react-leaflet";
export default function Map() {
  const center = {
    lat: 10.25,
    lng: 10.25,
  };

  const getResult = () => {
    // getPrediction();
    // console.log(prediction);
  };
  return (
    <AppLayout activePage="map">
      <section className="h-full flex flex-col items-center justify-center">
        <h1 className="text-terra">This page has been discontinued.</h1>
        <p className="text-black text-sm">Something new is coming</p>
      </section>

      {/* <section className="flex flex-col items-center space-y-5 mb-[80px] ">
        <div className="w-full flex items-center justify-between lg:block bg-terra text-center p-4 mb-4 shadow-lg">
          <span className="fill-white lg:hidden w-1/5">
            <LogoIcon />
          </span>
          <h1 className="text-terra-white  text-3xl">Prediction Map</h1>
        </div>
        <button
          className="p-2 w-[80%] rounded-lg bg-terra text-white active:bg-terra-accent-bg active:text-terra lg:hover:text-terra lg:hover:bg-terra-accent-bg"
          type="button"
          onClick={getResult}
        >
          Get Prediction
        </button>
        <MapContainer
          className="h-[600px] w-full"
          center={[center.lat, center.lng]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {prediction.length !== 0 &&
              prediction.map(
                (coord) =>
                  coord.drought > 50 && (
                    <Marker
                      key={`${coord.lat}-${coord.lng}`}
                      position={{
                        lat: coord.lat - 0.02,
                        lng: coord.lng - 0.02,
                      }}
                      icon={{
                        url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                      }}
                    />
                  ) coord.flood > 50 && (
                    <Marker
                      key={`${coord.lat}-${coord.lng}`}
                      position={{ lat: coord.lat + 0.02, lng: coord.lng + 0.02 }}
                      icon={{
                        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                      }}
                    />
                  )  coord.farming > 50 && (
                    <Marker
                      key={`${coord.lat}-${coord.lng}`}
                      position={{ lat: coord.lat, lng: coord.lng }}
                      icon={{
                        url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                      }}
                    />
                  
              )}
        </MapContainer>
      </section> */}
    </AppLayout>
  );
}
