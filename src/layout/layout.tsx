"use client";

import { useRouter } from "next/navigation";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  return (
    <div className="flex h-full items-center">
      <nav className="bg-terra-accent flex fixed flex-col items-center justify-between h-full p-4">
        <h1 onClick={() => router.push("/")} className="text-3xl text-white">
          Terralyse
        </h1>
        <ul className="flex flex-col items-center space-y-10">
          <li
            onClick={() => router.push("/dashboard")}
            className="p-4 cursor-pointer rounded-lg hover:bg-terra-accent text-2xl text-terra-white"
          >
            Dashboard
          </li>
          <li
            onClick={() => router.push("/map")}
            className="p-4 cursor-pointer hover:bg-terra-accent text-terra-white text-2xl"
          >
            Map
          </li>
        </ul>
      </nav>
      <main className="w-full">{children}</main>
    </div>
  );
}
