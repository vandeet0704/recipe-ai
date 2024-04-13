import { TypewriterEffectDemo } from "@/components/header";
import Recipe from "@/components/recipe";
import Image from "next/image";

export default function Home() {

  
  return (
    <main className="flex flex-col items-center p-24">
      <TypewriterEffectDemo />
      <Recipe />
    </main>  
  );
}
