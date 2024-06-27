"use client";
import Image from "next/image";
import { BackgroundBeams } from "@/components/ui/background-beams";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between pt-16 px-6 sm:p-16">
        <HeroSection/>
        {/* <Check/> */}
      </main>
      <BackgroundBeams/>
    </>
  );
}
