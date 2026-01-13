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
    <section className="w-full flex items-start space-y-2 flex-col h-[62vh] lg:w-full md:w-full p-4 rounded-lg bg-terra-white border border-terra  shadow-lg">
      <div className="flex flex-col items-start space-y-1">
        <h1 className="text-terra-black text-center text-xl md:text-2xl lg:text-2xl">
          {name}
        </h1>
        <span className="text-sm text-terra font-semibold">
          {location && `Location: (${location})`}
        </span>
        <p className="text-terra-black mb-2">{description}</p>
      </div>

      {name === "Humidity and Precipitation" && (
        <div className="flex w-full items-center mb-2 space-x-4">
          {humidityParams.map((param, id) => (
            <span
              key={id}
              className={`${
                humidityParam === param &&
                "bg-terra-accent-bg text-terra font-bold"
              } p-2 bg-terra-white capitalize rounded-lg text-sm text-center border border-terra cursor-pointer active:bg-terra-accent-bg text-terra active:text-terra lg:hover:bg-terra-accent-bg lg:hover:text-terra`}
              onClick={() => setHumidityParam(param)}
            >
              {convertHypenStringToRegular(param)}
            </span>
          ))}
        </div>
      )}

      {name === "Soil Wetness" && (
        <div className="flex w-full items-center space-y-1 space-x-2 mb-2">
          {soilWetnessParams.map((param, id) => (
            <span
              key={id}
              className={`${
                wetnessParam === param &&
                "bg-terra-accent-bg text-terra font-bold"
              } p-2 bg-terra-white capitalize rounded-lg text-sm text-center border border-terra cursor-pointer active:bg-terra-accent-bg text-terra active:text-terra lg:hover:bg-terra-accent-bg lg:hover:text-terra`}
              onClick={() => setWetnessParam(param)}
            >
              {convertHypenStringToRegular(param)}
            </span>
          ))}
        </div>
      )}

      <div className="border w-full rounded-md bg-terra-white h-full">
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
