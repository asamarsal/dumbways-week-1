"use client";

import Link from 'next/link'
import { Input } from "@/components/ui/input"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Background
import Aurora from '@/components/reactbits/backgroundaurora';

export default function Login() {
  return (
    <div className="font-sans items-center justify-items-center gap-2">
      <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.8}
          amplitude={2.0}
          speed={0.5}
        />
      <main className="w-full max-w-md px-4">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Create your account</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-4">
              <Input type="text" placeholder="Username*" />
              <Input type="text" placeholder="Fullname*" />
              <Input type="text" placeholder="Email*" />
              <Input type="password" placeholder="Password*" />

              <button
                className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-base h-12 px-5"
                onClick={() => console.log("Register button clicked")}
              >
                Login
              </button>

              <p className="text-sm text-center">
                Already have account?{" "}
                <Link
                  href="/login"
                  className="text-purple-500 hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}