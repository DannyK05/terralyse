import React, { useState } from "react";
import type {
  THumidityParams,
  TSoilFactor,
  TSoilWetnessParams,
} from "../types";
import { humidityParams, soilWetnessParams } from "../data";
import { convertHypenStringToRegular } from "@/utilities/helper";

type FactorsContainerProps = TSoilFactor & {
  location?: string;
  lat: number;
  lng: number;
};

export default function FactorsContainer({
  lat,
  lng,
  location,
  name,
  description,
  Graph,
}: FactorsContainerProps) {
  const [wetnessParam, setWetnessParam] =
    useState<TSoilWetnessParams>("top-soil");

  const [humidityParam, setHumidityParam] =
    useState<THumidityParams>("specific-humidity");

  return (
    <section className="h-[95vh] w-full lg:w-full md:w-full bg-terra p-4 rounded-lg shadow-lg">
      <div className="w-full h-[25%]">
        <h1 className="text-terra-black text-center font-blade text-xl md:text-2xl lg:text-2xl">
          {name}
          <span className="text-sm">{location && ` at (${location})`}</span>
        </h1>

        <p className="text-terra-black mb-2">{description}</p>
      </div>

      {name === "Humidity and Precipitation" && (
        <div className="flex flex-wrap items-center space-y-1 space-x-2">
          {humidityParams.map((param, id) => (
            <span
              key={id}
              className={`${
                humidityParam === param &&
                "bg-terra-accent-bg text-terra font-bold"
              } w-[45%] lg:w-[23%] p-2 bg-terra-white capitalize rounded-lg text-sm text-center cursor-pointer active:bg-terra-accent-bg text-terra active:text-terra lg:hover:bg-terra-accent-bg lg:hover:text-terra`}
              onClick={() => setHumidityParam(param)}
            >
              {convertHypenStringToRegular(param)}
            </span>
          ))}
        </div>
      )}

      {name === "Soil Wetness" && (
        <div className="flex flex-wrap items-center space-y-1 space-x-2">
          {soilWetnessParams.map((param, id) => (
            <span
              key={id}
              className={`${
                wetnessParam === param &&
                "bg-terra-accent-bg text-terra font-bold"
              } w-[45%] lg:w-[23%] p-2 bg-terra-white capitalize rounded-lg text-sm text-center cursor-pointer active:bg-terra-accent-bg text-terra active:text-terra lg:hover:bg-terra-accent-bg lg:hover:text-terra`}
              onClick={() => setWetnessParam(param)}
            >
              {convertHypenStringToRegular(param)}
            </span>
          ))}
        </div>
      )}

      <div className="h-3/4 mt-3">
        <Graph
          param={
            name === "Soil Wetness"
              ? wetnessParam
              : name === "Humidity and Precipitation"
              ? humidityParam
              : undefined
          }
          lat={lat}
          lng={lng}
        />
      </div>
    </section>
  );
}
