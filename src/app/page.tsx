"use client";
import { useRouter } from "next/navigation";
import Farmers from "./assets/images/farmers.png";
import Image from "next/image";
import SunIcon from "./assets/svgs/SunIcon";
import DashboardIcon from "./assets/svgs/DashboardIcon";
import MapIcon from "./assets/svgs/MapIcon";
import Symbol from "./assets/images/african-symbol.png";
import CornIcon from "./assets/svgs/CornIcon";
import LogoIcon from "./assets/svgs/LogoIcon";

export default function Home() {
  const router = useRouter();

  return (
    <div className=" flex h-full items-center justify-center p-4">
      <main className="flex flex-col items-center space-y-4 w-full mt-10 h-full">
        <div className=" flex-col lg:w-[80%] md:w-[80%] lg:flex-row md:flex-row relative flex items-center lg:justify-between">
          {" "}
          <div className="flex h-full flex-col items-center space-y-2">
            <span className="fill-terra w-1/4">
              <LogoIcon />
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-terra">
              Terralyse
            </h1>
            <p className="text-lg text-center text-terra-black md:font-bold lg:font-bold md:text-xl lg:text-xl">
              Predicting the future by predicting possibilities
            </p>
          </div>
          <Image src={Farmers} alt="Farmers" width={500} height={500} />
          <span className="hidden lg:block md:block absolute left-[50%]">
            <Image src={Symbol} alt="African symbol" width={80} height={80} />
          </span>
        </div>
        <div className="w-[80] relative flex items-center flex-col space-y-2">
          <h1 className="text-xl text-terra md:text-2xl lg:text-3xl">
            Features:{" "}
          </h1>
          <span className="absolute hidden lg:block top-0 left-[10%]">
            <SunIcon />
          </span>
          <div className="w-full flex space-y-3 lg:flex-row md:flex-row flex-col items-center md:w-2/3 lg:w-2/3 lg:justify-between md:justify-between ">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className=" w-full border md:w-[45%] lg:w-[45%] rounded-lg p-2 fill-terra-accent-bg hover:fill-terra text-terra-white active:fill-terra bg-terra-accent space-y-2 flex flex-col items-center"
            >
              <h1 className="text-xl md:text-2xl lg:text-3xl">Dashboard</h1>
              <p>
                Get a detailed data visualisation of factors that contribute in
                determining the quality of a land and chances of drought, flood
                and other water related disaters{" "}
              </p>
              <span className="w-[50%] lg:w-full  md:w-full px-4">
                <DashboardIcon />
              </span>
            </button>
            <button
              type="button"
              onClick={() => router.push("/map")}
              className="w-full border md:w-[45%] lg:w-[45%] rounded-lg p-2 fill-terra-accent-bg hover:fill-terra active:fill-terra text-terra-white bg-terra-accent space-y-2 flex flex-col items-center"
            >
              <h1 className="text-xl md:text-2xl lg:text-3xl">
                Google Gemini Powered Map
              </h1>
              <p>
                Discover automated disaster analysis from Google&apos;s Gemini
                using 20 year NASA Power data. Observe the map with indications
                from Gemini&apos;s result showing areas prone to disaster.
              </p>
              <span className="w-[45%] lg:w-[95%] lg:h-[90%] md:w-[95%] px-4 ">
                <MapIcon />
              </span>
            </button>
          </div>
          <span className="absolute hidden lg:block bottom-10 right-[10%]">
            <CornIcon />
          </span>
        </div>
      </main>
    </div>
  );
}
