import ScoreCard from "./ScoreCard";

export type StudentScoreType = {
  candidate: string;
  name: string;
  username: string;
  submissions: number;
  score: number;
};

const RankingTable = ({ allStudents }: { allStudents: StudentScoreType[] }) => {
  return (
    <div className="w-full h-full flex flex-col relative overflow-x-hidden">
      <div
        className="bg-white flex w-full py-2 px-2  mb-4 border border-b-black sticky top-0"
        id="rank"
      >
        <h1 className="w-[10%]  font-semibold text-[18px]">Rank.</h1>
        <h1 className="w-[60%] truncate  font-semibold text-[18px] ml-[1rem] ">
          Student Name
        </h1>
        <h1 className="w-[20%] hidden md:block  font-semibold text-[18px] truncate">
          Submissions
        </h1>
        <h1 className="w-[20%] max-md:w-[30%] truncate  font-semibold text-[18px]">
          Total Score
        </h1>
      </div>
      {allStudents.map((student, idx) => {
        return (
          <ScoreCard
            name={student.name}
            username={student.username}
            rank={idx + 1 + ""}
            score={student.score}
            submission={student.submissions}
            key={idx}
          />
        );
      })}{" "}
    </div>
  );
};

export default RankingTable;
