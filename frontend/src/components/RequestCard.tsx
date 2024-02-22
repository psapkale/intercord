import { PendingStudentType } from '@/pages/Requests';

const RequestCard = ({ student }: { student: PendingStudentType }) => {
   return (
      <div className='w-full h-fit p-2 group border border-black rounded-lg flex hover:shadow-lg'>
         <div className='w-full flex items-center justify-between'>
            <p className='text-lg font-mono'>
               <h1 className='inline font-bold hover:underline'>
                  {student.name}
               </h1>{' '}
               request to join
            </p>
            <div className='flex gap-2 items-center'>
               <button className='py-[0.30rem] px-3 border border-black hover:bg-black hover:text-white rounded-lg text-lg font-mono font-bold'>
                  Accept
               </button>
               <button className='py-[0.30rem] px-3 border border-red-500 hover:bg-red-500 hover:text-white rounded-lg text-lg font-mono font-bold'>
                  Decline
               </button>
            </div>
         </div>
         {/* show on hover */}
         {/* <div className='block group-hover:inline'>
            <h1>
               Name: <div>{student.name}</div>
            </h1>
         </div> */}
      </div>
   );
};

export default RequestCard;
