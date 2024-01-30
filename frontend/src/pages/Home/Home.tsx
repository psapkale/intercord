import { useEffect } from "react";
import FirstSection from "../FirstSection";
import gsap from "gsap";

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
    <div className="w-full relative">
      <div className="fixed w-[7rem] text-center h-[4rem] top-6 left-8 pt-4 overflow-hidden">
        <h1 className="underline font-zyada font-bold text-5xl mcq">MCQ.</h1>
      </div>
      <FirstSection />
    </div>
  );
};

export default Home;
