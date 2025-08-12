"use client";

import Link from 'next/link'

import { Input } from "@/components/ui/input"
import SplitText from "@/components/reactbits/splittext";
import TextType from "@/components/reactbits/typetext"

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

// Background
import Aurora from '@/components/reactbits/backgroundaurora';

export default function Home() {
  return (
    <div className="font-sans items-center min-h-screen">
      <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.8}
          amplitude={2.0}
          speed={0.5}
        />

        <div className="flex items-center flex-col">
          <SplitText
            text="FitCuy"
            className="text-3xl font-semibold text-center"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
          />

          <TextType 
            text={["Text typing effect", "for your websites", "Happy coding!"]}
            textColors={["#000000"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
          />

        </div>

    </div>
  );
}
