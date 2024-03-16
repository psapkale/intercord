import useTestsAsPerTime, { TestType } from '@/hook/useTestsAsPerTime';
import { useUserDetails } from '@/utils/store';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Bookmark } from 'lucide-react';
import BookMarkCard from '@/components/BookMarkCard';

const BookmarkTests = () => {
   const user = useUserDetails((state) => state.user);
   const [bookmarkData, setBookmarData] = useState<TestType[]>();
   const { handelBookmark } = useTestsAsPerTime('', false);

   // Getting all bookmark test
   const getAllBookMarkTests = async () => {
      try {
         const data = await axios.get(
            'https://intercord-server.vercel.app/api/student/allbookmarktest',
            {
               headers: {
                  Authorization: `Bearer ${user.token}`,
               },
            }
         );

         // console.log(data?.data?.allBookmarkedTests);
         setBookmarData(data?.data?.allBookmarkedTests);
      } catch (error) {
         console.log('Error in BookMark Page', error);
      }
   };

   useEffect(() => {
      getAllBookMarkTests();
   }, []);
   return (
      <div className='w-full h-full pl-[2rem] lg:pl-[6rem] pt-[2rem] pr-[1rem] sm:pr-[2rem] flex flex-col gap-4'>
         <h1 className='text-5xl font-bold uppercase flex items-center'>
            Bookmark
            <Bookmark className='size-11 mt-2' />
         </h1>

         <div className='h-full w-full grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 grid md:grid-cols-4 gap-4'>
            {bookmarkData?.map((test, idx) => {
               return (
                  <BookMarkCard
                     _id={test._id}
                     description={test.description}
                     startDate={test.startDate}
                     testName={test.subject}
                     handelBookmark={handelBookmark}
                     key={idx}
                     setBookmarData={setBookmarData}
                     bookmarkData={bookmarkData}
                  />
               );
            })}
         </div>
      </div>
   );
};

export default BookmarkTests;
