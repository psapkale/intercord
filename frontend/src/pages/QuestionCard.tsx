/* eslint-disable @typescript-eslint/no-explicit-any */
import { QuestionType } from './GiveTest';

const QuestionCard = ({
   question,
   current,
   testResponse,
   setTestResponse,
}: {
   question: QuestionType;
   current: number;
   testResponse: number[];
   setTestResponse: (x: number[]) => void;
}) => {
   const handleClick = (index: number) => {
      const newResponse = [...testResponse];
      newResponse[current] = index;

      setTestResponse(newResponse);
   };

   return (
      <div className='py-2 my-2 flex flex-col gap-6'>
         <div className='w-[90%] h-[30%] text-lg font-bold font-mono my-2 flex gap-1'>
            <div>Q{current + 1}.</div>
            {question?.question}
         </div>
         {/* options */}
         <div className='w-[90%] h-[70%]'>
            {question?.options?.map((option, i) => {
               return (
                  <div
                     className={`w-full h-10 my-4 grid grid-cols-1 focus:outline-none p-2 text-start hover:bg-green-500 border-black transition-all duration-300 border ${
                        i + 1 === testResponse[current]
                           ? 'bg-blue-500'
                           : 'bg-white'
                     } text-black rounded-md text-[15px] font-bold font-mono cursor-pointer`}
                     key={i}
                     onClick={() => handleClick(i + 1)}
                  >
                     {option}
                  </div>
               );
            })}
         </div>
      </div>
   );
};

export default QuestionCard;
