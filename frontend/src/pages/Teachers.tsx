/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StudentType } from '@/components/StudentSearchCard';
import axios from 'axios';
import { Search, UserRoundSearch } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { TeacherType } from './TeacherProfile';
import SearchCard from '@/components/StudentSearchCard';
import { useUserDetails } from '@/utils/store';

const Teachers = () => {
   const [searchName, setSearchName] = useState('');
   const [allTeachers, setAllTeachers] = useState<StudentType[]>([]);
   const [teacher, setTeacher] = useState<TeacherType>();
   const { user } = useUserDetails();

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      try {
         const searchUrl =
            user.role === 'admin'
               ? `http://localhost:3000/api/search/teacher/${searchName}`
               : user.role === 'student'
               ? `http://localhost:3000/api/student/search/teacher/${searchName}`
               : `http://localhost:3000/api/teacher/search/teacher/${searchName}`;

         const res = await axios(searchUrl, {
            headers: {
               Authorization: `Bearer ${user.token}`,
            },
         });

         res?.data?.teacher && setTeacher(res?.data?.teacher);
      } catch (e: any) {
         toast.error(e?.response?.data?.message);
         setSearchName('');
      }
   };

   useEffect(() => {
      getAllTeachers();
   }, []);

   useEffect(() => {
      setTeacher(undefined);
   }, [searchName]);

   // getting all students
   const getAllTeachers = async () => {
      const searchUrl =
         user.role === 'admin'
            ? 'http://localhost:3000/api/search/teacher/all'
            : user.role === 'student'
            ? 'http://localhost:3000/api/student/search/teacher/all'
            : 'http://localhost:3000/api/teacher/search/teacher/all';

      const res = await axios.get(searchUrl, {
         headers: {
            Authorization: `Bearer ${user.token}`,
         },
      });

      setAllTeachers(res?.data?.allTeachers);
   };

   return (
      <div className='w-full flex flex-col h-[100vh] md:pt-[2rem] overflow-scroll py-8'>
         <div className='w-full flex justify-start md:justify-center flex-col items-center gap-4'>
            <div className='flex flex-col items-center'>
               <h1 className='text-5xl font-bold uppercase flex items-center gap-2'>
                  Search For Teachers
                  <UserRoundSearch className='size-[2rem] mt-1' />
               </h1>
               <p>(Search teachers by the names!)</p>
            </div>
            <form
               onSubmit={handleSubmit}
               className='flex items-center w-[50%] justify-between px-2 py-2 bg-gray-100 rounded-md'
            >
               <input
                  type='text'
                  placeholder='Search teachers by username'
                  className='w-full outline-none border-none bg-gray-100 font-semibold placeholder:font-normal'
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
            {teacher ? (
               <SearchCard
                  key={teacher?.email}
                  role='teacher'
                  name={teacher?.name}
                  username={teacher?.username}
               />
            ) : searchName?.length === 0 ? (
               allTeachers?.map((teacher) => (
                  <SearchCard
                     key={teacher?.email}
                     role='teacher'
                     name={teacher?.name}
                     username={teacher?.username}
                  />
               ))
            ) : (
               <h1>Press Enter to search</h1>
            )}
         </div>
      </div>
   );
};

export default Teachers;
