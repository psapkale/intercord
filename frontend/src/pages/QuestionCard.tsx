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
         <div className='w-[90%] h-[30%] text-lg font-bold font-mono my-2 flex gap-1'>
            <div>Q{current + 1}.</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam beatae
            nostrum molestiae esse ea soluta, quia enim, tenetur, voluptas eius
            excepturi quo fugit? Consequuntur quos reiciendis quia natus impedit
            sed officiis velit mollitia ex.
         </div>
         {/* options */}
         <div className='w-[90%] h-[70%]'>
            {question?.options?.map((option, i) => {
               return (
                  <select
                     multiple
                     required
                     defaultValue={Array(question?.options?.length).fill(-1)}
                     onChange={handleSelect}
                     className='w-full h-10 my-4 grid grid-cols-1'
                  >
                     <option
                        value={i + 1}
                        key={i}
                        className={`p-2 text-start hover:bg-green-500 border-black transition-all duration-300 border ${
                           i + 1 === testResponse[current]
                              ? 'bg-blue-500'
                              : 'bg-white'
                        } text-black rounded-md text-[15px] font-bold font-mono cursor-pointer`}
                     >
                        {option}
                     </option>
                  </select>
               );
            })}
         </div>
      </div>
   );
};

export default QuestionCard;
