import TestCardSubject from "./TestCardSubject";

const TestTable = () => {
  return (
    <div>
      <div
        className="bg-white flex w-full py-2 px-2  mb-4 border border-b-black"
        id="rank"
      >
        <h1 className="w-[10%] font-zyada font-semibold text-xl ">Sr. no.</h1>
        <h1 className="w-[90%] truncate font-zyada font-semibold text-xl ml-[1rem] ">
          Test Name
        </h1>
      </div>
      {Array(10)
        .fill("")
        .map((_, idx) => {
          return (
            <TestCardSubject
              srNo={idx + 1}
              key={idx}
              testId={""}
              name={"Title daaal dena baad mein babu"}
            />
          );
        })}
    </div>
  );
};

export default TestTable;
