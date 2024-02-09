import { ArrowUpLeftFromCircle, Star } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TestCard = ({
  handelAddTofavourite,
  typeOfTestShowing,
}: {
  typeOfTestShowing: string;
  handelAddTofavourite: () => void;
}) => {
  return (
    <div className="rounded-md border-t-2 shadow-lg w-full h-fit py-2 px-2 flex justify-between">
      <div className="">
        <h1 className="font-zyada truncate text-4xl font-semibold tracking-wider">
          Java Test
        </h1>
        <p className="font-zyada line-clamp-1 w-[90%] sm:w-[50%] font-semibold tracking-wider text-2xl">
          description Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Iusto, voluptas? Consequatur esse quo minima assumenda, suscipit
          impedit. Cupiditate deserunt perferendis vitae. Nisi nemo ipsam saepe
          possimus deserunt commodi, id illo.
        </p>
      </div>
      <div className="flex items-center justify-center flex-col gap-2">
        {typeOfTestShowing == "upcoming" && (
          <div className="w-full">29 Jan</div>
        )}
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip delayDuration={1}>
              <TooltipTrigger>
                <Star
                  fill="orange"
                  className="cursor-pointer size-7"
                  strokeWidth={0}
                  onClick={handelAddTofavourite}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to favourite</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip delayDuration={1}>
              <TooltipTrigger>
                <ArrowUpLeftFromCircle className="size-5 mt-1 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Start Test</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default TestCard;
