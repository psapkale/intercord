import {
   ArrowUpLeftFromCircle,
   Bookmark,
   CalendarDays,
   Timer,
} from 'lucide-react';

import { useUserDetails } from '@/utils/store';
import { Link } from 'react-router-dom';
import Hint from './Hint';

const TestDemoCard = ({
   handelBookmark,
   typeOfTestShowing,
   testName = '',
   description = '',
   startDate = '',
   time = '',
   _id,
}: {
   _id: string;
   typeOfTestShowing: string;
   handelBookmark: (_id: string) => void;
   testName: string;
   description: string;
   startDate: string;
   time: string;
}) => {
   const { user } = useUserDetails();

   return (
      <div className='flex flex-col justify-between h-[13rem] px-2 border-2 hover:shadow-lg transition-shadow duration-200 py-2 rounded-md'>
         <div>
            <div className='flex w-full justify-between'>
               <p className='text-xl uppercase font-semibold'>{testName}</p>
               <div className='flex items-center gap-2'>
                  {typeOfTestShowing == 'closed' && user.role == 'student' && (
                     <>
                        {user.bookmark?.includes(_id) ? (
                           <Hint label='Bookmark'>
                              <Bookmark
                                 strokeWidth={1.5}
                                 fill='black'
                                 className='size-5 cursor-pointer hover:text-black transition-colors duration-200'
                                 onClick={() => {
                                    handelBookmark(_id);
                                 }}
                              />
                           </Hint>
                        ) : (
                           <Hint label='Bookmark'>
                              <Bookmark
                                 strokeWidth={1.5}
                                 className='size-5 cursor-pointer text-gray-500 hover:text-black transition-colors duration-200'
                                 onClick={() => {
                                    handelBookmark(_id);
                                 }}
                              />
                           </Hint>
                        )}
                     </>
                  )}

                  {/* {typeOfTestShowing === 'live' && ( */}
                  {user.role == 'student' && (
                     <Hint label='Start Test'>
                        <Link to={`${_id}`}>
                           <button className='cursor-pointer'>
                              <ArrowUpLeftFromCircle
                                 className={
                                    'mt-[0.3rem] size-4  text-gray-500 hover:text-black transition-colors duration-200'
                                 }
                              />
                           </button>
                        </Link>
                     </Hint>
                  )}
               </div>
            </div>
            <div className='w-full line-clamp-4 text-gray-500'>
               <p>{description}</p>
            </div>
         </div>
         <div>
            <div className='mt-2 flex items-center gap-2'>
               <CalendarDays className='size-5' />
               <p className='text-gray-600'>{startDate}</p>
            </div>
            <div className='mt-1 flex items-center gap-2'>
               <Timer className='size-5' />
               {/* <p className='text-gray-600'>10:20</p> */}
               <p className='text-gray-600'>{time}</p>
            </div>
         </div>
      </div>
   );
};

export default TestDemoCard;
