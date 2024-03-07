import { TestType } from '@/pages/GiveTest';
import { StudentSubmissionType } from '@/pages/StudentTests';
import { UserType } from '@/utils/store';
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from '@radix-ui/react-tooltip';
import axios from 'axios';
import { ArrowUpLeftFromCircle, CalendarDays, Timer } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const StudentTestCard = ({
   submission,
   user,
}: {
   submission: StudentSubmissionType;
   user: UserType;
}) => {
   const [test, setTest] = useState<TestType>();
   const currentDateTime = new Date();
   const options = {
      timeZone: 'Asia/Kolkata',
      hour12: false,
   };
   const indianTime = currentDateTime.toLocaleString('en-US', options);
   const formattedDate = new Date(indianTime).toISOString().split('T')[0];

   const [shouldRevealResult, setShouldRevealResult] = useState(true);

   console.log(test?.startDate !== formattedDate);

   if (
      test?.startDate === formattedDate &&
      test?.endTime >= indianTime.slice(10, 16)
   ) {
      console.log('In');

      setShouldRevealResult(false);
   }

   // console.log(test, shouldRevealResult);

   useEffect(() => {
      getTest();
   }, []);

   const getTest = async () => {
      try {
         const res = await axios.get(
            `http://localhost:3000/api/student/test/${submission?.test}`,
            {
               headers: {
                  Authorization: `Bearer ${user.token}`,
               },
            }
         );

         res?.data?.test && setTest(res?.data?.test);
      } catch (e: any) {}
   };

   return (
      <div className='flex flex-col justify-between h-[13rem] px-2 border-2 hover:shadow-lg transition-shadow duration-200 py-2 rounded-md'>
         <div>
            <div className='flex w-full justify-between'>
               <p className='text-xl uppercase font-semibold'>
                  {submission?.testTitle || 'Title'}
               </p>
               <div className='flex items-center gap-2'>
                  <TooltipProvider>
                     <Link to={`/dashboard/test/${submission?.test}`}>
                        <Tooltip delayDuration={1}>
                           <TooltipTrigger>
                              <button className='cursor-pointer'>
                                 <ArrowUpLeftFromCircle
                                    className={
                                       'mt-[0.3rem] size-4  text-gray-500 hover:text-black transition-colors duration-200'
                                    }
                                 />
                              </button>
                           </TooltipTrigger>
                           <TooltipContent className='py-1 px-2 text-[14px] bg-white border border-[#f0f0f0] rounded-md shadow-md'>
                              <p>Start Test</p>
                           </TooltipContent>
                        </Tooltip>
                     </Link>
                  </TooltipProvider>
               </div>
            </div>
            <div className='w-full line-clamp-4 text-gray-800'>
               <p className='text-sm uppercase font-semibold'>
                  {submission?.subject || 'Subject'}
               </p>
               {shouldRevealResult && (
                  <p>Marks Obtained: {submission?.marksObtained}</p>
               )}
            </div>
         </div>
         <div>
            <div className='p-1 flex items-center gap-2'>
               <CalendarDays className='size-5' />
               <p className='text-gray-800'>
                  {submission?.submittedAt?.toString()?.slice(0, 10)}
               </p>
            </div>
            <div className='p-1 flex items-center gap-2'>
               <Timer className='size-5' />
               <p className='text-gray-800'>
                  {submission?.submittedAt?.toString()?.slice(11, 19)}
               </p>
            </div>
         </div>
      </div>
   );
};

export default StudentTestCard;
