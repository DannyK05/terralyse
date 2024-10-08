"use client";
import { useRouter } from "next/navigation";
import Farmers from "./assets/images/farmers.png";
import Image from "next/image";
import SunIcon from "./assets/svgs/SunIcon";
import DashboardIcon from "./assets/svgs/DashboardIcon";
import MapIcon from "./assets/svgs/MapIcon";
import Symbol from "./assets/images/african-symbol.png";
import CornIcon from "./assets/svgs/CornIcon";

export default function Home() {
  const router = useRouter();

  return (
    <div className=" flex h-full items-center justify-center p-4">
      <main className="flex flex-col items-center space-y-4 w-full mt-10 h-full">
        <div className="w-[80%] relative flex items-center justify-between">
          {" "}
          <div className="flex h-full flex-col items-center space-y-2">
            <h1 className="text-5xl text-terra">Terralyse</h1>
            <p className="text-terra-black font-bold text-xl">
              Predicting the future by predicting possibilities
            </p>
          </div>
          <Image src={Farmers} alt="Farmers" width={500} height={500} />
          <span className="absolute left-[50%]">
            <Image src={Symbol} alt="African symbol" width={80} height={80} />
          </span>
        </div>
        <div className="w-[80] relative flex items-center flex-col space-y-2">
          <h1 className="text-3xl">Features: </h1>
          <span className="absolute top-0 left-[10%]">
            <SunIcon />
          </span>
          <div className="flex items-center w-2/3 justify-between ">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className=" border w-[45%] rounded-lg p-2 text-terra-white bg-terra-accent space-y-2 flex flex-col items-center"
            >
              <h1 className="text-3xl">Dashboard</h1>
              <p>
                Get a detailed data visualisation of factors that contribute in
                determining the quality of a land and chances of drought, flood
                and other water related disaters{" "}
              </p>
              <span className="w-full px-4">
                <DashboardIcon />
              </span>
            </button>
            <button
              type="button"
              onClick={() => router.push("/map")}
              className="border w-[45%] rounded-lg p-2 text-terra-white bg-terra-accent space-y-2 flex flex-col items-center"
            >
              <h1 className="text-3xl">Google Gemini Powered Map</h1>
              <p>
                Discover automated disaster analysis from Google&apos;s Gemini
                using 20 year NASA Power data. Observe the map with indications
                from Gemini&apos;s result showing areas prone to disaster.
              </p>
              <span className="w-[95%] px-4">
                <MapIcon />
              </span>
            </button>
          </div>
          <span className="absolute bottom-10 right-[10%]">
            <CornIcon />
          </span>
        </div>
      </main>
    </div>
  );
}
