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
   const handleSelect = (e: any) => {
      const newResponse = [...testResponse];
      newResponse[current] = parseInt(e.target.value);
      setTestResponse(newResponse);
   };

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
                  // selected is still not working
                  return (
                     <option
                        value={i + 1}
                        key={i}
                        className='h-fit p-2 text-start hover:bg-green-500 border-black transition-all duration-300 border bg-white text-black rounded-md text-[15px] font-bold font-mono cursor-pointer'
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
