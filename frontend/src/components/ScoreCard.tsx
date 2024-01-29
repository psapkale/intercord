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
      <div className="flex w-full py-2 px-2 mb-4 pl-4">
        <h1 className="w-[10%]">{rank}</h1>
        <h1 className="w-[50%]">{name}</h1>
        <h1 className="w-[30%]">{submission}</h1>
        <h1 className="w-[10%]">{score}</h1>
      </div>
    </Link>
  );
};

export default ScoreCard;
