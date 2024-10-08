"use client";

import { useRouter } from "next/navigation";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  return (
    <div className="flex h-full items-start">
      <nav className="bg-terra-accent w-1/5 flex fixed lg:flex-col items-center h-[100vh] p-4">
        <h1 onClick={() => router.push("/")} className="text-6xl text-white">
          Terralyse
        </h1>
        <ul className="flex flex-col items-center space-y-10">
          <li
            onClick={() => router.push("/dashboard")}
            className="p-4 cursor-pointer rounded-lg hover:bg-terra-accent text-xl text-terra-white"
          >
            Dashboard
          </li>
          <li
            onClick={() => router.push("/map")}
            className="p-4 cursor-pointer hover:bg-terra-accent text-terra-white text-xl"
          >
            Map
          </li>
        </ul>
      </nav>
      <main className="w-3/4 lg:ml-[21rem] py-2">{children}</main>
    </div>
  );
}
