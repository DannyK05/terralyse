"use client";
import { useRouter } from "next/navigation";
import DashboardIcon from "@/app/assets/svgs/DashboardIcon";
import LogoIcon from "@/app/assets/svgs/LogoIcon";
import MapIcon from "@/app/assets/svgs/MapIcon";

const navLinks = [
  { name: "dashboard", link: "/dashboard", icon: <DashboardIcon /> },
  { name: "map", link: "/map", icon: <MapIcon /> },
];

export default function AppLayout({
  children,
  activePage,
}: Readonly<{ children: React.ReactNode; activePage: "dashboard" | "map" }>) {
  const router = useRouter();
  return (
    <div className="h-screen flex items-center space-x-4">
      <nav className="h-[12vh] w-screen z-10 flex items-center bg-terra lg:w-1/5 lg:h-full lg:top-0 lg:flex-col">
        <span
          onClick={() => router.push("/")}
          className="hidden w-1/2 fill-terra-accent-bg mb-[80px] py-5 cursor-pointer lg:block lg:hover:fill-terra-white"
        >
          <LogoIcon />
        </span>

        <ul className="w-full flex py-0 lg:py-auto lg:pr-0 items-center justify-between lg:flex-col lg:justify-normal lg:space-y-5">
          {navLinks.map(({ name, link, icon }, id) => (
            <li
              key={id}
              onClick={() => router.push(link)}
              className={`${
                activePage === name && "bg-terra-accent-bg text-terra"
              } w-full h-full flex flex-col items-center justify-center space-y-4 px-2 text-xl fill-terra-accent-bg cursor-pointer lg:h-auto lg:p-4 lg:pr-0 lg:hover:fill-terra lg:hover:bg-terra-accent-bg lg:hover:text-terra active:bg-terra-accent-bg active:fill-terra active:text-terra`}
            >
              <p className="hidden capitalize font-semibold lg:block">{name}</p>
              <span
                className={`${
                  activePage === name && "fill-terra"
                } w-[40px] lg:w-[80px] `}
              >
                {icon}
              </span>
            </li>
          ))}
        </ul>

        <p className="hidden absolute bottom-0 text-terra-white mr-4 lg:block">
          Designed and built with 💖 by{" "}
          <a
            className="my_github_link"
            rel="noopener"
            target="_blank"
            href="https://github.com/DannyK05"
          >
            Kxlade
          </a>
        </p>
      </nav>

      <main className="w-full overflow-y-scroll h-screen p-2">{children}</main>
    </div>
  );
}
