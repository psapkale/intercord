import TestCard from "@/components/TestCard";
import { callTestDriver } from "@/utils/driver";
import { useUserDetails } from "@/utils/store";
import { ArrowUpLeftFromCircle, Timer, X } from "lucide-react";
import { useState } from "react";

const TestsList = () => {
  const [typeOfTestShowing, setTypeOfTestShowing] = useState("upcoming");
  const user = useUserDetails((state) => state.user);
  const updateTutorial = useUserDetails((state) => state.updateTutorial);
  // const [tests, setTests] = useState<Object[]>([]);

  if (user.isSignedUp && user.testDriverJs) {
    updateTutorial("testDriverJs");
    callTestDriver();
  }

  // handling add to favourite test
  const handelAddTofavourite = () => {};

  return (
    <div className="w-full h-full pl-[2rem] md:pl-[6rem] pt-[2rem] pr-[1rem] sm:pr-[2rem] flex flex-col gap-4">
      <div className="flex mt-4 pl-1 gap-4">
        <button
          className={`flex items-center hover:bg-gray-300 transition-colors duration-300 py-1 px-2 rounded-md gap-1 font-zyada text-xl sm:text-2xl font-semibold ${
            typeOfTestShowing === "upcoming" ? "bg-gray-300" : "bg-gray-200"
          }`}
          onClick={() => {
            setTypeOfTestShowing("upcoming");
          }}
        >
          Up Coming <Timer className="mb-1 size-5" />
        </button>
        <button
          className={`flex items-center hover:bg-gray-300 transition-colors duration-300 py-1 px-2 rounded-md gap-1 font-zyada text-xl sm:text-2xl font-semibold ${
            typeOfTestShowing === "live" ? "bg-gray-300" : " bg-gray-200"
          }`}
          onClick={() => {
            setTypeOfTestShowing("live");
          }}
        >
          Live{" "}
          <ArrowUpLeftFromCircle className="mb-1 size-4" strokeWidth={2.5} />
        </button>
        <button
          className={`flex items-center hover:bg-gray-300 transition-colors duration-300 py-1 px-2 rounded-md gap-1 font-zyada text-xl sm:text-2xl font-semibold ${
            typeOfTestShowing === "closed" ? "bg-gray-300" : "bg-gray-200"
          }`}
          onClick={() => {
            setTypeOfTestShowing("closed");
          }}
        >
          Closed <X strokeWidth={2.75} className="mb-1 size-5" />
        </button>
      </div>
      <div className="h-full w-full flex flex-col gap-4">
        {Array(10)
          .fill("")
          .map((_, idx) => {
            return (
              <TestCard
                typeOfTestShowing={typeOfTestShowing}
                handelAddTofavourite={handelAddTofavourite}
                key={idx}
              />
            );
          })}
      </div>
    </div>
  );
};

export default TestsList;
