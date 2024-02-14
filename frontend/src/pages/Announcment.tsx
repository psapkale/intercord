import AnnouncmentCard from "@/components/AnnouncmentCard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUserDetails } from "@/utils/store";
import { BellPlus } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Announcment = () => {
  const user = useUserDetails((state) => state.user);
  console.log(user.announcements);

  useEffect(() => {}, []);
  return (
    <div className="w-full h-fit pl-[1.5rem] sm:pl-[2rem] md:pl-[6rem] pt-[2rem] overflow-y-scroll py-8">
      <div className="w-full flex justify-between max-md:mt-10 pr-10">
        <h1 className="text-3xl sm:text-5xl font-semibold uppercase">
          Announcment
        </h1>
        {user.role !== "student" && (
          <TooltipProvider>
            <Tooltip delayDuration={1}>
              <TooltipTrigger>
                <Link
                  to={"/dashboard/create-announcment"}
                  className="hover:bg-gray-200 rounded-full h-12 w-12 flex justify-center items-center transition-colors duration-300"
                >
                  <BellPlus className="size-7" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create Announcment</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="w-full h-fit mt-6 flex flex-col gap-5">
        {user?.announcements?.map((ann, idx) => {
          return (
            <AnnouncmentCard
              key={idx}
              title={ann.title}
              description={ann.description}
              creator={ann.creator}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Announcment;
