import RankingTable from "@/components/RankingTable";
import { callLeaderBoardDriver } from "@/utils/driver";
import { useUserDetails } from "@/utils/store";

const LeaderBoard = () => {
  const { user, updateTutorial } = useUserDetails((state) => ({
    user: state.user,
    updateTutorial: state.updateTutorial,
  }));

  if (user.isSignedUp && user.leaderboardDriverJs) {
    updateTutorial("leaderboardDriverJs");
    callLeaderBoardDriver();
  }

  return (
    <div className="w-full h-[100vh] pl-[6rem] pt-[2rem] overflow-scroll py-8">
      <div className="w-[95%] h-[95%]">
        <div className="flex flex-col">
          <h1
            className="font-mono font-semibold text-[3.5rem] -mb-4"
            id="title"
          >
            Leaderboard
          </h1>
          <p className="pl-1">Here you can see your and others's ranking</p>
        </div>
        <div
          className="w-full h-[90%] border border-black overflow-scroll rounded-md shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] mt-4"
          id="rankingTable"
        >
          <RankingTable />
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
