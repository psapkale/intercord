import { User } from "lucide-react";
import ProfileImg from "./../assets/pi.jpg";

const SideBar = () => {
  return (
    <div className="w-[18rem] border border-black h-[100vh] bg-[#2B2D31] text-[#949BA4] shadow-lg">
      <div className="flex items-center gap-4 text-white w-full justify-center h-16 bg-[#1E1F22]">
        <img src={ProfileImg} alt="" className="rounded-full w-12 h-12" />
        <div>
          <h1 className="text-[1rem] -mb-1">Abhay Panchal</h1>
          <p className="text-gray-400">abpanchal@gmail.com</p>
        </div>
      </div>
      <div className="w-full h-full py-2 cursor-pointer">
        <div className="flex pl-8 gap-4 items-center">
          <User />
          <p className="text-[1.2rem]">Profile</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
