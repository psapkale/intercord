import { useState } from 'react';

const GiveTest = () => {
   const [current, setCurrent] = useState(1);

   const handlePrev = () => {
      current !== 1 && setCurrent((c) => c - 1);
   };

   const handleNext = () => {
      current !== 10 && setCurrent((c) => c + 1);
   };

   return (
      <div className='w-full h-full pl-[6rem] pt-[2rem] flex flex-col gap-4'>
         {/* Headerr */}
         <div className='w-[96%] flex items-center justify-between'>
            <h1 className='text-5xl font-bold font-mono'>Test</h1>
         </div>
         {/* Progress */}
         <div className='mt-6 text-lg font-bold font-mono'>
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
         <div className='w-[90%] flex gap-10 items-start justify-start'>
            <button
               disabled={current === 1}
               className='h-fit hover:bg-white hover:text-black border-black hover:border transition-all duration-300 p-2 px-6 bg-[#0f0f0f] text-white rounded-md text-xl disabled:cursor-not-allowed'
               onClick={handlePrev}
            >
               Prev
            </button>
            {current === 10 ? (
               <button className='h-fit hover:bg-white  hover:text-black border-black hover:border transition-all duration-300 p-2 px-6 bg-[#0f0f0f] text-white rounded-md text-xl'>
                  Submit
               </button>
            ) : (
               <button
                  className='h-fit hover:bg-white  hover:text-black border-black hover:border transition-all duration-300 p-2 px-6  bg-[#0f0f0f] text-white rounded-md text-xl'
                  onClick={handleNext}
               >
                  Next
               </button>
            )}
         </div>
      </div>
   );
};

export default GiveTest;
