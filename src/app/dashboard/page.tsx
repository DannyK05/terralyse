import type { Metadata } from "next";
import dynamic from "next/dynamic";
export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "A data visualisation dashboard of factors that contribute to good farmland selection",
};
const DashboardPage = dynamic(() => import("@/modules/dashboard"), {
  ssr: false,
});
export default function Page() {
  return <DashboardPage />;
}
