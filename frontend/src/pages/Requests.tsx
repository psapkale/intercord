import { useEffect, useState } from 'react';
import RequestCard from '../components/RequestCard';
import axios from 'axios';
import { useUserDetails } from '@/utils/store';

export type PendingStudentType = {
   username: string;
   name: string;
   email: string;
   password: string;
   academicYear: string;
   stream: string;
   pursuingYear: 'I' | 'II' | 'III';
};

const Requests = () => {
   const user = useUserDetails((store) => store.user);
   const [allPendingStudents, setAllPendingStudents] =
      useState<PendingStudentType[]>();

   useEffect(() => {
      getAllPendingStudents();
   }, []);

   console.log(allPendingStudents);

   const getAllPendingStudents = async () => {
      const res = await axios.get(
         'http://localhost:3000/api/teacher/allrequest',
         {
            headers: {
               Authorization: `Bearer ${user.token}`,
            },
         }
      );

      res?.data?.allPendingStudents &&
         setAllPendingStudents(res?.data?.allPendingStudents);
      return;
   };

   return (
      <div className='w-full h-[100vh] max-sm:px-[1rem] sm:pl-[1.5rem] md:pl-[3rem] lg:pl-[6rem] pt-[2rem] overflow-y-scroll overflow-x-hidden py-8'>
         <h1 className='font-mono font-semibold text-[3rem] sm:text-[3.5rem] mb-4'>
            Requests
         </h1>
         <div>
            {allPendingStudents?.map((student, idx) => (
               <div className='w-[95%] h-full flex flex-col gap-4'>
                  <RequestCard key={idx} student={student} />
                  <RequestCard key={idx} student={student} />
                  <RequestCard key={idx} student={student} />
               </div>
            ))}
         </div>
      </div>
   );
};

export default Requests;
