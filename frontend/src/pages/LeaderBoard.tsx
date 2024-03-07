/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import RankingTable from "@/components/RankingTable";
import TestTable from "@/components/TestTable";
import useFetchingDataFn from "@/hook/useFetchingDataFn";
import axios from "axios";
import { useEffect, useState } from "react";
import { TestType } from "./GiveTest";
import { useUserDetails } from "@/utils/store";

const LeaderBoard = () => {
  // destructuring the data from the hook
  const {
    selectedOptionField,
    setIsRankingOpen,
    setSelectedOptionField,
    isRankingOpen,
  } = useFetchingDataFn();

  const { user } = useUserDetails();
  const [allStudents, setAllStudents] = useState([]);
  const [stream, setStream] = useState("bcs");
  const [pursuingYear, setPursuingYear] = useState("III");
  const [allTests, setAllTests] = useState<TestType[]>([]);

  console.log(user.token);

  useEffect(() => {
    if (selectedOptionField !== "all") {
      getAllTestBySelectedSubject();
      setIsRankingOpen(false);
    } else {
      getAllStudentRanking();
    }
  }, [selectedOptionField, pursuingYear, stream]);

  const getAllStudentRanking = async () => {
    const searchUrl =
      user.role === "admin"
        ? "http://localhost:3000/api/score-board/all"
        : user.role === "student"
        ? "http://localhost:3000/api/student/score-board/all"
        : "http://localhost:3000/api/teacher/score-board/all";

    const res = await axios.post(
      searchUrl,
      {
        // stream,
        stream,
        pursuingYear,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    res?.data?.scoreBoard && setAllStudents(res?.data?.scoreBoard);
    return;
  };

  const getAllStudentsBySelectedSubject = async () => {
    const searchUrl =
      user.role === "admin"
        ? `http://localhost:3000/api/score-board/subject/${selectedOptionField}`
        : user.role === "student"
        ? `http://localhost:3000/api/student/score-board/subject/${selectedOptionField}`
        : `http://localhost:3000/api/teacher/score-board/subject/${selectedOptionField}`;

    const res = await axios.post(
      searchUrl,
      {
        // stream,
        stream: stream.toUpperCase(),
        pursuingYear,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    res?.data?.formattedRes && setAllStudents(res?.data?.formattedRes);
    return;
  };

  const getAllTestBySelectedSubject = async () => {
    const searchUrl =
      user.role === "admin"
        ? `http://localhost:3000/api/score-board/test/${selectedOptionField}`
        : user.role === "student"
        ? `http://localhost:3000/api/student/score-board/test/${selectedOptionField}`
        : `http://localhost:3000/api/teacher/score-board/test/${selectedOptionField}`;

    const res = await axios.post(
      searchUrl,
      {
        // stream,
        stream: stream,
        pursuingYear,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    res?.data?.tests && setAllTests(res?.data?.tests);
    return;
  };

  return (
    <div className="w-full h-[100vh] max-sm:px-[1rem] sm:pl-[1.5rem] md:pl-[3rem] lg:pl-[6rem] pt-[2rem] overflow-y-scroll overflow-x-hidden py-8">
      <div className="w-full md:w-[95%] h-[95%]">
        <div className="flex flex-col">
          <div>
            <h1
              className="font-mono font-semibold text-[3rem] sm:text-[3.5rem] -mb-4"
              id="title"
            >
              Leaderboard
            </h1>
            <p className="pl-1">Here you can see your and others's ranking</p>
          </div>
          <div className="px-[1rem] pl-1 w-full flex justify-between items-center mt-4">
            <div className="flex gap-2 sm:gap-4">
              <button
                className={`px-2 py-1 rounded-md bg-gray-100 ${
                  selectedOptionField === "all" && "cursor-not-allowed"
                } ${
                  !isRankingOpen &&
                  selectedOptionField !== "all" &&
                  "bg-gray-300"
                }`}
                disabled={selectedOptionField === "all"}
                onClick={() => {
                  setIsRankingOpen(false);
                  getAllTestBySelectedSubject();
                }}
              >
                Tests
              </button>
              <button
                className={`px-2 py-1 rounded-md bg-gray-100 ${
                  selectedOptionField === "all" && "cursor-not-allowed"
                } ${
                  isRankingOpen &&
                  selectedOptionField !== "all" &&
                  "bg-gray-300"
                }`}
                disabled={selectedOptionField === "all"}
                onClick={() => {
                  setIsRankingOpen(true);
                  getAllStudentsBySelectedSubject();
                }}
              >
                Ranking
              </button>
            </div>
            <div className="flex gap-2">
              {user.role === "admin" && (
                <select
                  className="outline-none bg-gray-100 p-2 rounded-md"
                  onChange={(e) => {
                    setStream(e.target.value.toLowerCase());
                    // if (e.target.value == 'all') setIsRankingOpen(false);
                  }}
                >
                  <option value="BCS">BCS</option>
                  <option value="BCA">BCA</option>
                  <option value="BTECH">BTECH</option>
                  <option value="BE">BE</option>
                </select>
              )}
              {user.role !== "student" && (
                <select
                  className="outline-none bg-gray-100 p-2 rounded-md"
                  onChange={(e) => {
                    setPursuingYear(e.target.value);
                    // if (e.target.value == 'all') setIsRankingOpen(false);
                  }}
                >
                  <option value="III">III</option>
                  <option value="II">II</option>
                  <option value="I">I</option>
                </select>
              )}
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
        </div>
        <div
          className="w-full h-[90%] border border-black overflow-scroll rounded-md shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] mt-4"
          id="rankingTable"
        >
          {selectedOptionField == "all" || isRankingOpen ? (
            <RankingTable allStudents={allStudents} />
          ) : (
            <TestTable allTests={allTests} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
