import { Link } from "react-router-dom";

const ScoreCard = ({
  rank,
  name,
  submission,
  score,
}: {
  rank: string;
  name: string;
  submission: string;
  score: string;
}) => {
  return (
    <Link to={"/dashboard/student/prem"}>
      <div className="flex w-full py-2 px-2 mb-4 pl-4 hover:bg-gray-50">
        <h1 className="w-[10%] truncate">{rank}</h1>
        <h1 className="w-[50%] ml-[0.5rem] truncate">{name}</h1>
        <h1 className="w-[20%] text-center truncate">{submission}</h1>
        <h1 className="w-[20%] truncate text-center">{score}</h1>
      </div>
    </Link>
  );
};

export default ScoreCard;
