import { CircleUserRound, ClipboardList, Pen } from "lucide-react";
import { Link } from "react-router-dom";

const SideBar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  const handleOnClick = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div
        className={`w-[18%] z-10 rounded-sm border absolute h-full transition-all duration-300 bg-white shadow-lg ${
          !isOpen ? "-translate-x-[100%]" : ""
        }`}
      >
        <div className="flex justify-center border-b  items-center">
          <h1 className="text-center font-bold text-2xl flex items-center gap-2 mt-1">
            <span className="font-zyada ml-14"> Welcome Back!</span>{" "}
            <span className="font-normal text-[1rem] uppercase underline mb-4">
              Abhay
            </span>
          </h1>
        </div>
        <div className="h-full w-full flex flex-col gap-1 mt-4">
          <Link
            to="/dashboard/account"
            className="flex items-center gap-2 py-1 w-full hover:bg-[#F7F7F8] pl-4 transition-all duration-200 text-gray-600 hover:text-black"
            onClick={handleOnClick}
          >
            <CircleUserRound className="w-5" />
            <p>Account</p>
          </Link>
          <Link
            to="/dashboard/leaderboard"
            className="flex items-center gap-2 py-1 w-full hover:bg-[#F7F7F8] pl-4 transition-all duration-200 text-gray-600 hover:text-black"
            onClick={handleOnClick}
          >
            <ClipboardList className="w-5" />
            <p>Leaderboard</p>
          </Link>
          <Link
            to="/dashboard/test"
            className="flex items-center gap-2 py-1 w-full hover:bg-[#F7F7F8] pl-4 transition-all duration-200 text-gray-600 hover:text-black"
            onClick={handleOnClick}
          >
            <Pen className="w-4" />
            <p>Tests</p>
          </Link>
        </div>
      </div>
      {isOpen && (
        <div className="w-full h-full absolute bg-black opacity-[0.5]"></div>
      )}
    </>
  );
};

export default SideBar;
