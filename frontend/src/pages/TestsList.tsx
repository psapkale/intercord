import { TestSkeleton } from '@/components/PrimeSkeleton';
import TestDemoCard from '@/components/TestDemoCard';
import useTestsAsPerTime from '@/hook/useTestsAsPerTime';
import { callTestDriver } from '@/utils/driver';
import { useUserDetails } from '@/utils/store';
import { ArrowUpLeftFromCircle, Timer, X } from 'lucide-react';
import { useState } from 'react';

const TestsList = () => {
   const [typeOfTestShowing, setTypeOfTestShowing] = useState<string>('live');
   const { user } = useUserDetails();
   const updateTutorial = useUserDetails((state) => state.updateTutorial);

   if (user.isSignedUp && user.testDriverJs) {
      updateTutorial('testDriverJs');
      callTestDriver();
   }

   // custome hook which will provide me tests according to selected from -> upcoming, live and Closed!
   const { loading, tests, handelBookmark } =
      useTestsAsPerTime(typeOfTestShowing);

   return (
      <div className='w-full h-full pl-[2rem] lg:pl-[6rem] pt-[2rem] pr-[1rem] sm:pr-[2rem] flex flex-col gap-4'>
         <div className='flex mt-4 pl-1 gap-4'>
            <button
               className={`flex items-center hover:bg-gray-300 transition-colors duration-300 py-1 px-2 rounded-md gap-1 font-mono font-bold text-xs md:text-xl md:text-lg-+ ${
                  typeOfTestShowing === 'upcoming'
                     ? 'bg-gray-300 shadow-md'
                     : 'bg-gray-200'
               } ${loading && 'cursor-not-allowed'}`}
               onClick={() => {
                  setTypeOfTestShowing('upcoming');
               }}
               disabled={loading}
            >
               Up Coming <Timer className='mb-1 size-5' />
            </button>
            <button
               className={`flex items-center hover:bg-gray-300 transition-colors duration-300 py-1 px-2 rounded-md gap-1 font-mono font-bold text-xl sm:text-xl ${
                  typeOfTestShowing === 'live'
                     ? 'bg-gray-300 shadow-md'
                     : 'bg-gray-200'
               } ${loading && 'cursor-not-allowed'}`}
               disabled={loading}
               onClick={() => {
                  setTypeOfTestShowing('live');
               }}
            >
               Live{' '}
               <ArrowUpLeftFromCircle
                  className='mb-1 size-4'
                  strokeWidth={2.5}
               />
            </button>
            <button
               className={`flex items-center hover:bg-gray-300 transition-colors duration-300 py-1 px-2 rounded-md gap-1 font-mono text-xl sm:text-xl font-bold ${
                  typeOfTestShowing === 'closed'
                     ? 'bg-gray-300 shadow-md'
                     : 'bg-gray-200'
               } ${loading && 'cursor-not-allowed'}`}
               disabled={loading}
               onClick={() => {
                  setTypeOfTestShowing('closed');
               }}
            >
               Closed <X strokeWidth={2.75} className='mb-1 size-5' />
            </button>
         </div>

         <div className='h-full w-full grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 grid md:grid-cols-4 gap-4'>
            {loading ? (
               <TestSkeleton />
            ) : (
               <>
                  {tests?.map((testt, idx) => {
                     return (
                        <TestDemoCard
                           _id={testt?._id}
                           startDate={testt?.startDate}
                           time={testt?.time}
                           testName={testt?.subject}
                           description={testt?.description}
                           typeOfTestShowing={typeOfTestShowing}
                           handelBookmark={handelBookmark}
                           key={idx}
                        />
                     );
                  })}
               </>
            )}
         </div>
      </div>
   );
};

export default TestsList;
