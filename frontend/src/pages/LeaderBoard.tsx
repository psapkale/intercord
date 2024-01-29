import RankingTable from "@/components/RankingTable";

const LeaderBoard = () => {
  return (
    <div className="w-full h-[100vh] pl-[6rem] pt-[2rem] overflow-scroll py-8">
      <div className="w-[95%] h-[95%]">
        <h1 className="font-mono font-semibold text-[3.5rem] -mb-4">
          Leaderboard
        </h1>
        <p className="pl-1">Here you can see your and others's ranking</p>
        <div className="w-full h-[90%] border border-black overflow-scroll rounded-md shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] mt-4">
          <RankingTable />
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
