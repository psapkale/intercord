import { SubmissionType } from '@/pages/GiveTest';
import { useUserDetails } from '@/utils/store';

const TestSubmissionCard = ({
   rank,
   submission,
}: {
   rank: number;
   submission: SubmissionType;
}) => {
   const { user } = useUserDetails();

   const isCurrentUserSubmission = submission.submittedBy === user?._id;

   return (
      <div
         className={`w-full h-fit p-4 border ${
            isCurrentUserSubmission ? 'border-[#d0d0d0]' : 'border-transparent'
         } hover:border-[#c0c0c0] rounded-lg flex items-center hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.08)]`}
      >
         <h1 className='w-[10%] text-start font-mono text-[18px]'>{rank}</h1>
         <h1 className='w-[60%] text-start truncate font-mono text-[18px] ml-[1rem] '>
            {submission?.name}
         </h1>
         <h1 className='w-[20%] text-start hidden md:block font-mono text-[18px] truncate'>
            {submission?.submittedAt}
         </h1>
         <h1 className='w-[20%] text-start max-md:w-[30%] truncate font-mono text-[18px]'>
            {submission?.obtainedMarks}
         </h1>
      </div>
   );
};

export default TestSubmissionCard;
