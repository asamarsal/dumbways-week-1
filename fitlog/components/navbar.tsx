"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="px-4">
        <div className="flex justify-between items-center h-14">
          {/* Menu kiri */}
          <div className="flex items-center gap-6">
            <Link href="/" className="text-lg font-bold text-purple-600">
              Fitcuy
            </Link>
            <Link href="/dashboard" className="hover:text-purple-600 transition">
              Dashboard
            </Link>
            <Link href="/workout" className="hover:text-purple-600 transition">
              Workout
            </Link>
            <Link href="/saranworkout" className="hover:text-purple-600 transition">
              Saran Workout
            </Link>
          </div>
          {/* Logout di kanan */}
          <div>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}