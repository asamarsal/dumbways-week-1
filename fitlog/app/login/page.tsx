"use client";

import { useState } from "react"
import Link from 'next/link'
import { Input } from "@/components/ui/input"

// import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


// Background
import Aurora from '@/components/reactbits/backgroundaurora';

export default function Login() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
        console.log("API URL:", process.env.NEXT_PUBLIC_BACKEND_API);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login gagal");
        setLoading(false);
        return;
      }
      // Simpan info
      localStorage.setItem("user_id", data.data.user_id);
      localStorage.setItem("username", data.data.username);
      localStorage.setItem("name", data.data.name);
      localStorage.setItem("email", data.data.email);
      localStorage.setItem("token", data.data.token);
      // Redirect ke dashboard atau halaman lain
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError("Terjadi kesalahan jaringan");
    } finally {
      setLoading(false);
    }
  };

    return (
        <div className="font-sans items-center justify-items-center gap-2">
            <Aurora
                colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
                blend={0.8}
                amplitude={2.0}
                speed={0.5}
                />
            <main className="w-full max-w-md px-4">
                <img
                            src="/fitcuylong.png"
                            alt="FitCuy Logo"
                            width={120}
                            height={120}
                            className="mb-2 mx-auto"
                            />
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>Input your credentials</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="flex flex-col gap-4">
                        <Input
                            type="text"
                            placeholder="Username / Email*"
                            value={identifier}
                            onChange={e => setIdentifier(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="Password*"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        {error && <div className="text-red-500 text-sm">{error}</div>}

                        <button
                            className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-base h-12 px-5"
                            onClick={handleLogin}
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Login"}
                        </button>
                        <p className="text-sm text-center">
                            Dont have account?{" "}
                            <Link
                            href="/register"
                            className="text-purple-500 hover:underline"
                            >
                            Register
                            </Link>
                        </p>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}