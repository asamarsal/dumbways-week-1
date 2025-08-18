"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";

import SpotlightCard from '@/components/reactbits/spotlightcard';

export default function Dashboard() {
  return (
    <div className="font-sans min-h-screen">
      {/* Navbar */}
      <Navbar />

      <div
                className="absolute inset-0 -z-10"
                style={{
                    background: "#ffffff",
                    backgroundImage: `
                    radial-gradient(
                        circle at top center,
                        rgba(173, 109, 244, 0.5),
                        transparent 70%
                    )
                    `,
                    filter: "blur(80px)",
                    backgroundRepeat: "no-repeat",
                }}
                />

      {/* Konten */}
      <main className="pt-18 w-full px-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <p className="text-xl font-bold">Saran Workout</p>
            <p className="pb-2">Make your first move...</p>
          </div>
          <div className="flex flex-col">
            <img
            src="/fitcuylong.png"
            alt="FitCuy Logo"
            width={80}
            height={80}
            className="mb-2 mx-auto"
           />
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <SpotlightCard className="custom-spotlight-card bg-purple-500" spotlightColor="rgba(240, 10, 170, 0.9)">
            <p className="text-white">Test</p>
          </SpotlightCard>
          <SpotlightCard className="custom-spotlight-card bg-purple-500" spotlightColor="rgba(240, 10, 170, 0.9)">
            <p className="text-white">Test</p>
          </SpotlightCard>
          <SpotlightCard className="custom-spotlight-card bg-purple-500" spotlightColor="rgba(240, 10, 170, 0.9)">
            <p className="text-white">Test</p>
          </SpotlightCard>
          <SpotlightCard className="custom-spotlight-card bg-purple-500" spotlightColor="rgba(240, 10, 170, 0.9)">
            <p className="text-white">Test</p>
          </SpotlightCard>
          <SpotlightCard className="custom-spotlight-card bg-purple-500" spotlightColor="rgba(240, 10, 170, 0.9)">
            <p className="text-white">Test</p>
          </SpotlightCard>
        </div>
      </main>
    </div>
  );
}
