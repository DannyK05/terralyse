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
    <div>
      <h1>Dashboard</h1>
      <div>
        <section>
          <WindSpeedGraph />
        </section>
        <section>
          <SoilTempGraph />
        </section>
        <section>
          <HumidityGraph />
        </section>
        <section>
          <SoilWetnessGraph />
        </section>
        <section></section>
      </div>
    </div>
  );
}
