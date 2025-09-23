import type { Metadata } from "next";
import dynamic from "next/dynamic";
export const metadata: Metadata = {
  title: "Prediction Map",
  description:
    "A map that shows areas prone to water-related disaster and areas suitable for farming",
};
const MapPage = dynamic(() => import("@/modules/map"), {
  ssr: false,
});

export default function Page() {
  return <MapPage />;
}
