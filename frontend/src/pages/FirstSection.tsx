import { useEffect } from "react";
import skyImg from "./../assets/study.jpeg";
import studyImg2 from "./../assets/studyImg2.jpeg";
import { firstSectionAnimation } from "./../utils/Animation";
import { Link } from "react-router-dom";

const FirstSection = () => {
  useEffect(() => {
    firstSectionAnimation();
  }, []);
  return (
    <div className="h-[100vh] w-full flex bg-[#FFFFFF]">
      <div className="w-[50%] h-full flex flex-col justify-center items-center">
        <div className="flex gap-4 h-full items-center">
          <div className="flex flex-col ml-8 items-center">
            <div className="flex items-center gap-4 overflow-hidden w-full h-24  -mb-2">
              <h1 className="font-brygada font-semibold text-[7rem] wlcm mt-4">
                Wlcm.
              </h1>
              <h1 className="text-[3rem] font-zyada font-semibold wlcm mt-4">
                To
              </h1>
            </div>
            <div className="overflow-hidden w-full pl-4 -mb-2">
              <h1 className="font-semibold text-[3rem] font-zyada portal">
                Deogiri MCQ. Portal
              </h1>
            </div>
            <div className="w-full flex items-center gap-2 overflow-hidden pl-3">
              <p className="font-zyada font-semibold text-2xl test">
                Start Your
              </p>
              <div className="w-40 h-14 overflow-hidden rounded-full">
                <img src={studyImg2} alt="" className="-mt-14 test" />
              </div>
              <p className="font-zyada font-semibold text-2xl test">
                MCQ. Test.
              </p>
            </div>
          </div>
          {/* img div right */}
          <div className="w-[10rem] object-cover rounded-lg overflow-hidden h-[13rem] shadow-2xl  bg-[#FFFFFF]">
            <img src={skyImg} alt="" className="bg-[#FFFFFF]" id="imgHome" />
          </div>
        </div>
      </div>
      <div className="h-full w-[50%] flex justify-center items-center">
        <div className="w-full flex flex-col">
          <div className="w-full overflow-hidden">
            <p className="font-semibold font-zyada text-3xl right-para pb-1">
              Make sure you are not breaking and rules and regulations
            </p>
          </div>
          <div className="w-full overflow-hidden">
            <p className="right-para">
              Click the button to Proceed.{" "}
              <Link to={"/login"} className="underline">
                Start
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstSection;