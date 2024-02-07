/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import QuestionModel from "./QuestionModel";

// Question type
export type question = {
  question: string;
  options: string[];
  answerIndex: number;
};

// Subject name
type subjectType = "C++" | "PHP" | "JAVA" | "TypeScript";

const CreateTest = () => {
  const [test, setTest] = useState<question[]>([]);
  const [step, setStep] = useState(0);
  const [totalNumberOfQuestions, setTotalNumberOfQuestions] = useState(0);
  const [subjectName, setSubjectName] = useState<subjectType>("C++");

  // handling next question
  const handleNext = ({ question, options, answerIndex }: question) => {
    if (test[step] === undefined)
      setTest([...test, { question, options, answerIndex }]);
    else {
      let modifiedTest = test;
      modifiedTest[step] = { question, options, answerIndex };
      setTest(modifiedTest);
    }
    setStep((step) => step + 1);
  };

  // sending test to the backend
  const handleSubmit = () => {
    setStep(0);
  };

  return (
    <div className="w-full h-full pl-[6rem] pt-[2rem]">
      <div className="flex flex-col gap-4 mb-[3rem]">
        <div>
          <h1
            className="font-b uppercase font-bold text-[4rem] -mb-4"
            id="title"
          >
            Create Test
          </h1>
          <p className="pl-1">Here you can create the test (10 mcq)</p>
        </div>
        <div>
          <div className="flex gap-8 pl-1">
            <div className="flex flex-col">
              <label
                htmlFor="totalNumberOfQuestions"
                className="font-zyada font-bold text-2xl rounded-md"
              >
                Number of Questions:
              </label>
              <input
                type="number"
                id="totalNumberOfQuestions"
                className="outline-none bg-gray-100 p-2"
                value={totalNumberOfQuestions}
                onChange={(e) => {
                  setTotalNumberOfQuestions(Number(e.target.value));
                }}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="totalNumberOfQuestions"
                className="font-zyada font-bold text-2xl"
              >
                Subject:
              </label>
              {/* <input
                type="text"
                id="totalNumberOfQuestions"
                className="outline-none bg-gray-100 p-2 rounded-md"
                value={subjectName}
                onChange={(e) => {
                  setSubjectName(e.target.value);
                }}
              /> */}
              <select
                className="outline-none bg-gray-100 p-2 rounded-md"
                onChange={(e) => {
                  const val = e.target.value;
                  if (
                    val == "C++" ||
                    val == "JAVA" ||
                    val == "PHP" ||
                    val == "TypeScript"
                  ) {
                    setSubjectName(val);
                  }
                }}
              >
                <option value="C++">C++</option>
                <option value="JAVA">JAVA</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* If Number of questions are not selected then in that case */}
      {totalNumberOfQuestions > 0 && subjectName ? (
        <QuestionModel
          handleNext={handleNext}
          handleSubmit={handleSubmit}
          step={step}
          totalNumberOfQuestions={totalNumberOfQuestions}
          test={test}
          setStep={setStep}
        />
      ) : (
        <h1 className="text-5xl font-zyada">
          Select Subject Name and Total number of questions.
        </h1>
      )}
    </div>
  );
};

export default CreateTest;
