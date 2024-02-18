import { useRef } from 'react';
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
   let timerRef = useRef<NodeJS.Timeout | null>(null);

   const handleSelect = (e: any) => {
      const newResponse = [...testResponse];
      newResponse[current] = parseInt(e.target.value);

      if (timerRef.current) {
         clearTimeout(timerRef.current);
      }

      // artificial delay
      timerRef.current = setTimeout(() => {
         setTestResponse(newResponse);
      }, 300);
      // Todo disable the 'Next' button for +300ms
   };

   console.log(testResponse);

   return (
      <div className='py-2 my-2 flex flex-col gap-6'>
         <div className='h-[30%] text-lg font-bold font-mono my-2'>
            {question?.question}
         </div>
         {/* options */}
         <div className='w-[90%] h-[70%] '>
            <select
               multiple
               required
               defaultValue={Array(question?.options?.length).fill(-1)}
               onChange={handleSelect}
               className='w-[90%] h-[70%] my-2 grid grid-cols-1 gap-4'
            >
               {question?.options?.map((option, i) => {
                  return (
                     <option
                        value={i + 1}
                        key={i}
                        className={`h-fit p-2 text-start hover:bg-green-500 border-black transition-all duration-300 border ${
                           i + 1 === testResponse[current]
                              ? 'bg-blue-500'
                              : 'bg-white'
                        } text-black rounded-md text-[15px] font-bold font-mono cursor-pointer`}
                     >
                        {option}
                     </option>
                  );
               })}
            </select>
         </div>
      </div>
   );
};

export default QuestionCard;
