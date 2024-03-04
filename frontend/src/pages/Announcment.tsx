/* eslint-disable @typescript-eslint/no-explicit-any */
import AnnouncmentCard from "@/components/AnnouncmentCard";
import Hint from "@/components/Hint";

import { useUserDetails } from "@/utils/store";
import axios from "axios";
import { BellPlus } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Announcment = () => {
  const { user, handleAllSeenZustand } = useUserDetails();
  const location = useLocation();

  // updating seen to true for particular loged In user
  const handleAllSeen = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/${user.role}/updateseen`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (err) {
      console.log("error in announcement ", err);
    }
  };

  useEffect(() => {
    if (location.pathname == "/dashboard/announcment") {
      handleAllSeen();
      handleAllSeenZustand();
    }
  }, [user.announcements.length]);

  return (
    <div className="w-full h-fit pl-[1.5rem] sm:pl-[2rem] md:pl-[6rem] pt-[2rem] overflow-y-scroll py-8">
      <div className="w-full flex justify-between max-md:mt-10 pr-10">
        <h1 className="text-3xl sm:text-5xl font-semibold uppercase">
          Announcment
        </h1>
        {user.role !== "student" && (
          <Hint label="Create new announcment">
            <Link
              to={"/dashboard/create-announcment"}
              className="hover:bg-gray-200 rounded-full h-12 w-12 flex justify-center items-center transition-colors duration-300"
            >
              <BellPlus className="size-7" />
            </Link>
          </Hint>
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
