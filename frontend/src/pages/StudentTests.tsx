import StudentTestCard from '@/components/StudentTestCard';
import { useUserDetails } from '@/utils/store';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export type StudentSubmissionType = {
   test: string;
   testTitle: string;
   subject: string;
   submittedAnswersIndex: number[];
   marksObtained: number;
   submittedAt: Date;
};

const StudentTests = () => {
   const userInfo = useUserDetails((store) => store.user);

   const [allMySubmissions, setAllMySubmissions] = useState<
      StudentSubmissionType[]
   >([]);

   useEffect(() => {
      getAllMySubmissions();
   }, []);

   const getAllMySubmissions = async () => {
      try {
         const res = await axios.get(
            `http://localhost:3000/api/student/mytests`,
            {
               headers: {
                  Authorization: `Bearer ${userInfo.token}`,
               },
            }
         );

         res?.data?.submissions && setAllMySubmissions(res?.data?.submissions);
         return;
      } catch (e: any) {
         toast.error(e?.response?.data?.message);
      }
   };

   return (
      <div className='w-[90%] h-full pl-[6rem] pt-[2rem] flex flex-col'>
         <h1 className='font-bona font-semibold text-[1rem] sm:text-[3rem]'>
            My Tests
         </h1>
         {/* test submission */}
         <div className='w-full h-fit mt-6 p-2 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 grid md:grid-cols-4 gap-4'>
            {allMySubmissions?.map((submission, idx) => (
               <StudentTestCard key={idx} submission={submission} />
            ))}
         </div>
      </div>
   );
};

export default StudentTests;
