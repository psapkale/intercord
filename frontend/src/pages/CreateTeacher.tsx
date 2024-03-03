import { useUserDetails } from '@/utils/store';
import axios from 'axios';
import { AtSign, Mail } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const defaultTeacherValues = {
   name: '',
   email: '',
   password: '',
   stream: '',
   username: '',
};

type TeacherType = {
   username: string;
   name: string;
   email: string;
   password: string;
   stream: string;
};

const CreateTeacher = () => {
   const [teacherDetails, setTeacherDetails] = useState<TeacherType>({
      name: '',
      email: '',
      password: '',
      stream: '',
      username: '',
   });
   const { user } = useUserDetails();

   const handleCreateTeacher = async () => {
      if (
         !teacherDetails.email ||
         !teacherDetails.name ||
         !teacherDetails.password ||
         !teacherDetails.username ||
         !teacherDetails.stream
      ) {
         toast.error('Please fill all the fields');
         return;
      }

      // email validation
      if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(teacherDetails.email)) {
         toast.error('Enter valid email', {
            duration: 3000,
         });
         return;
      }

      // password validation
      if (
         !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
            teacherDetails.password
         )
      ) {
         toast.error(
            'Enter valid password, enter atleast 1 small char, 1 capital char and 1 number and password should be more than 8 digit',
            {
               duration: 3000,
            }
         );
         return;
      }

      try {
         const res = await axios.post(
            'http://localhost:3000/api/admin/create-teacher',
            {
               ...teacherDetails,
            },
            {
               headers: {
                  Authorization: `Bearer ${user.token}`,
               },
            }
         );

         toast.success(res?.data?.message);
         setTeacherDetails(defaultTeacherValues);
      } catch (err) {
         console.log('error in Create Teacher', err);
      }
   };
   return (
      <div className='w-full font-bona h-fit pl-[1.5rem] sm:pl-[2rem] md:pl-[6rem] pt-[2rem] overflow-y-scroll py-8'>
         <h1 className='text-[2.8rem] sm:text-5xl font-semibold max-md:mt-4'>
            Create Teachers
         </h1>
         <div className='grid italic md:grid-cols-2 xl:grid-cols-3 w-full gap-[1.5rem] max-md:grid-cols-1 mt-6'>
            {/* Fullname */}
            <div className='flex flex-col'>
               <label htmlFor='fn' className='font-semibold text-xl italic'>
                  Full Name
               </label>
               <input
                  type='text'
                  id='fn'
                  className='bg-gray-200 rounded-md py-2 text-black text-[16px] px-2 w-[90%] lg:w-[20rem] outline-none italic'
                  placeholder='Enter name...'
                  value={teacherDetails?.name}
                  onChange={(e) => {
                     setTeacherDetails({
                        ...teacherDetails,
                        name: e.target.value,
                     });
                  }}
               />
            </div>
            {/* email */}
            <div className='flex flex-col'>
               <label
                  htmlFor='email'
                  className='font-semibold flex items-center gap-1 italic text-xl font-bona'
               >
                  Email <Mail className='size-5' />
               </label>
               <input
                  type='email'
                  id='email'
                  className='bg-gray-200 rounded-md py-2 text-black text-[16px] px-2 font-[400] w-[90%] lg:w-[20rem] outline-none italic'
                  placeholder='Enter email...'
                  value={teacherDetails?.email}
                  onChange={(e) => {
                     setTeacherDetails({
                        ...teacherDetails,
                        email: e.target.value,
                     });
                  }}
               />
            </div>
            {/* username */}
            <div className='flex flex-col'>
               <label
                  htmlFor='email'
                  className='font-semibold italic text-xl flex items-center font-bona'
               >
                  <AtSign className='size-5' /> username
               </label>
               <input
                  type='email'
                  id='email'
                  className='bg-gray-200 rounded-md italic py-2 text-black text-[16px] px-2 font-[400] w-[90%] lg:w-[20rem] outline-none'
                  placeholder='Enter username...'
                  value={teacherDetails?.username}
                  onChange={(e) => {
                     setTeacherDetails({
                        ...teacherDetails,
                        username: e.target.value,
                     });
                  }}
               />
            </div>
            {/* password */}
            <div className='flex flex-col'>
               <label
                  htmlFor='pass'
                  className='font-semibold text-xl font-bona'
               >
                  Password
               </label>
               <input
                  type='email'
                  id='pass'
                  className='bg-gray-200 rounded-md py-2 text-black text-[16px] px-2 font-[400] w-[90%] lg:w-[20rem] outline-none italic'
                  placeholder='Enter password...'
                  value={teacherDetails?.password}
                  onChange={(e) => {
                     setTeacherDetails({
                        ...teacherDetails,
                        password: e.target.value,
                     });
                  }}
               />
            </div>
            {/* Drop Down */}
            <div className='flex flex-col'>
               <label
                  htmlFor='stream'
                  className='font-semibold text-xl font-bona'
               >
                  Stream
               </label>
               <select
                  id='stream'
                  className='italic py-2 outline-none border rounded-md w-[90%] lg:w-[20rem]'
                  onChange={(e) => {
                     setTeacherDetails({
                        ...teacherDetails,
                        stream: e.target.value.toLowerCase(),
                     });
                  }}
                  value={teacherDetails?.stream}
               >
                  <option value='bcs' defaultChecked>
                     BCS
                  </option>
                  <option value='bca' defaultChecked>
                     BCA
                  </option>
                  <option value='bcom' defaultChecked>
                     BCOM
                  </option>
               </select>
            </div>
         </div>
         <button
            className='w-[10rem] mt-8 rounded-md tracking-wider text-xl font-medium border border-black hover:bg-white hover:text-black transition-all duration-300 font-bona py-2 bg-[#0F0F0F] text-white flex justify-center items-center gap-2 italic'
            onClick={handleCreateTeacher}
         >
            Create Teacher
         </button>
      </div>
   );
};

export default CreateTeacher;
