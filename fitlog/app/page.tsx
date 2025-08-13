"use client";

// import Link from 'next/link'

// import { Input } from "@/components/ui/input"
import SplitText from "@/components/reactbits/splittext";
import TextType from "@/components/reactbits/typetext"

// import { useEffect, useRef } from 'react';

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

import Iridescence from '@/components/reactbits/bgiridescence';

export default function Home() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Iridescence
        color={[1, 1, 1]}
        mouseReact={false}
        amplitude={0.1}
        speed={1.0} >

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center flex-col z-10">
            
              <SplitText
                text="FitCuy"
                className="text-4xl font-semibold text-center text-black"
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
                text={["Your home workout friends", "Simple and clear explanation", "Healthy lifestyle"]}
                textColors={["white"]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                variableSpeed={undefined}
                onSentenceComplete={() => {}}
              />

            </div>
          </div>

        </Iridescence>
    </div>
  );
}
