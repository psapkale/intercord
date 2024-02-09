import ScoreCard from "./ScoreCard";

const RankingTable = () => {
  return (
    <div className="w-full h-full flex flex-col relative overflow-x-hidden">
      <div
        className="bg-white flex w-full py-2 px-2  mb-4 border border-b-black"
        id="rank"
      >
        <h1 className="w-[10%] font-zyada font-semibold text-xl ">Rank.</h1>
        <h1 className="w-[60%] truncate font-zyada font-semibold text-xl ml-[1rem] ">
          Student Name
        </h1>
        <h1 className="w-[20%] hidden md:block font-zyada font-semibold text-xl truncate">
          Submissions
        </h1>
        <h1 className="w-[20%] max-md:w-[30%] truncate font-zyada font-semibold text-xl ">
          Total Score
        </h1>
      </div>
      {Array(30)
        .fill(0)
        .map((_, idx) => {
          return (
            <ScoreCard
              name="Abhay Balasaheb Panchal"
              rank={idx + 1 + ""}
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
