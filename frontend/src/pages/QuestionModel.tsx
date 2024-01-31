/* eslint-disable prefer-const */
import { useState } from "react";
import { question } from "./CreateTest";

const QuestionModel = ({
  handleNext,
  step,
  handleSubmit,
}: {
  handleNext: (question: question) => void;
  handleSubmit: () => void;
  step: number;
}) => {
  const [mcq, setMcq] = useState<question>({
    answerIndex: 1,
    question: "",
    options: ["", "", "", ""],
  });

  const handleNewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleNext(mcq);
    setMcq({
      answerIndex: 1,
      question: "",
      options: ["", "", "", ""],
    });

    if (step === 9) handleSubmit();
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
          />
        </div>
        <button
          className="hover:bg-white hover:text-black transition-all duration-300 py-1 px-10 text-3xl rounded-md mt-6 text-white font-zyada bg-black"
          type="submit"
        >
          {step < 9 ? "Next" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default QuestionModel;
