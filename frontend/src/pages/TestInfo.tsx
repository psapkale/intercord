import { useUserDetails } from '@/utils/store';
import { TestType } from './GiveTest';

const TestInfo = ({ test }: { test: TestType }) => {
   const { user } = useUserDetails();

   const userSubmission = test?.submissions?.find(
      (x) => x?.submittedBy === user?._id
   );

   return (
      <div className='w-[90%] h-full pl-[6rem] pt-[2rem] flex flex-col'>
         <div className='flex items-center justify-between'>
            <div className='mb-4'>
               <h1 className='font-mono font-semibold text-[3rem] sm:text-[3.5rem]'>
                  {test?.subject}
               </h1>
               <h1 className='text-[1.1rem] pl-1 font-mono'>created by</h1>
            </div>
            <div className='text-[1.1rem] font-mono font-semibold flex flex-col items-start justify-start'>
               <h1 className='text-[1.1rem] pl-1 font-mono'>
                  {test?.startDate}
               </h1>
               <h1>
                  {userSubmission?.obtainedMarks} / {test?.totalMarks}
               </h1>
            </div>
         </div>
         <div className='text-[1.5rem] font-mono'>{test?.description}</div>
      </div>
   );
};

export default TestInfo;
