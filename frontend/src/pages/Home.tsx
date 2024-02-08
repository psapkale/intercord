import { useEffect } from "react";
// import FirstSection from "./FirstSection";
import gsap from "gsap";
import FirstSectionHome from "@/components/FirstSectionHome";
import SecondSectionMarquee from "@/components/SecondSectionMarquee";

const Home = () => {
  useEffect(() => {
    gsap.fromTo(
      ".mcq",
      {
        y: 100,
        duration: 2000,
        delay: 0.5,
      },
      {
        y: 0,
      }
    );
  }, []);
  return (
    <div className="h-full overflow-x-hidden relative">
      <div className="fixed w-[7rem] text-center h-[4rem] sm:top-6 sm:left-8 pt-4 overflow-hidden">
        <h1 className="underline font-zyada font-bold text-5xl mcq">MCQ.</h1>
      </div>
      <FirstSectionHome />
      <SecondSectionMarquee />
    </div>
  );
};

export default Home;
