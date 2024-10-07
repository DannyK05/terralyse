"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className=" flex h-full items-center justify-center p-4">
      <main className="flex flex-col items-center space-y-2 w-full mt-10 h-full">
        <div className="flex h-full flex-col items-center space-y-2">
          <h1 className="text-3xl text-terra">Terralyse</h1>
          <p className="text-terra-white">Predicting possibilities</p>
        </div>
        <div className="flex items-center w-2/3 space-x-2 ">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className=" border w-[45%] rounded-lg p-2 text-terra-white bg-terra-accent"
          >
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => router.push("/map")}
            className="border w-[45%] rounded-lg p-2 text-terra-white bg-terra-accent"
          >
            Map
          </button>
        </div>
      </main>
    </div>
  );
}
