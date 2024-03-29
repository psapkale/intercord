/* eslint-disable @typescript-eslint/no-unused-vars */
import { useUserDetails } from '@/utils/store';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export type TestType = {
   readonly _id: string;
   subject: string;
   description: string;
   startDate: string;
   time: string;
   endTime: string;
   title: string;
};

const useTestsAsPerTime = (
   typeOfTestShowing: string = '',
   fetchByField: boolean = true
) => {
   const [loading, setLoading] = useState(true);
   const [bookMarkLoading, setBookMarkLoading] = useState(false);
   const [tests, setTests] = useState<TestType[]>();
   const user = useUserDetails((state) => state.user);
   const bookmarkUpdate = useUserDetails((state) => state.bookmarkUpdate);
   const removeFromBookMark = useUserDetails(
      (state) => state.removeFromBookMark
   );

   const fetchTestBasedOnField = async () => {
      setLoading(true);

      try {
         setTests([]);
         const searchUrl =
            user.role === 'admin'
               ? `https://intercord-server.vercel.app/api/${typeOfTestShowing}`
               : user.role === 'student'
               ? `https://intercord-server.vercel.app/api/student/${typeOfTestShowing}`
               : `https://intercord-server.vercel.app/api/teacher/${typeOfTestShowing}`;

         const data = await axios.get(searchUrl, {
            headers: {
               Authorization: `Bearer ${user.token}`,
            },
         });

         setLoading(false);
         setTests(data?.data?.[typeOfTestShowing]);
      } catch (error) {
         console.log(error);
         setLoading(false);
      }
   };

   // handling bookmark/unbookmark of test
   const handelBookmark = async (_id: string) => {
      setBookMarkLoading(true);
      const toastId = toast.loading('Updating...');
      try {
         const data = await axios.post(
            'https://intercord-server.vercel.app/api/student/bookmark',
            {
               testId: _id,
            },
            {
               headers: {
                  Authorization: `Bearer ${user.token}`,
               },
            }
         );
         setBookMarkLoading(false);
         toast.dismiss(toastId);

         // checking if test removed from bookmark or added
         if (data?.data?.message == 'Test Bookmark Succesfully')
            bookmarkUpdate(_id);
         else removeFromBookMark(_id);
      } catch (err) {
         console.log(err);
         setBookMarkLoading(false);
         toast.dismiss(toastId);
      }
   };

   useEffect(() => {
      if (fetchByField) fetchTestBasedOnField();
   }, [typeOfTestShowing]);
   return { tests, loading, handelBookmark, bookMarkLoading };
};

export default useTestsAsPerTime;
