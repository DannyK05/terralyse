"use client";
import DashboardIcon from "@/app/assets/svgs/DashboardIcon";
import MapIcon from "@/app/assets/svgs/MapIcon";
import { useRouter } from "next/navigation";

export default function AppLayout({
  children,
  activePage,
}: Readonly<{ children: React.ReactNode; activePage: "dashboard" | "map" }>) {
  const router = useRouter();
  return (
    <div className="flex h-full items-start">
      <nav className="bg-terra-accent w-1/5 flex fixed lg:flex-col items-center h-[100vh] py-4 pl-4">
        <h1
          onClick={() => router.push("/")}
          className="text-6xl text-white cursor-pointer mb-6 mr-4 hover:text-terra-accent-bg"
        >
          Terralyse
        </h1>
        <ul className="flex flex-col w-full pr-0 items-center justify-between h-[60%]">
          <li
            onClick={() => router.push("/dashboard")}
            className={`${
              activePage === "dashboard" && "bg-terra-accent-bg text-terra"
            } flex flex-col items-center space-y-4 p-4 pr-0 hover:fill-terra fill-terra-accent-bg  w-full cursor-pointer rounded-lg hover:bg-terra-accent-bg hover:text-terra text-xl text-terra-white`}
          >
            <p>Dashboard</p>
            <span
              className={`${
                activePage === "dashboard" && "fill-terra"
              } w-[80px] `}
            >
              <DashboardIcon />
            </span>
          </li>
          <li
            onClick={() => router.push("/map")}
            className={`${
              activePage === "map" && "bg-terra-accent-bg text-terra"
            } flex flex-col items-center rounded-lg fill-terra-accent-bg space-y-4 p-4 pr-0 hover:fill-terra w-full cursor-pointer hover:bg-terra-accent-bg hover:text-terra text-terra-white text-xl`}
          >
            <p>Map</p>
            <span
              className={`${activePage === "map" && "fill-terra"} w-[80px] `}
            >
              <MapIcon />
            </span>
          </li>
        </ul>
        <p className="absolute bottom-[0px] text-terra-white mr-4">
          Designed and built with 💖 by{" "}
          <a
            className="my_github_link"
            rel="noopener"
            target="_blank"
            href="https://github.com/DannyK05"
          >
            Kolade
          </a>
        </p>
      </nav>
      <main className="w-3/4 lg:ml-[21rem] py-2">{children}</main>
    </div>
  );
}
