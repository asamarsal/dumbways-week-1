"use client";

import Link from 'next/link'

import { Input } from "@/components/ui/input"
import SplitText from "@/components/reactbits/splittext";
import TextType from "@/components/reactbits/typetext"

// Background
import Aurora from '@/components/reactbits/backgroundaurora';

export default function Home() {
  return (
    <div className="font-sans grid items-center justify-items-center min-h-screen gap-2">
      <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.8}
          amplitude={2.0}
          speed={0.5}
        />
      <main className="flex flex-col row-start-2 items-start sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-col">

          <TextType 
            className='text-2xl'
            text={["FitCuy", "Your workout friend", "Healthy lifestyle"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            textColors={["#0B0B0B"]}
          />
          
          <p>
            Register
          </p>
          <Input />

          <p>
            Full Name
          </p>
          <Input />

          <p>
            Username
          </p>
          <Input />

          <p>
            Password
          </p>
          <Input />
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row pt-6">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/register"
          >
            Register
          </Link>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[100px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Login
          </a>
        </div>
      </main>
    </div>
  );
}
