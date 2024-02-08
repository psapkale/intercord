import { useNavigate } from 'react-router-dom';

const TestCard = ({ idx }: { idx: number }) => {
   const navigate = useNavigate();

   return (
      <div
         className='border border-[#0f0f0f] rounded-md bg-white text-slate-900 hover:-translate-y-0.5 transition-all duration-200 hover:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] px-4 cursor-pointer flex justify-between font-zyada items-center'
         id={idx == 0 ? 'text-card' : ''}
      >
         <div>
            <span className='text-thin text-2xl font-bold'>Jyostna Mam</span>
            <h1 className='text-xl font-bold underline'>Advance Android</h1>
         </div>
         <div className='flex flex-col justify-center items-center gap-1 py-2'>
            <span className='text-xs flex items-center gap-2'>
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
               <span className='text-xl font-bold'>Status</span>
            </span>
            <button
               className='hover:bg-white hover:text-black border-black transition-all duration-300 px-10 border text-center bg-[#0f0f0f] text-white rounded-md text-2xl pt-1'
               onClick={() => navigate('testId')}
            >
               Start
            </button>
         </div>
      </div>
   );
};

export default TestCard;
