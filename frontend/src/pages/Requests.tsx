/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import RequestCard from '../components/RequestCard';
import axios from 'axios';
import { useUserDetails } from '@/utils/store';
import toast from 'react-hot-toast';

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
   const userInfo = useUserDetails((store) => store.user);
   const [allPendingStudents, setAllPendingStudents] =
      useState<PendingStudentType[]>();

   useEffect(() => {
      getAllPendingStudents();
   }, []);

   const handleAccept = async (username: string) => {
      try {
         const res = await axios.get(
            `http://localhost:3000/api/teacher/allow/${username}`,
            {
               headers: {
                  Authorization: `Bearer ${userInfo.token}`,
               },
            }
         );

         const filteredStudents = allPendingStudents?.filter(
            (student) => student.username !== username
         );
         setAllPendingStudents(filteredStudents);
         toast.success(res?.data?.message);
      } catch (e: any) {
         toast.error(e.response.data.message);
      }
   };

   const handleReject = async (username: string) => {
      try {
         const res = await axios.get(
            `http://localhost:3000/api/teacher/reject/${username}`,
            {
               headers: {
                  Authorization: `Bearer ${userInfo.token}`,
               },
            }
         );

         toast.success(res?.data?.message);
         const filteredStudents = allPendingStudents?.filter(
            (student) => student.username !== username
         );
         setAllPendingStudents(filteredStudents);
      } catch (e: any) {
         toast.error(e.response.data.message);
      }
   };

   const getAllPendingStudents = async () => {
      const res = await axios.get(
         'http://localhost:3000/api/teacher/allrequest',
         {
            headers: {
               Authorization: `Bearer ${userInfo.token}`,
            },
         }
      );

      res?.data?.allPendingStudents &&
         setAllPendingStudents(res?.data?.allPendingStudents);
      return;
   };

   return (
      <div className='w-full h-[100vh] max-sm:px-[1rem] sm:pl-[1.5rem] md:pl-[3rem] lg:pl-[6rem] pt-[2rem] overflow-y-scroll overflow-x-hidden py-8'>
         <h1 className='font-bona font-semibold text-[3rem] sm:text-[3.5rem] mb-4'>
            Requests
         </h1>
         <div>
            {allPendingStudents?.map((student, idx) => (
               <div className='w-[95%] h-full flex flex-col gap-4'>
                  <RequestCard
                     key={idx}
                     student={student}
                     handleReject={handleReject}
                     handleAccept={handleAccept}
                  />
               </div>
            ))}
         </div>
      </div>
   );
};

export default Requests;
