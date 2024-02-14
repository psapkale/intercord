import { useParams } from 'react-router-dom';
import GiveTest, { TestType } from './GiveTest';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserDetails } from '@/utils/store';
import { toast } from 'react-hot-toast';
import TestInfo from './TestInfo';

// type TestType = {
//    readonly _id: string;
//    subject: string;
//    description: string;
//    startDate: string;
//    endTime: string;
// };

const TestPageOutlet = () => {
   const user = useUserDetails((state) => state.user);
   const { testId } = useParams();
   const [test, setTest] = useState<TestType>();

   useEffect(() => {
      getTest();
   }, []);

   const currentDateTime = new Date();
   const options = {
      timeZone: 'Asia/Kolkata',
      // year: 'numeric',
      // month: '2-digit',
      // day: '2-digit',
      hour12: false,
   };
   const indianTime = currentDateTime.toLocaleString('en-US', options);
   const formattedDate = new Date(indianTime).toISOString().split('T')[0];

   const getTest = async () => {
      try {
         const res = await axios.get(
            `http://localhost:3000/api/student/test/${testId}`,
            {
               headers: {
                  Authorization: `Bearer ${user.token}`,
               },
            }
         );

         res?.data?.test && setTest(res?.data?.test);
      } catch (e: any) {
         toast.error(e?.response?.data?.message);
      }
   };

   if (!test) return;

   return test?.startDate === formattedDate &&
      indianTime.slice(11, 16) <= test?.endTime ? (
      <GiveTest test={test} />
   ) : (
      <TestInfo />
   );
};

export default TestPageOutlet;
