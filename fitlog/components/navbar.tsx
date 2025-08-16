"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getUserRole } from "@/lib/auth";

export default function Navbar() {

  const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Access localStorage after component mounts (client-side only)
    const name = localStorage.getItem("name");
    const role = getUserRole();

    if (name) {
      setUserName(name);
    }

    if (role) {
      setUserRole(role);
    }

  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="px-4">
        <div className="flex justify-between items-center h-14">
          {/* Menu kiri */}
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="hover:text-purple-600 transition">
              Dashboard
            </Link>
            <Link href="/workout" className="hover:text-purple-600 transition">
              Workout
            </Link>
            <Link href="/progress" className="hover:text-purple-600 transition">
              Progress
            </Link>
            {userRole === 'mentor' && (
              <Link href="/student" className="hover:text-purple-600 transition">
                Student
              </Link>
            )}
          </div>
          {/* Logout di kanan */}
          <div className="flex flex-row items-center gap-4">
            {userName && (
              <p className="text-sm text-muted-foreground">
                Hello, {userName}
              </p>
            )}
            <button
              onClick={handleLogout}
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