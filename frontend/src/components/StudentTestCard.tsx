import { StudentSubmissionType } from '@/pages/StudentTests';
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { ArrowUpLeftFromCircle, CalendarDays, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentTestCard = ({
   submission,
}: {
   submission: StudentSubmissionType;
}) => {
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
               <p>Marks Obtained: {submission?.marksObtained}</p>
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
