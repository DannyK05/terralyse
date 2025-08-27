"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import AppLayout from "@/layout/layout";
import LogoIcon from "@/app/assets/svgs/LogoIcon";
import { getPrediction, prediction } from "@/utilities/hooks/Prediction";
import Flood from "../../app/assets/svgs/flood.svg";
import Drought from "../../app/assets/svgs/drought.svg";
import Plant from "../../app/assets/svgs/plant.svg";
export default function Map() {
  const mapKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const center = {
    lat: 10.25,
    lng: 10.25,
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
  const getResult = () => {
    getPrediction();
    console.log(prediction);
  };
  return (
    <AppLayout activePage="map">
      <section className="flex flex-col items-center space-y-2 mb-[80px] ">
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
        <LoadScript googleMapsApiKey={mapKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            {/* {prediction.length !== 0 &&
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
                  
              )} */}
          </GoogleMap>
        </LoadScript>
      </section>
    </AppLayout>
  );
}
