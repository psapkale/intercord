import { useState } from "react";
import QuestionModel from "./QuestionModel";

// Question type
export type question = {
  question: string;
  options: string[];
  answerIndex: number;
};

const CreateTest = () => {
  const [test, setTest] = useState<question[]>([]);
  const [step, setStep] = useState(0);

  // handling next question
  const handleNext = ({ question, options, answerIndex }: question) => {
    setTest([...test, { question, options, answerIndex }]);
    setStep((step) => step + 1);
  };

  // sending test to the backend
  const handleSubmit = () => {
    setStep(0);
  };

  return (
    <div className="w-full h-full pl-[6rem] pt-[2rem]">
      <div className="flex flex-col">
        <h1
          className="font-mono tracking-tight font-semibold text-[3.5rem] -mb-4"
          id="title"
        >
          Create Test
        </h1>
        <p className="pl-1">Here you can create the test (10 mcq)</p>
      </div>
      <QuestionModel
        handleNext={handleNext}
        handleSubmit={handleSubmit}
        step={step}
      />
    </div>
  );
};

export default CreateTest;
