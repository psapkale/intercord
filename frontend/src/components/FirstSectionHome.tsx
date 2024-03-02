import { useUserDetails } from "@/utils/store";
import { ArrowUpRightFromCircle } from "lucide-react";
import { Link } from "react-router-dom";

const FirstSectionHome = () => {
  const user = useUserDetails((state) => state.user);
  return (
    <div className="w-full containerBg h-[100vh] font-bona flex flex-col justify-center items-center pt-24">
      <p className="text-[3rem] sm:text-[4rem] md:text-[4rem] lg:text-[5rem] md:w-full lg:w-[70%]  md:leading-[4rem] font-bold text-center leading-[3rem]">
        Deogiri{" "}
        <span className="font-zyada text-4xl sm:text-6xl font-semibold">
          Mcq
        </span>{" "}
        <span>Based EXAMINATION System</span>
      </p>
      <Link
        to={user.name ? "/dashboard/account" : "/login"}
        className="hover:underline hover:text-black mt-4 lg:mt-8 transition-colors flex items-center text-gray-400 gap-1"
      >
        Continue <ArrowUpRightFromCircle className="size-4 mt-1" />
      </Link>
    </div>
  );
};

export default FirstSectionHome;
