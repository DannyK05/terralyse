import AppLayout from "@/layout/layout";
import HumidityGraph from "./components/HumidityGraph";
import SoilTempGraph from "./components/SoilTempGraph";
import SoilWetnessGraph from "./components/SoilWetnessGraph";
import WindSpeedGraph from "./components/WindSpeedGraph";
export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export default function Dashboard() {
  return (
    <AppLayout>
      <>
        <h1>Dashboard</h1>
        <div className="grid lg:grid-cols-2 gap-2">
          <section className="bg-terra-bg p-4 rounded-lg">
            <h1 className="text-terra-white">Wind Speed</h1>
            <p>
              Wind speed plays a vtal role in pollination and soil erosion and
              irrigation efficiency
            </p>
            <WindSpeedGraph />
          </section>
          <section className=" bg-terra-bg p-4 rounded-lg">
            <h1 className="text-terra-white">Soil Skin Temperature</h1>
            <p>
              {" "}
              It plays a role in seed germination, heat stress in crops and soil
              microbial activity
            </p>
            <SoilTempGraph />
          </section>
          <section className="bg-terra-bg p-4 rounded-lg">
            <h1 className="text-terra-white">Humidity and Precipation</h1>
            <p>
              Humidity and Precipation plays a vital role in prediciting
              rainfall, plant growth and soil moisture retention
            </p>
            <HumidityGraph />
          </section>
          <section className="bg-terra-bg p-4 rounded-lg">
            <h1 className="text-terra-white">Surface & Root Soil Wetness</h1>
            <p>Soil Wetness helps us plant growth and water absorption,</p>
            <SoilWetnessGraph />
          </section>
          <section className=" h-[40vh] bg-terra-bg p-4 rounded-lg">
            <h1 className="text-terra-white">Wind Speed</h1>
          </section>
        </div>
      </>
    </AppLayout>
  );
}
