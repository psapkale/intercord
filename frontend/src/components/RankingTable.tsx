import ScoreCard from "./ScoreCard";

const RankingTable = () => {
  return (
    <div className="w-full h-full flex flex-col relative">
      <div className="bg-white flex w-full py-2 px-2  mb-4 border border-b-black">
        <h1 className="w-[10%] font-zyada font-semibold text-xl">Rank.</h1>
        <h1 className="w-[50%] font-zyada font-semibold text-xl">
          Student Name
        </h1>
        <h1 className="w-[30%] font-zyada font-semibold text-xl">
          Total Score
        </h1>
        <h1 className="w-[10%] font-zyada font-semibold text-xl">
          Submissions
        </h1>
      </div>
      {Array(30)
        .fill(0)
        .map((val, idx) => {
          return (
            <ScoreCard
              name="Prem"
              rank="1"
              score="100"
              submission="10"
              key={idx}
            />
          );
        })}{" "}
    </div>
  );
};

export default RankingTable;
