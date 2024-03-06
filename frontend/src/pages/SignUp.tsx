/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { firstSectionAnimation } from '@/utils/Animation';
import axios from 'axios';

//! user type
type UserType = {
   username: string;
   name: string;
   password: string;
   email: string;
   academicYear: string;
   stream: string;
   pursuingYear: string;
   linkedinUrl?: string;
   githubUrl?: string;
   twitterUrl?: string;
};

//! default userInfo
const defaultUserInfo: UserType = {
   academicYear: '',
   email: '',
   name: '',
   password: '',
   pursuingYear: '',
   stream: 'bcs',
   username: '',
};

const SignUp = () => {
   const [userInfo, setUserInfo] = useState<UserType>(defaultUserInfo);
   const [loading, setLoading] = useState(false);

   //! Handling Signup
   const submitHandler = async (
      e: React.FormEvent<HTMLButtonElement>
   ): Promise<void> => {
      e.preventDefault();

      //! email validation
      if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userInfo.email)) {
         toast.error('Enter valid email', {
            duration: 3000,
         });
         return;
      }

      //! password validation
      if (
         !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
            userInfo.password
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

      console.log(userInfo);

      // ? signup-request
      try {
         setLoading(true);
         const response = await axios.post(
            'http://localhost:3000/api/student/signup',
            {
               name: userInfo.name,
               email: userInfo.email,
               username: userInfo.username,
               password: userInfo.password,
               academicYear: userInfo.academicYear,
               stream: userInfo.stream,
               pursuingYear: userInfo.pursuingYear,
            }
         );

         toast.success(response.data.message, {
            duration: 3000,
         });

         setUserInfo(defaultUserInfo);
         setLoading(false);
      } catch (err: any) {
         toast.error(err.response.data.message);
         setLoading(false);
      }
   };

   // Calling Animation
   useEffect(() => {
      firstSectionAnimation();
   }, []);

   return (
      <div className='py-10 w-full flex items-center justify-center containerBg'>
         <div className='flex justify-center py-20! items-center font-bona italic font-semibold'>
            <form
               className='w-[90%] sm:w-[30rem] bg-white px-2 md:px-8 rounded-md py-8 shadow-lg flex flex-col gap-5
        '
            >
               <div>
                  <h1 className='text-[3rem] not-italic'>SignUp</h1>
                  <p className='tracking-wide font-medium text-[1.1rem] text-muted-foreground'>
                     Enter your username and password so u can start!
                  </p>
               </div>
               {/* Fullname */}
               <div className='flex flex-col'>
                  <label htmlFor='fullname' className='text-xl '>
                     Fullname<span className='text-red-600'>*</span>
                  </label>
                  <input
                     required
                     type='text'
                     id='fullname'
                     className='w-full py-2 px-2 border rounded-sm outline-1 outline-gray-600  transition-all duration-300 border-gray-300 text-black text-xl italic'
                     value={userInfo.name}
                     onChange={(e) => {
                        setUserInfo({
                           ...userInfo,
                           name: e.target.value,
                        });
                     }}
                  />
               </div>

               {/* Email and username */}
               <div className='flex flex-col gap-1'>
                  <label htmlFor='email' className='text-xl '>
                     email<span className='text-red-600'>*</span>
                  </label>
                  <input
                     required
                     type='email'
                     id='email'
                     className='w-full px-2 py-2 border rounded-sm outline-1 outline-gray-600  transition-all duration-300 border-gray-300 text-black text-[1.2rem] italic'
                     value={userInfo.email}
                     onChange={(e) => {
                        setUserInfo({
                           ...userInfo,
                           email: e.target.value,
                        });
                     }}
                  />
               </div>
               <div className='flex flex-col gap-1'>
                  <label htmlFor='username' className='text-xl '>
                     username<span className='text-red-600'>*</span>
                  </label>
                  <input
                     required
                     type='text'
                     id='username'
                     className='w-full px-2 py-2 border rounded-sm outline-1 outline-gray-600  transition-all duration-300 border-gray-300 text-black text-[1.2rem] italic'
                     value={userInfo.username}
                     onChange={(e) => {
                        setUserInfo({
                           ...userInfo,
                           username: e.target.value,
                        });
                     }}
                  />
               </div>

               {/* Academic data */}
               <div className='flex flex-col gap-1'>
                  <label htmlFor='username' className='text-xl '>
                     academic year<span className='text-red-600'>*</span>
                  </label>
                  <input
                     required
                     type='text'
                     id='academic year'
                     className='w-full px-2 py-2 border rounded-sm outline-1 outline-gray-600  transition-all duration-300 border-gray-300 text-black text-[1.2rem] italic'
                     value={userInfo.academicYear}
                     onChange={(e) => {
                        setUserInfo({
                           ...userInfo,
                           academicYear: e.target.value,
                        });
                     }}
                  />
               </div>

               {/* Pursuing year */}
               <div className='flex flex-col gap-1'>
                  <label htmlFor='username' className='text-xl '>
                     pursuing year<span className='text-red-600'>*</span> (I,
                     II, III)
                  </label>
                  {/* <input
                     required
                     type='text'
                     id='username'
                     className='w-full px-2 py-2 border rounded-sm outline-1 outline-gray-600  transition-all duration-300 border-gray-300 text-black text-[1.2rem] italic'
                     value={userInfo.pursuingYear}
                     onChange={(e) => {
                        setUserInfo({
                           ...userInfo,
                           pursuingYear: e.target.value,
                        });
                     }}
                  /> */}
                  <select
                     className='mt-4 -mb-2 text-black w-[50%] px-1 rounded-sm text-xl tracking-wider italic'
                     onChange={(e) => {
                        const val = e.target.value;
                        if (val == 'I' || val == 'II' || val == 'III') {
                           setUserInfo({
                              ...userInfo,
                              pursuingYear: e.target.value.toUpperCase(),
                           });
                        }
                     }}
                  >
                     <option value='I'>I</option>
                     <option value='II'>II</option>
                     <option value='III'>III</option>
                  </select>
               </div>

               {/* Password */}
               <div className='flex flex-col gap-1'>
                  <label htmlFor='password' className='text-xl'>
                     Password<span className='text-red-600'>*</span>
                  </label>
                  <input
                     required
                     type='text'
                     id='password'
                     className='w-full px-2 py-2 border rounded-sm outline-1 outline-gray-600  transition-all duration-300 border-gray-300 text-black text-[1.2rem] italic'
                     value={userInfo.password}
                     onChange={(e) => {
                        setUserInfo({
                           ...userInfo,
                           password: e.target.value,
                        });
                     }}
                  />
               </div>

               {/* Stream */}
               <select
                  onChange={(e) => {
                     setUserInfo({
                        ...userInfo,
                        stream: e.target.value.toUpperCase(),
                     });
                  }}
                  className='mt-4 -mb-2 text-black w-[50%] px-1 rounded-sm text-xl tracking-wider italic'
               >
                  <option selected>BCS</option>
                  <option>BCA</option>
                  <option>BTECH</option>
                  <option>BCOM</option>
               </select>

               <p className='text-xl mt-4'>
                  Already have a account?{' '}
                  <Link to={'/login'} className='text-[#059CE8] underline'>
                     login
                  </Link>{' '}
               </p>
               <button
                  disabled={loading}
                  type='submit'
                  className={`mt-4 tracking-wider w-full rounded-md text-xl py-2 italic duration-500 ${
                     loading
                        ? 'bg-white text-black cursor-not-allowed'
                        : 'bg-[#313338] hover:bg-[#27292c] transition-all text-white'
                  }`}
                  onClick={submitHandler}
               >
                  Continue
               </button>
            </form>
         </div>
      </div>
   );
};

export default SignUp;
