"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";

import SpotlightCard from '@/components/reactbits/spotlightcard';

export default function Dashboard() {
  return (
    <div className="font-sans min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

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
