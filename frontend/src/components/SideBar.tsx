import { useUserDetails } from '@/utils/store';
import {
   BellRing,
   Bookmark,
   CircleUserRound,
   ClipboardList,
   LogOut,
   Pen,
   PlusCircle,
   Search,
} from 'lucide-react';
import { useState } from 'react';
import { MdOutlinePeopleOutline } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

const SideBar = ({
   isOpen,
   setIsOpen,
   RemoveActive,
}: {
   isOpen: boolean;
   setIsOpen: (val: boolean) => void;
   RemoveActive: () => void;
}) => {
   const location = useLocation();
   const logoutHandler = useUserDetails((state) => state.logoutUser);
   const { user } = useUserDetails();
   const [showSearchOptions, setShowSearchOptions] = useState(false);

   const handleOnClick = () => {
      setIsOpen(false);
   };

   return (
      <>
         <div
            className={`w-full md:w-[40%] lg:w-[25%] xl:w-[20%] z-20 rounded-sm border absolute h-full transition-all duration-300 bg-white shadow-lg ${
               !isOpen ? '-translate-x-[100%]' : ''
            }`}
            id='sidebar'
         >
            <div className='flex justify-center border-b  items-center py-2'>
               <h1 className='text-center font-bold text-2xl flex items-center gap-2 mt-1'>
                  <span className='font-zyada'>MCQ.</span>{' '}
               </h1>
            </div>
            <div className='h-full flex flex-col'>
               <div className='w-full flex flex-col mt-4'>
                  <Link
                     to='/dashboard/account'
                     className={`flex rounded-md items-center gap-2 py-2 w-full hover:bg-[#F7F7F8] pl-4 transition-all duration-200 hover:text-black 
                  ${
                     location.pathname == '/dashboard/account'
                        ? 'text-black bg-[#ebeaea]'
                        : 'text-gray-600'
                  }`}
                     onClick={() => {
                        RemoveActive();
                        handleOnClick();
                     }}
                     id='account'
                  >
                     <CircleUserRound className='w-5' />
                     <p>Account</p>
                  </Link>
                  <Link
                     to='/dashboard/leaderboard'
                     className={`flex rounded-md items-center gap-2 py-2 w-full hover:bg-[#F7F7F8] pl-4 transition-all duration-200 hover:text-black 
                  ${
                     location.pathname == '/dashboard/leaderboard'
                        ? 'text-black bg-[#ebeaea]'
                        : 'text-gray-600'
                  }`}
                     onClick={() => {
                        RemoveActive();
                        handleOnClick();
                     }}
                     id='leaderboard'
                  >
                     <ClipboardList className='w-5' />
                     <p>Leaderboard</p>
                  </Link>
                  <Link
                     to='/dashboard/test'
                     className={`flex rounded-md items-center gap-2 py-2 w-full hover:bg-[#F7F7F8] pl-4 transition-all duration-200 hover:text-black 
                  ${
                     location.pathname == '/dashboard/test'
                        ? 'text-black bg-[#ebeaea]'
                        : 'text-gray-600'
                  }`}
                     onClick={() => {
                        RemoveActive();
                        handleOnClick();
                     }}
                     id='tests'
                  >
                     <Pen className='w-4' />
                     <p>Tests</p>
                  </Link>
                  <div
                     className={`flex rounded-md items-start gap-2 py-2 w-full hover:bg-[#F7F7F8] pl-4 transition-all duration-200 hover:text-black 
                  ${
                     location.pathname == 'search/student' || 'search/teacher'
                        ? 'text-black bg-[#ebeaea]'
                        : 'text-gray-600'
                  } cursor-pointer`}
                     onClick={() => {
                        setShowSearchOptions((prev) => !prev);
                     }}
                     id='search'
                  >
                     <Search className='w-4' />
                     <p>Search</p>
                  </div>
                  {showSearchOptions && (
                     <div className='flex flex-col'>
                        <Link
                           to={'/dashboard/search/student'}
                           className={`pl-16 py-2 w-full hover:bg-[#F7F7F8] transition-all duration-200 hover:text-black 
                           ${
                              location.pathname == '/dashboard/search/student'
                                 ? 'text-black bg-[#ebeaea]'
                                 : 'text-gray-600'
                           } cursor-pointer`}
                           onClick={() => {
                              RemoveActive();
                              handleOnClick();
                           }}
                        >
                           Student
                        </Link>
                        <Link
                           to={'/dashboard/search/teacher'}
                           className={`pl-16 py-2 w-full hover:bg-[#F7F7F8] transition-all duration-200 hover:text-black 
                           ${
                              location.pathname == '/dashboard/search/teacher'
                                 ? 'text-black bg-[#ebeaea]'
                                 : 'text-gray-600'
                           } cursor-pointer`}
                           onClick={() => {
                              RemoveActive();
                              handleOnClick();
                           }}
                        >
                           Teacher
                        </Link>
                     </div>
                  )}
                  <Link
                     to='/dashboard/announcment'
                     className={`flex rounded-md relative items-center gap-2 py-2 w-full hover:bg-[#F7F7F8] pl-4 transition-all duration-200 hover:text-black 
                  ${
                     location.pathname == '/dashboard/announcment'
                        ? 'text-black bg-[#ebeaea]'
                        : 'text-gray-600'
                  }`}
                     onClick={() => {
                        RemoveActive();
                        handleOnClick();
                     }}
                     id='announcment'
                  >
                     {user.announcements?.filter((val) => val.seen == false)
                        .length > 0 && (
                        <div className='absolute bg-red-600 h-3 w-3 text-white rounded-full flex justify-center items-center top-2 left-6'>
                           {' '}
                           <p className='text-[0.6rem]'>
                              {
                                 user.announcements.filter(
                                    (val) => val.seen == false
                                 ).length
                              }
                           </p>
                        </div>
                     )}
                     <BellRing className='w-4 mt-[3px]' />
                     <p>Announcment</p>
                  </Link>
                  <Link
                     to='/dashboard/bookmark'
                     className={`flex rounded-md items-center gap-2 py-2 w-full hover:bg-[#F7F7F8] pl-4 transition-all duration-200 hover:text-black 
                  ${
                     location.pathname == '/dashboard/bookmark'
                        ? 'text-black bg-[#ebeaea]'
                        : 'text-gray-600'
                  }`}
                     onClick={() => {
                        RemoveActive();
                        handleOnClick();
                     }}
                     id='bookmark'
                  >
                     <Bookmark className='w-4' />
                     <p>Bookmark</p>
                  </Link>
                  {user.role == 'teacher' && (
                     <Link
                        to='/dashboard/createtest'
                        className={`flex rounded-md items-center gap-2 py-2 w-full hover:bg-[#F7F7F8] pl-4 transition-all duration-200 hover:text-black 
            ${
               location.pathname == '/dashboard/createtest'
                  ? 'text-black bg-[#ebeaea]'
                  : 'text-gray-600'
            }`}
                        onClick={() => {
                           RemoveActive();
                           handleOnClick();
                        }}
                     >
                        <PlusCircle className='w-4' />
                        <p>Create Test</p>
                     </Link>
                  )}
                  {user.role == 'admin' && (
                     <Link
                        to='/dashboard/teachers'
                        className={`flex rounded-md items-center gap-2 py-2 w-full hover:bg-[#F7F7F8] pl-4 transition-all duration-200 hover:text-black 
                  ${
                     location.pathname == '/dashboard/teachers'
                        ? 'text-black bg-[#ebeaea]'
                        : 'text-gray-600'
                  }`}
                        onClick={() => {
                           RemoveActive();
                           handleOnClick();
                        }}
                        id='tests'
                     >
                        <MdOutlinePeopleOutline className='scale-150' />
                        <p>Teachers</p>
                     </Link>
                  )}
               </div>
               <Link to={'/'} onClick={logoutHandler}>
                  <button
                     id='logoutacc'
                     className='flex items-center gap-2 py-1 w-full hover:bg-[#efefef] transition-all rounded-md duration-300 text-gray-600 hover:text-black absolute bottom-2 pl-[35%]'
                  >
                     Logout
                     <LogOut className='w-4 mt-1' />
                  </button>
               </Link>
            </div>
         </div>
         {isOpen && (
            <div
               className='w-full h-full absolute bg-black opacity-[0.5] z-10'
               onClick={() => {
                  RemoveActive();
                  handleOnClick();
               }}
            ></div>
         )}
      </>
   );
};

export default SideBar;
