import { useParams } from 'react-router-dom';
import GiveTest from './GiveTest';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserDetails } from '@/utils/store';
import { toast } from 'react-hot-toast';

const TestPageOutlet = () => {
   const user = useUserDetails((state) => state.user);
   const { testId } = useParams();
   const [test, setTest] = useState();

   useEffect(() => {
      getTest();
   }, []);

   console.log(test);

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

         setTest(res?.data?.test);
      } catch (e: any) {
         toast.error(e?.response?.data?.message);
      }
   };

   return <GiveTest />;
};

export default TestPageOutlet;
