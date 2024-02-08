import { useState } from 'react';

const TestPage = () => {
   const [current, setCurrent] = useState(1);

   const handlePrev = () => {
      current !== 1 && setCurrent((c) => c - 1);
   };

   const handleNext = () => {
      current !== 10 && setCurrent((c) => c + 1);
   };

   return (
      <div className='w-full h-full pl-[6rem] pt-[2rem]'>
         {/* Header */}
         <div className='w-[96%] flex items-center justify-between'>
            <h1 className='text-5xl font-bold font-mono'>Test</h1>
            <button className='hover:bg-white hover:text-black border-black transition-all duration-300 p-0.5 px-8  text-center bg-[#0f0f0f] text-white rounded-md text-xl'>
               Submit
            </button>
         </div>
         {/* Progress */}
         <div className='mt-10 text-lg font-bold font-mono'>
            <div>Question {current} of 10</div>
         </div>
         {/* Question */}
         <div className='py-2 my-2 flex flex-col gap-6'>
            <div className='h-[30%] text-lg font-bold font-mono my-2'>
               Lorem ipsum dolor sit amet consectetur, adipisicing elit.
               Suscipit, sint! Lorem, ipsum dolor sit amet consectetur
               adipisicing elit. Dicta placeat asperiores est, magnam error
               deserunt dolores voluptates quidem repudiandae omnis saepe.
               Suscipit quasi esse natus nulla exercitationem atque possimus aut
               ullam cupiditate placeat. Sunt.
            </div>
            {/* options */}
            <div className='w-[90%] h-[70%] grid grid-cols-1 gap-4 '>
               <button className='h-fit p-2 text-start hover:bg-green-500 border-black transition-all duration-300 border bg-white text-black rounded-md text-[15px] font-bold font-mono cursor-pointer'>
                  option1 Lorem ipsum, dolor sit amet consectetur adipisicing
                  elit. Accusantium, est.
               </button>
               <button className='h-fit p-2 text-start hover:bg-green-500 border-black transition-all duration-300 border bg-white text-black rounded-md text-[15px] font-bold font-mono cursor-pointer'>
                  option2
               </button>
               <button className='h-fit p-2 text-start hover:bg-green-500 border-black transition-all duration-300 border bg-white text-black rounded-md text-[15px] font-bold font-mono cursor-pointer'>
                  option3
               </button>
               <button className='h-fit p-2 text-start hover:bg-green-500 border-black transition-all duration-300 border bg-white text-black rounded-md text-[15px] font-bold font-mono cursor-pointer'>
                  option4
               </button>
            </div>
         </div>
         {/* Pagination */}
         <div className='border w-[90%] flex items-start justify-evenly'>
            <button
               className='h-fit p-2 text-start hover:bg-green-500 border-black transition-all duration-300 border bg-white text-black rounded-md text-[15px] font-bold font-mono cursor-pointer'
               onClick={handlePrev}
            >
               Prev
            </button>
            <button
               className='h-fit p-2 text-start hover:bg-green-500 border-black transition-all duration-300 border bg-white text-black rounded-md text-[15px] font-bold font-mono cursor-pointer'
               onClick={handleNext}
            >
               Next
            </button>
         </div>
      </div>
   );
};

export default TestPage;
