/* eslint-disable @typescript-eslint/no-unused-vars */
import StudentSearchCard from "@/components/StudentSearchCard";
import { Search, UserRoundSearch } from "lucide-react";
import { useState } from "react";

const Students = () => {
  const [searchName, setSearchName] = useState("");
  const handleSearch = () => {
    console.log("Clicked!");
  };

  return (
    <div className="w-full flex flex-col h-[100vh] pt-[2rem] overflow-scroll py-8">
      <div className="w-full flex justify-center flex-col items-center gap-4">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-bold uppercase flex items-center gap-2">
            Search For Student
            <UserRoundSearch className="size-[2rem] mt-1" />
          </h1>
          <p>(Search student by the names!)</p>
        </div>
        <div className="flex items-center w-[50%] justify-between px-2 py-2 bg-gray-100 rounded-md">
          <input
            type="text"
            placeholder="Search student by Name"
            className="outline-none border-none bg-gray-100 font-semibold placeholder:font-normal"
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value);
            }}
          />
          <Search
            className="size-[1.3rem] cursor-pointer"
            onClick={handleSearch}
          />
        </div>
      </div>
      <div className="w-full h-fit flex flex-col items-center pt-14 gap-4 mb-10">
        <StudentSearchCard />
        <StudentSearchCard />
        <StudentSearchCard />
        <StudentSearchCard />
        <StudentSearchCard />
        <StudentSearchCard />
        <StudentSearchCard />
        <StudentSearchCard />
        <StudentSearchCard />
      </div>
    </div>
  );
};

export default Students;
