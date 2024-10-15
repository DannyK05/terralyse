"use client";
import DashboardIcon from "@/app/assets/svgs/DashboardIcon";
import LogoIcon from "@/app/assets/svgs/LogoIcon";
import MapIcon from "@/app/assets/svgs/MapIcon";
import { useRouter } from "next/navigation";

export default function AppLayout({
  children,
  activePage,
}: Readonly<{ children: React.ReactNode; activePage: "dashboard" | "map" }>) {
  const router = useRouter();
  return (
    <div className="flex h-full items-start">
      <nav className="z-10 bottom-0 left-0 h-[12vh] lg:top-0 w-[100vw] bg-terra-accent lg:w-1/5 flex fixed lg:flex-col items-center lg:h-[100vh] px-0 py-0 lg:pr-0 lg:p-4">
        <span
          onClick={() => router.push("/")}
          className="hidden lg:block w-1/2 fill-terra cursor-pointer mb-6 lg:hover:fill-terra-accent-bg"
        >
          <LogoIcon />
        </span>
        <ul className="flex flex-row lg:flex-col w-full h-full py-0 lg:py-auto lg:pr-0 items-center justify-between lg:justify-normal lg:space-y-5 h-[60%]">
          <li
            onClick={() => router.push("/dashboard")}
            className={`${
              activePage === "dashboard" && "bg-terra-accent-bg text-terra"
            } flex flex-col-reverse lg:flex-col h-full lg:h-auto items-center lg:rounded-r-none justify-center space-y-4 p-2 py-0 lg:p-4 lg:pr-0 active:bg-terra-accent-bg active:fill-terra active:text-terra lg:hover:fill-terra fill-terra-accent-bg   w-full cursor-pointer lg:rounded-lg lg:hover:bg-terra-accent-bg lg:hover:text-terra text-xl text-terra-white`}
          >
            <p className="hidden lg:block">Dashboard</p>
            <span
              className={`${
                activePage === "dashboard" && "fill-terra"
              } w-[40px] lg:w-[80px] `}
            >
              <DashboardIcon />
            </span>
          </li>
          <li
            onClick={() => router.push("/map")}
            className={`${
              activePage === "map" && "bg-terra-accent-bg text-terra"
            } flex lg:flex-col h-full lg:h-auto items-center justify-center lg:rounded-lg lg:rounded-r-none fill-terra-accent-bg active:bg-terra-accent-bg active:fill-terra active:text-terra space-y-4 p-2 py-0 lg:p-4 lg:pr-0 lg:hover:fill-terra w-full cursor-pointer lg:hover:bg-terra-accent-bg lg:hover:text-terra text-terra-white text-xl`}
          >
            <p className="hidden lg:block">Map</p>
            <span
              className={`${
                activePage === "map" && "fill-terra"
              } w-[40px] lg:w-[80px] py-0 `}
            >
              <MapIcon />
            </span>
          </li>
        </ul>
        <p className="hidden lg:block absolute bottom-[0px] text-terra-white mr-4">
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
      <main className="w-full  lg:w-3/4 lg:ml-[21rem] p-2">{children}</main>
    </div>
  );
}
