import { useUserDetails } from "@/utils/store";
import { ArrowUpRightFromCircle } from "lucide-react";
import { Link } from "react-router-dom";

const FirstSectionHome = () => {
  const user = useUserDetails((state) => state.user);
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center pt-24">
      <p className="text-[5rem] w-[70%] leading-10 font-bold text-center">
        Deogiri <span className="font-zyada text-6xl font-medium">Mcq</span>{" "}
        Based EXAMINATION System
      </p>
      <Link
        to={user.name ? "/dashboard/account" : "/login"}
        className="hover:underline hover:text-black mt-8 transition-colors duration-300 flex items-center text-gray-400 gap-1"
      >
        Continue <ArrowUpRightFromCircle className="size-4 mt-1" />
      </Link>
    </div>
  );
};

export default FirstSectionHome;
