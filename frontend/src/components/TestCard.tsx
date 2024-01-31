const TestCard = () => {
   return (
      <div className='border border-black rounded-md bg-[#0f0f0fe8] text-slate-100 hover:-translate-y-0.5 transition hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 cursor-pointer'>
         <span className='text-thin text-xs font-thin'>Jyostna Mam</span>
         <h1 className='text-lg font-bold'>Title</h1>
         <span className='text-sm text-slate-200'>Status</span>
         <span className='mt-2 text-xs flex items-center gap-2 text-slate-200'>
            <svg
               className='w-3 h-3'
               xmlns='http://www.w3.org/2000/svg'
               viewBox='0 0 512 512'
            >
               <path
                  fill='#188d3d'
                  d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z'
               />
            </svg>
            <h1>Submissions</h1>
         </span>
      </div>
   );
};

export default TestCard;
