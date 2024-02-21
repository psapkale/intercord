import { Link } from 'react-router-dom';

const ScoreCard = ({
   rank,
   name,
   submission,
   score,
}: {
   rank: string;
   name: string;
   submission: number;
   score: number;
}) => {
   return (
      <Link to={'/dashboard/student/prem'}>
         <div className='flex w-full py-2 px-2 mb-4 pl-4 hover:bg-gray-50'>
            <h1 className='w-[10%] truncate'>{rank}</h1>
            <h1 className='w-[60%] ml-[0.5rem] truncate'>{name}</h1>
            <h1 className='w-[20%] max-sm:text-center hidden md:block truncate'>
               {submission}
            </h1>
            <h1 className='w-[20%] max-md:w-[30%] truncate max-sm:text-center'>
               {score}
            </h1>
         </div>
      </Link>
   );
};

export default ScoreCard;
