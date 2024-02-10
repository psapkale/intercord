import { ArrowUpRightFromCircle, CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";

const StudentSearchCard = () => {
  return (
    <div className="border border-[#0f0f0f] w-full md:w-[80%] rounded-md bg-white text-slate-900 transition-all duration-200 px-4 flex justify-between font-zyada items-center">
      <p className="text-thin text-2xl font-bold gap-2 pt-3 flex py-2 items-center">
        <CircleUserRound className="-mt-2" />
        Abhay Panchal
      </p>
      <Link to={"/dashboard/student/abhay"}>
        <ArrowUpRightFromCircle className="md:text-gray-400 text-black hover:text-black transition-colors duration-300" />
      </Link>
    </div>
  );
};

export default StudentSearchCard;
