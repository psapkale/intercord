/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import RankingTable from "@/components/RankingTable";
import TestTable from "@/components/TestTable";
import useFetchingDataFn from "@/hook/useFetchingDataFn";
import { callLeaderBoardDriver } from "@/utils/driver";
import { useUserDetails } from "@/utils/store";
import { useEffect } from "react";

const LeaderBoard = () => {
  const { user, updateTutorial } = useUserDetails((state) => ({
    user: state.user,
    updateTutorial: state.updateTutorial,
  }));

  // destructuring the data from the hook
  const {
    getAllStudentRanking,
    getAllTestBySelectedSubject,
    getRankingByTest,
    getRankingOfStudentBySubject,
    selectedOptionField,
    setIsRankingOpen,
    setSelectedOptionField,
    isRankingOpen,
  } = useFetchingDataFn();

  //<-- checking if we need to display the tutorial or not -->
  if (user.isSignedUp && user.leaderboardDriverJs) {
    updateTutorial("leaderboardDriverJs");
    callLeaderBoardDriver();
  }

  useEffect(() => {
    if (selectedOptionField !== "all") getAllTestBySelectedSubject();
    else {
      getAllStudentRanking();
    }
  }, [selectedOptionField]);

  return (
    <div className="w-full h-[100vh] pl-[6rem] pt-[2rem] overflow-scroll py-8">
      <div className="w-[95%] h-[95%]">
        <div className="flex flex-col">
          <div>
            <h1
              className="font-mono font-semibold text-[3.5rem] -mb-4"
              id="title"
            >
              Leaderboard
            </h1>
            <p className="pl-1">Here you can see your and others's ranking</p>
          </div>
          <div className="pl-1 w-full flex justify-between items-center mt-4">
            <div className="flex gap-4">
              <button
                className={`px-2 py-1 rounded-md bg-gray-100 ${
                  selectedOptionField === "all" && "cursor-not-allowed"
                }`}
                disabled={selectedOptionField === "all"}
                onClick={() => {
                  getAllTestBySelectedSubject();
                  setIsRankingOpen(false);
                }}
              >
                Tests
              </button>
              <button
                className={`px-2 py-1 rounded-md bg-gray-100 ${
                  selectedOptionField === "all" && "cursor-not-allowed"
                }`}
                disabled={selectedOptionField === "all"}
                onClick={() => {
                  setIsRankingOpen(true);
                  getRankingOfStudentBySubject();
                }}
              >
                Ranking
              </button>
            </div>
            <select
              className="outline-none bg-gray-100 p-2 rounded-md"
              onChange={(e) => {
                setSelectedOptionField(e.target.value);
                if (e.target.value == "all") setIsRankingOpen(false);
              }}
            >
              <option value="all">All</option>
              <option value="php">Php</option>
              <option value="java">Java</option>
              <option value="c++">c++</option>
            </select>
          </div>
        </div>
        <div
          className="w-full h-[90%] border border-black overflow-scroll rounded-md shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] mt-4"
          id="rankingTable"
        >
          {selectedOptionField == "all" || isRankingOpen ? (
            <RankingTable />
          ) : (
            <TestTable getRankingByTest={getRankingByTest} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
