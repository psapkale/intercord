import { ArrowUpLeftFromCircle, Bookmark } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUserDetails } from "@/utils/store";

const TestCard = ({
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
  const user = useUserDetails((state) => state.user);
  return (
    <div
      className="rounded-md border-t-2 shadow-md hover:shadow-xl duration-300
     transition-shadow w-full h-fit py-2 px-2 flex justify-between"
    >
      <div className="">
        <h1 className="font-zyada text-4xl truncate font-semibold tracking-wider">
          {testName}
        </h1>
        <p className="font-zyada line-clamp-2 w-full truncate font-semibold tracking-wider text-2xl">
          {description}
        </p>
      </div>
      <div className="flex items-center justify-center flex-col gap-2">
        {typeOfTestShowing == "upcoming" && (
          <div className="w-full">{startDate}</div>
        )}
        {/* Bookmark and start test */}
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip delayDuration={1}>
              <TooltipTrigger>
                {user.bookmark.includes(_id) ? (
                  <Bookmark
                    fill="black"
                    strokeWidth={1.2}
                    className="cursor-pointer size-6"
                    onClick={() => {
                      handelBookmark(_id);
                    }}
                  />
                ) : (
                  <Bookmark
                    strokeWidth={1.2}
                    className="cursor-pointer size-6"
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
