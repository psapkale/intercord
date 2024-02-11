import {
  ArrowUpLeftFromCircle,
  Bookmark,
  CalendarDays,
  Timer,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useUserDetails } from "@/utils/store";

const TestDemoCard = ({
  handelBookmark,
  typeOfTestShowing,
  testName = "",
  description = "",
  startDate = "",
  _id,
}: {
  _id: string;
  typeOfTestShowing: string;
  handelBookmark: (_id: string) => void;
  testName: string;
  description: string;
  startDate: string;
}) => {
  const bookmark = useUserDetails((state) => state.user.bookmark);

  return (
    <div className="flex flex-col justify-between h-[13rem] px-2 border-2 shadow-md hover:shadow-lg transition-shadow duration-200 py-2 rounded-md">
      <div>
        <div className="flex w-full justify-between">
          <p className="text-xl uppercase font-semibold">{testName}</p>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              {typeOfTestShowing == "closed" && (
                <Tooltip delayDuration={1}>
                  <TooltipTrigger>
                    {bookmark.includes(_id) ? (
                      <Bookmark
                        strokeWidth={1.5}
                        fill="black"
                        className="size-5 cursor-pointer hover:text-black transition-colors duration-200"
                        onClick={() => {
                          handelBookmark(_id);
                        }}
                      />
                    ) : (
                      <Bookmark
                        strokeWidth={1.5}
                        className="size-5 cursor-pointer text-gray-500 hover:text-black transition-colors duration-200"
                        onClick={() => {
                          handelBookmark(_id);
                        }}
                      />
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>bookmark</p>
                  </TooltipContent>
                </Tooltip>
              )}

              <Tooltip delayDuration={1}>
                <TooltipTrigger>
                  <button
                    className={
                      typeOfTestShowing == "live"
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
                    }
                    disabled={typeOfTestShowing !== "live"}
                  >
                    <ArrowUpLeftFromCircle
                      className={
                        "mt-[0.3rem] size-4  text-gray-500 hover:text-black transition-colors duration-200"
                      }
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Start Test</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="w-full line-clamp-4 text-gray-500">
          <p>{description}</p>
        </div>
      </div>
      <div>
        <div className="mt-2 flex items-center gap-2">
          <CalendarDays className="size-5" />
          <p className="text-gray-600">{startDate}</p>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <Timer className="size-5" />
          <p className="text-gray-600">10:20</p>
        </div>
      </div>
    </div>
  );
};

export default TestDemoCard;
