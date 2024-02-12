import { QuestionType } from './GiveTest';

const QuestionCard = ({ question }: { question: QuestionType }) => {
   return (
      <div className='py-2 my-2 flex flex-col gap-6'>
         <div className='h-[30%] text-lg font-bold font-mono my-2'>
            {question?.question}
         </div>
         {/* options */}
         <div className='w-[90%] h-[70%] grid grid-cols-1 gap-4 '>
            {question?.options?.map((option) => (
               <button className='h-fit p-2 text-start hover:bg-green-500 border-black transition-all duration-300 border bg-white text-black rounded-md text-[15px] font-bold font-mono cursor-pointer'>
                  {option}
               </button>
            ))}
         </div>
      </div>
   );
};

export default QuestionCard;
