/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { firstSectionAnimation } from '@/utils/Animation';
import { useUserDetails } from '@/utils/store';
import axios from 'axios';

type userType = {
   username: string;
   email: string;
   password: string;
   role: string;
};

// { username, email, password }

const Login = () => {
   const [loading, setLoading] = useState(false);
   const setUserDetails = useUserDetails((state) => state.setUserDetails);
   const user = useUserDetails((state) => state.user);
   const [userInfo, setUserInfo] = useState<userType>({
      username: '',
      email: '',
      password: '',
      role: 'student',
   });
   const navigate = useNavigate();

   // Handling login submit
   const submitHandler = async (
      e: React.FormEvent<HTMLButtonElement>
   ): Promise<void> => {
      e.preventDefault();

      try {
         let response;
         // checking user role and as per role hitting the api
         if (userInfo.role === 'student') {
            response = await axios.post(
               'https://intercord-server.vercel.app/api/student/login',
               {
                  username: userInfo.username,
                  email: userInfo.email,
                  password: userInfo.password,
               }
            );
         }
         if (userInfo.role === 'teacher') {
            response = await axios.post(
               'https://intercord-server.vercel.app/api/teacher/login',
               {
                  username: userInfo.username,
                  email: userInfo.email,
                  password: userInfo.password,
               }
            );
         }
         if (userInfo.role === 'admin') {
            response = await axios.post(
               'https://intercord-server.vercel.app/api/admin/login',
               {
                  username: userInfo.username,
                  email: userInfo.email,
                  password: userInfo.password,
               }
            );
         }

         console.log(response?.data);
         toast.success(response?.data?.message);

         //  get token from response.data.token
         // get user data from response.data.`user`
         if (userInfo.role == 'student') {
            setUserDetails({
               ...response?.data?.student,
               role: 'student',
               token: response?.data?.token,
            });
         } else if (userInfo.role == 'admin') {
            setUserDetails({
               ...response?.data?.admin,
               role: 'admin',
               token: response?.data?.token,
            });
         } else if (userInfo.role == 'teacher') {
            setUserDetails({
               ...response?.data?.teacher,
               role: 'teacher',
               token: response?.data?.token,
            });
         }

         navigate('/dashboard/account');
      } catch (err: any) {
         toast.error(err.response.data.message);
      }
   };

   // Calling Animation
   useEffect(() => {
      firstSectionAnimation();
   }, []);

   return (
      <div className='h-screen overflow-hidden containerBg py-20 w-full flex items-center justify-center'>
         <div className='flex justify-center py-20 items-center h-full italic font-bona font-semibold'>
            <form
               className='auth-page bg-white shadow-lg h-fit absolute z-10 w-[90%] sm:w-[30rem] px-2 md:px-6 py-12 flex flex-col gap-5 rounded-lg login
        '
            >
               <h1 className='text-[3rem] not-italic -mb-8'>Login</h1>
               <p className='tracking-wide text-muted-foreground font-medium text-[1rem]'>
                  Enter your username and password so u can start!
               </p>
               <div className='flex flex-col'>
                  <label htmlFor='username' className='text-xl tracking-wider'>
                     username<span className='text-red-600'>*</span>
                  </label>
                  <input
                     required
                     type='text'
                     id='username'
                     className='w-full py-2 px-2 border rounded-sm outline-1 outline-gray-600  transition-all duration-300 border-gray-300 text-black text-xl italic'
                     value={userInfo.username}
                     onChange={(e) => {
                        setUserInfo({
                           ...userInfo,
                           username: e.target.value,
                        });
                     }}
                  />
               </div>
               <div className='flex flex-col'>
                  <label htmlFor='username' className='text-xl tracking-wider'>
                     email<span className='text-red-600'>*</span>
                  </label>
                  <input
                     required
                     type='text'
                     id='username'
                     className='w-full py-2 px-2 border rounded-sm outline-1 outline-gray-600  transition-all duration-300 border-gray-300 text-black text-xl italic'
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
                  <label htmlFor='password' className='text-xl tracking-wider'>
                     Password<span className='text-red-600'>*</span>
                  </label>
                  <input
                     required
                     type='password'
                     id='password'
                     className='w-full px-2 py-2 border rounded-sm outline-1 outline-gray-600  transition-all duration-300 border-gray-300 text-black text-xl italic'
                     value={userInfo.password}
                     onChange={(e) => {
                        setUserInfo({
                           ...userInfo,
                           password: e.target.value,
                        });
                     }}
                  />
               </div>

               <select
                  onChange={(e) => {
                     setUserInfo({
                        ...userInfo,
                        role: e.target.value.toLowerCase(),
                     });
                  }}
                  className='mt-4 -mb-2 text-black w-[50%] px-1 rounded-sm text-xl tracking-wider italic'
               >
                  <option selected>Student</option>
                  <option>Teacher</option>
                  <option>Admin</option>
               </select>

               <p className='text-xl tracking-wider'>
                  Need an account?{' '}
                  <Link to={'/signup'} className='text-[#059CE8] underline'>
                     Sign up
                  </Link>{' '}
               </p>
               <button
                  disabled={loading}
                  type='submit'
                  className={`mt-4 tracking-wider w-full rounded-md text-xl italic py-2  duration-500 ${
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

export default Login;
