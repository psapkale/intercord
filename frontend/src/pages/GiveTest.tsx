import { useState } from 'react';
import QuestionCard from './QuestionCard';

export type QuestionType = {
   question: string;
   options: string[];
   answerIndex: 1 | 2 | 3 | 4;
};

type SubmissionType = {
   submittedBy: string;
   obtainedMarks: number;
};

export type TestType = {
   subject: string;
   description: string;
   questions: QuestionType[];
   totalMarks: number;
   createdBy: string;
   startDate: string;
   time: string;
   endTime: string;
   createdAt: Date;
   submissions: SubmissionType[];
};

const GiveTest = ({ test }: { test: TestType }) => {
   console.log(test);

   const [current, setCurrent] = useState(1);

   const handlePrev = () => {
      current !== 1 && setCurrent((c) => c - 1);
   };

   const handleNext = () => {
      current !== 10 && setCurrent((c) => c + 1);
   };

   return (
      <div className='w-full h-full pl-[6rem] pt-[2rem] flex flex-col gap-4'>
         {/* Headerr */}
         <div className='w-[96%] flex items-center justify-between'>
            <h1 className='text-5xl font-bold font-mono'>Test</h1>
         </div>
         {/* Progress */}
         <div className='mt-6 text-lg font-bold font-mono'>
            <div>Question {current} of 10</div>
         </div>
         {/* Question */}
         <div>
            {test?.questions?.map((question) => (
               <QuestionCard question={question} />
            ))}
         </div>
         {/* Pagination */}
         <div className='w-[90%] flex gap-10 items-start justify-start'>
            <button
               disabled={current === 1}
               className='h-fit hover:bg-white hover:text-black border-black hover:border transition-all duration-300 p-2 px-6 bg-[#0f0f0f] text-white rounded-md text-xl disabled:cursor-not-allowed'
               onClick={handlePrev}
            >
               Prev
            </button>
            {current === 10 ? (
               <button className='h-fit hover:bg-white  hover:text-black border-black hover:border transition-all duration-300 p-2 px-6 bg-[#0f0f0f] text-white rounded-md text-xl'>
                  Submit
               </button>
            ) : (
               <button
                  className='h-fit hover:bg-white  hover:text-black border-black hover:border transition-all duration-300 p-2 px-6  bg-[#0f0f0f] text-white rounded-md text-xl'
                  onClick={handleNext}
               >
                  Next
               </button>
            )}
         </div>
      </div>
   );
};

export default GiveTest;
