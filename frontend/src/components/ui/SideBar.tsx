import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="h-full border w-[30%] flex flex-col items-center gap-4">
      <Link
        to={"/dashboard/profile"}
        className="border w-full text-center py-3"
      >
        Profile
      </Link>
      <Link
        to={"/dashboard/leaderboard"}
        className="border w-full text-center py-3"
      >
        leaderboard
      </Link>
      <Link to={"/dashboard/test"} className="border w-full text-center py-3">
        Test
      </Link>
    </div>
  );
};

export default SideBar;
