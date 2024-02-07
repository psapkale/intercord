/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { useState } from "react";
import { question } from "./CreateTest";

const QuestionModel = ({
  handleNext,
  step,
  handleSubmit,
  totalNumberOfQuestions,
  setStep,
  test,
}: {
  handleNext: (question: question) => void;
  handleSubmit: () => void;
  setStep: (step: any) => void;
  step: number;
  totalNumberOfQuestions: number;
  test: question[];
}) => {
  const [mcq, setMcq] = useState<question>({
    answerIndex: test[step] != undefined ? test[step]?.answerIndex : 1,
    question: test[step] != undefined ? test[step]?.question : "",
    options: test[step] != undefined ? test[step]?.options : ["", "", "", ""],
  });

  //! handling going to the next
  const handleNewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleNext(mcq);
    setMcq({
      answerIndex: 1,
      question: "",
      options: ["", "", "", ""],
    });

    if (step === totalNumberOfQuestions - 1) handleSubmit();
  };

  //! handling going to the previous
  const handlePrev = () => {
    setStep((prev: any) => prev - 1);

    setMcq({
      answerIndex:
        test[Number(step - 1)] != undefined ? test[step - 1]?.answerIndex : 1,
      question:
        test[Number(step - 1)] != undefined ? test[step - 1]?.question : "",
      options:
        test[Number(step - 1)] != undefined
          ? [...test[Number(step - 1)]?.options]
          : ["", "", "", ""],
    });
  };

  return (
    <div className="mt-8">
      <form
        onSubmit={(e) => {
          handleNewSubmit(e);
        }}
      >
        <div className="font-zyada flex flex-col">
          <label htmlFor="fn" className="font-bold text-2xl">
            Question {step + 1}
          </label>
          <textarea
            id="fn"
            required={true}
            value={mcq.question}
            className="bg-[#F7F7F8] rounded-md py-2 text-black text-xl px-2 font-bold tracking-[0.1rem] w-[50rem] h-[6rem] outline-none"
            onChange={(e) => {
              setMcq({ ...mcq, question: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-wrap w-[70%] font-zyada mt-8 gap-4">
          <div className="flex flex-col">
            <label htmlFor="fn" className="font-bold text-2xl">
              Option A
            </label>
            <input
              required
              type="text"
              id="fn"
              value={mcq.options[0]}
              className="bg-[#F7F7F8] rounded-md py-2 text-black text-xl px-2 font-bold tracking-[0.1rem] w-[20rem] outline-none"
              onChange={(e) => {
                let newOptions: string[] = [...mcq.options];
                newOptions[0] = e.target.value;
                setMcq({ ...mcq, options: newOptions });
              }}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="fn" className="font-bold text-2xl">
              Option B
            </label>
            <input
              required
              type="text"
              id="fn"
              value={mcq.options[1]}
              className="bg-[#F7F7F8] rounded-md py-2 text-black text-xl px-2 font-bold tracking-[0.1rem] w-[20rem] outline-none"
              onChange={(e) => {
                let newOptions: string[] = [...mcq.options];
                newOptions[1] = e.target.value;
                setMcq({ ...mcq, options: newOptions });
              }}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="fn" className="font-bold text-2xl">
              Option C
            </label>
            <input
              required
              type="text"
              id="fn"
              value={mcq.options[2]}
              className="bg-[#F7F7F8] rounded-md py-2 text-black text-xl px-2 font-bold tracking-[0.1rem] w-[20rem] outline-none"
              onChange={(e) => {
                let newOptions: string[] = [...mcq.options];
                newOptions[2] = e.target.value;
                setMcq({ ...mcq, options: newOptions });
              }}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="fn" className="font-bold text-2xl">
              Option D
            </label>
            <input
              required
              type="text"
              id="fn"
              value={mcq.options[3]}
              className="bg-[#F7F7F8] rounded-md py-2 text-black text-xl px-2 font-bold tracking-[0.1rem] w-[20rem] outline-none"
              onChange={(e) => {
                let newOptions: string[] = [...mcq.options];
                newOptions[3] = e.target.value;
                setMcq({ ...mcq, options: newOptions });
              }}
            />
          </div>
        </div>
        <div className="flex flex-col font-zyada mt-8">
          <label htmlFor="fn" className="font-bold text-2xl">
            Answer (1, 2, 3, 4)
          </label>
          <input
            required
            type="number"
            id="fn"
            className="bg-[#F7F7F8] rounded-md py-2 text-black text-xl px-2 font-bold tracking-[0.1rem] w-[20rem] outline-none"
            onChange={(e) => {
              setMcq({ ...mcq, answerIndex: Number(e.target.value) });
            }}
            value={mcq.answerIndex}
          />
        </div>
        <div className="flex gap-4">
          <button
            className={
              "hover:bg-white hover:text-black transition-all duration-300 py-1 px-10 text-3xl rounded-md mt-6 text-white font-zyada bg-black " +
              (step == 0 ? "cursor-not-allowed" : "")
            }
            onClick={handlePrev}
            disabled={step == 0}
          >
            Prev
          </button>
          <button
            type="submit"
            className="hover:bg-white hover:text-black transition-all duration-300 py-1 px-10 text-3xl rounded-md mt-6 text-white font-zyada bg-black"
          >
            {step < totalNumberOfQuestions - 1 ? "Next" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionModel;
