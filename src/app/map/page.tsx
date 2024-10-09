import type { Metadata } from "next";
import Map from "@/modules/map";
export const metadata: Metadata = {
  title: "Prediction Map",
  description:
    "A map that shows areas prone to water-related disaster and areas suitable for farming",
};
export default function Page() {
  return <Map />;
}
