import { AtSign } from "lucide-react";
import { Link } from "react-router-dom";

const StudentSearchCard = () => {
  return (
    <div className="border border-[#0f0f0f] w-[80%] rounded-md bg-white text-slate-900 transition-all duration-200 px-4 flex justify-between font-zyada items-center">
      <div>
        <span className="text-thin text-2xl font-bold">Abhay Panchal</span>
        <h1 className="text-xl font-bold flex items-center underline">
          <AtSign size={"1rem"} />
          abhxyy
        </h1>
      </div>
      <Link to={"/dashboard/student/abhay"}>
        <div className="flex flex-col justify-center items-center gap-1 py-6">
          <button className="hover:bg-white hover:text-black border-black transition-all duration-300 px-10 border text-center bg-[#0f0f0f] text-white rounded-md text-2xl pt-1">
            Visit Profile
          </button>
        </div>
      </Link>
    </div>
  );
};

export default StudentSearchCard;
