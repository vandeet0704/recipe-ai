"use client";
import { TypewriterEffect } from "../components/aceternity/typewriter";

export function TypewriterEffectDemo() {
  const words = [
    {
      text: "Recipe",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "AI:",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "Instant",
    },
    {
        text: "Recipes",
    },
    {
        text: "from",
    },
    {
        text: "Your",
    },
    {
        text: "Photos.",
    }
  ];
  return (
    <div className="flex flex-col items-center mb-20">
        <p className="text-neutral-600 dark:text-neutral-200 text-base  mb-6">
            Snap a pic, let AI identify, get cooking with personalized recipes!
        </p>
        <TypewriterEffect words={words} />
      {/* <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
        <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Join now
        </button>
        <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
          Signup
        </button>
      </div> */}
    </div>
  );
}
