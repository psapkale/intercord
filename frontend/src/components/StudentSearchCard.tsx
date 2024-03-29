import { ArrowUpRightFromCircle, CircleUserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

type StudentSubmissionType = {
   test: string | null;
   submittedAnswersIndex: number[];
   marksObtained: number;
   submittedAt: Date;
};

export type StudentType = {
   username: string;
   name: string | undefined;
   email: string;
   password: string;
   linkedinUrl: string;
   githubUrl: string;
   twitterUrl: string;
   submissions: StudentSubmissionType[];
   bookmark: string[];
};

const SearchCard = ({
   role,
   name,
   username,
}: {
   role: string;
   name: string | undefined;
   username: string;
}) => {
   return (
      <div className='border border-[#0f0f0f] w-full md:w-[80%] rounded-md bg-white text-slate-900 transition-all duration-200 px-4 flex justify-between font-bona items-center'>
         <div className='w-4/5 pb-2 flex items-center'>
            <p className='text-thin text-2xl font-bold gap-2 pt-3 flex py-2 items-center'>
               <CircleUserRound className='' />
               <div className='text-xl mt-2'>{name}</div>
            </p>
         </div>
         <Link
            to={
               role === 'teacher'
                  ? `/dashboard/teacher/${username}`
                  : `/dashboard/student/${username}`
            }
         >
            <ArrowUpRightFromCircle className='md:text-gray-400 text-black hover:text-black transition-colors duration-300' />
         </Link>
      </div>
   );
};

export default SearchCard;
