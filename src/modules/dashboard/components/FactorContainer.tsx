import React, { useState } from "react";

import { convertHypenStringToRegular } from "@/utilities/helper";
import ParamTag from "@/components/ParamTag";

import { humidityParams, soilWetnessParams } from "../data";
import type {
  THumidityParams,
  TSoilFactor,
  TSoilWetnessParams,
} from "../types";

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
    <section className="h-[100vh] w-full flex items-start space-y-2 flex-col p-4 rounded-lg bg-terra-white border border-terra shadow-lg md:w-full lg:w-full lg:h-[80vh]">
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
        <div className="w-full flex items-center flex-wrap mb-2 space-y-2 space-x-4 lg:space-y-0 lg:flex-nowrap">
          {humidityParams.map((param, id) => (
            <ParamTag
              key={id}
              onClick={() => setHumidityParam(param)}
              condition={humidityParam === param}
            >
              {convertHypenStringToRegular(param)}
            </ParamTag>
          ))}
        </div>
      )}

      {name === "Soil Wetness" && (
        <div className="w-full flex items-center space-x-2 mb-2">
          {soilWetnessParams.map((param, id) => (
            <ParamTag
              key={id}
              onClick={() => setWetnessParam(param)}
              condition={wetnessParam === param}
            >
              {convertHypenStringToRegular(param)}
            </ParamTag>
          ))}
        </div>
      )}

      <div className="bg-terra-white h-full w-full rounded-md">
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
