import Dashboard from "@/modules/dashboard";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "A data visualisation dashboard of factors that contribute to good farmland selection",
};
export default function Page() {
  return <Dashboard />;
}
