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
import { TestType } from "@/hook/useTestsAsPerTime";

const BookMarkCard = ({
  handelBookmark,
  testName = "",
  description = "",
  startDate = "",
  _id,
  bookmarkData,
  setBookmarData,
}: {
  _id: string;
  handelBookmark: (_id: string) => void;
  testName: string;
  description: string;
  startDate: string;
  setBookmarData: (bookmarkData: TestType[]) => void;
  bookmarkData: TestType[];
}) => {
  const handleBookMarkClick = async () => {
    await handelBookmark(_id);
    const filteredData = bookmarkData.filter((test) => test._id !== _id);

    setBookmarData(filteredData);
  };
  return (
    <div className="flex flex-col justify-between h-[13rem] px-2 border-2 shadow-md hover:shadow-lg transition-shadow duration-200 py-2 rounded-md">
      <div>
        <div className="flex w-full justify-between">
          <p className="text-xl uppercase font-semibold">{testName}</p>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip delayDuration={1}>
                <TooltipTrigger>
                  <Bookmark
                    strokeWidth={1.5}
                    fill="black"
                    className="size-5 cursor-pointer hover:text-black transition-colors duration-200"
                    onClick={handleBookMarkClick}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>bookmark</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip delayDuration={1}>
                <TooltipTrigger>
                  <ArrowUpLeftFromCircle
                    className={
                      "mt-[0.3rem] size-4  text-gray-500 hover:text-black transition-colors duration-200"
                    }
                  />
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

export default BookMarkCard;
