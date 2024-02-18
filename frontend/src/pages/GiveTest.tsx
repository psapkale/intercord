import { useRef, useState } from 'react';
import QuestionCard from './QuestionCard';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useUserDetails } from '@/utils/store';
import { useNavigate } from 'react-router-dom';

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
   _id: string;
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
   const navigate = useNavigate();
   const user = useUserDetails((state) => state.user);
   const [testResponse, setTestResponse] = useState<number[]>(
      Array(test?.questions?.length).fill(-1)
   );
   const [current, setCurrent] = useState(0);
   let timerRef = useRef<NodeJS.Timeout | null>(null);

   const handlePrev = () => {
      if (current !== 0) {
         setCurrent((c) => c - 1);
      }
   };

   console.log(testResponse);

   const handleNext = () => {
      if (timerRef.current) {
         clearTimeout(timerRef.current);
      }

      // still sometimes select does not get updated
      timerRef.current = setTimeout(() => {
         current !== test?.questions?.length - 1 && setCurrent((c) => c + 1);
      }, 350);
   };

   const handleSubmit = async () => {
      const cl = testResponse?.find((res, i) => {
         if (res === -1) {
            toast.error('Bro, wtf! Iska answer kon dega');
            setCurrent(i);
            return true;
         }
         return false;
      });

      // 'cl' will be undefined when all answers are filled
      if (!cl) {
         // further steps

         try {
            const res = await axios.post(
               `http://localhost:3000/api/student/test/${test?._id}`,
               {
                  submittedAnswersIndex: testResponse,
               },
               {
                  headers: {
                     Authorization: `Bearer ${user.token}`,
                  },
               }
            );

            toast.success(res?.data?.message);
            navigate('/dashboard/test');
         } catch (e: any) {
            toast.error(e?.response?.data?.message);
         }
      }
   };

   return (
      <div className='w-full h-full pl-[6rem] pt-[2rem] flex flex-col gap-4'>
         {/* Headerr */}
         <div className='w-[96%] flex items-center justify-between'>
            <h1 className='text-5xl font-bold font-mono'>Test</h1>
         </div>
         {/* Progress */}
         <div className='mt-6 text-lg font-bold font-mono'>
            <div>
               Question {current + 1} of {test?.questions?.length}
            </div>
         </div>
         {/* Question */}
         <div>
            <QuestionCard
               question={test?.questions[current]}
               current={current}
               testResponse={testResponse}
               setTestResponse={setTestResponse}
            />
         </div>
         {/* Pagination */}
         <div className='w-[90%] flex gap-10 items-start justify-start'>
            <button
               disabled={current === 0}
               className='h-fit hover:bg-white hover:text-black border-black hover:border transition-all duration-300 p-2 px-6 bg-[#0f0f0f] text-white rounded-md text-xl disabled:cursor-not-allowed'
               onClick={handlePrev}
            >
               Prev
            </button>
            {current === test?.questions?.length - 1 ? (
               <button
                  className='h-fit hover:bg-white  hover:text-black border-black hover:border transition-all duration-300 p-2 px-6 bg-[#0f0f0f] text-white rounded-md text-xl'
                  onClick={handleSubmit}
               >
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
