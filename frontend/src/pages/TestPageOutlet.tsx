/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams } from 'react-router-dom';
import GiveTest, { SubmissionType, TestType } from './GiveTest';
import { useEffect, useState } from 'react';
import axios from 'axios';
import doneImg from './../assets/done1.jpg';
import { useUserDetails } from '@/utils/store';
import { toast } from 'react-hot-toast';
import TestInfo from '@/components/TestInfo';

const TestPageOutlet = () => {
   const user = useUserDetails((state) => state.user);
   const { testId } = useParams();
   const [test, setTest] = useState<TestType>();
   const [creator, setCreator] = useState<string>('');
   const [sortedSubmissions, setSortedSubmissions] = useState<SubmissionType[]>(
      []
   );

   console.log(user.token);

   useEffect(() => {
      getTest();
   }, []);

   const currentDateTime = new Date();
   const options = {
      timeZone: 'Asia/Kolkata',
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
         res?.data?.creator && setCreator(res?.data?.creator);
         res?.data?.sortedSubmissions &&
            setSortedSubmissions(res?.data?.sortedSubmissions);
      } catch (e: any) {
         toast.error(e?.response?.data?.message);
      }
   };

   return !test ? (
      <div className='w-full h-full flex flex-col items-center justify-start'>
         <img src={doneImg} className='w-1/2 h-4/5' />
         <h1 className='w-full text-center text-lg font-[400] font-bona'>
            Review older tests{' '}
            <Link className='underline' to={'/dashboard/test'}>
               here
            </Link>
         </h1>
      </div>
   ) : user.role === 'student' &&
     test?.startDate === formattedDate &&
     indianTime.slice(10, 15) <= test?.endTime ? (
      <GiveTest test={test} />
   ) : (
      <TestInfo
         test={test}
         creator={creator}
         sortedSubmissions={sortedSubmissions}
      />
   );
};

export default TestPageOutlet;
