/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import SearchCard from '@/components/StudentSearchCard';
import { StudentType } from '@/components/StudentSearchCard';
import { useUserDetails } from '@/utils/store';
import axios from 'axios';
import { Search, UserRoundSearch } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const Students = () => {
   const [searchName, setSearchName] = useState('');
   const [allStudents, setAllStudents] = useState<StudentType[]>([]);
   const [student, setStudent] = useState<StudentType>();
   const { user } = useUserDetails();

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      try {
         const searchUrl =
            user.role === 'admin'
               ? `http://localhost:3000/api/search/teacher/${searchName}`
               : user.role === 'teacher'
               ? `http://localhost:3000/api/teacher/search/student/${searchName}`
               : `http://localhost:3000/api/student/search/student/${searchName}`;

         const res = await axios(searchUrl, {
            headers: {
               Authorization: `Bearer ${user.token}`,
            },
         });

         res?.data?.student && setStudent(res?.data?.student);
      } catch (e: any) {
         toast.error(e?.response?.data?.message);
         setSearchName('');
      }
   };

   useEffect(() => {
      getAllStudents();
   }, []);

   useEffect(() => {
      setStudent(undefined);
   }, [searchName]);

   // getting all students
   const getAllStudents = async () => {
      const searchUrl =
         user.role === 'admin'
            ? 'http://localhost:3000/api/search/teacher/all'
            : user.role === 'teacher'
            ? 'http://localhost:3000/api/teacher/search/student/all'
            : 'http://localhost:3000/api/student/search/student/all';

      const res = await axios.get(searchUrl, {
         headers: {
            Authorization: `Bearer ${user.token}`,
         },
      });

      setAllStudents(res?.data?.allStudents);
   };

   return (
      <div className='w-full flex flex-col h-[100vh] md:pt-[2rem] overflow-scroll py-8'>
         <div className='w-full flex justify-start md:justify-center flex-col items-center gap-4'>
            <div className='flex flex-col items-center'>
               <h1 className='text-5xl font-bold uppercase flex items-center gap-2'>
                  Search For Student
                  <UserRoundSearch className='size-[2rem] mt-1' />
               </h1>
               <p>(Search student by the names!)</p>
            </div>
            <form
               onSubmit={handleSubmit}
               className='flex items-center w-[50%] justify-between px-2 py-2 bg-gray-100 rounded-md'
            >
               <input
                  type='text'
                  placeholder='Search student by Name'
                  className='outline-none border-none bg-gray-100 font-semibold placeholder:font-normal'
                  value={searchName}
                  onChange={(e) => {
                     setSearchName(e.target.value);
                  }}
               />
               <Search
                  className='size-[1.3rem] cursor-pointer'
                  onClick={handleSubmit}
               />
            </form>
         </div>
         <div className='w-full h-fit flex flex-col px-[2rem] md:items-center pt-14 gap-4 mb-10'>
            {student ? (
               <SearchCard
                  key={student?.email}
                  role='student'
                  name={student?.name}
                  username={student?.username}
               />
            ) : searchName?.length === 0 ? (
               allStudents?.map((student) => (
                  <SearchCard
                     key={student?.email}
                     role='student'
                     name={student?.name}
                     username={student?.username}
                  />
               ))
            ) : (
               <h1>Press Enter to search</h1>
            )}
         </div>
      </div>
   );
};

export default Students;
