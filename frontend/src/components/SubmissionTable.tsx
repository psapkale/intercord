import { SubmissionType } from '@/pages/GiveTest';
import TestSubmissionCard from './TestSubmissionCard';

const SubmissionTable = ({
   allSubmissions,
}: {
   allSubmissions: SubmissionType[];
}) => {
   return (
      <div className='w-full h-full flex flex-col'>
         <div
            className='bg-white flex w-full mt-4 py-2 mb-4 border-b border-b-black sticky top-0'
            id='rank'
         >
            <h1 className='w-[10%] font-mono font-semibold text-[18px]'>
               Rank.
            </h1>
            <h1 className='w-[60%] truncate font-mono font-semibold text-[18px] ml-[1rem] '>
               Student Name
            </h1>
            <h1 className='w-[20%] hidden md:block font-mono font-semibold text-[18px] truncate'>
               Submited at
            </h1>
            <h1 className='w-[20%] max-md:w-[30%] truncate font-mono font-semibold text-[18px]'>
               Total Score
            </h1>
         </div>
         <div className='flex flex-col gap-4'>
            {allSubmissions?.map((submission, idx) => (
               <TestSubmissionCard
                  key={idx}
                  rank={idx + 1}
                  submission={submission}
               />
            ))}{' '}
         </div>
      </div>
   );
};

export default SubmissionTable;
