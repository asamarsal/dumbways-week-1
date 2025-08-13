"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Navbar from "@/components/navbar";

export default function Dashboard() {
  return (
    <div className="font-sans min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Konten */}
      <main className="pt-20 w-full max-w-md mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Hello</CardTitle>
            <CardDescription>Anda sudah login</CardDescription>
          </CardHeader>
        </Card>
      </main>
    </div>
  );
}
