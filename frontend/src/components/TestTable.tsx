import TestCardSubject from './TestCardSubject';
import { TestType } from '@/pages/GiveTest';

const TestTable = ({ allTests }: { allTests: TestType[] }) => {
   return (
      <div>
         <div
            className='bg-white flex w-full font-bona py-2 px-2 mb-4 border border-b-black sticky top-0'
            id='rank'
         >
            <h1 className='w-[10%] font-semibold text-[1rem]'>Sr. no.</h1>
            <h1 className='w-[90%] truncate  font-semibold text-[1rem]'>
               Test Name
            </h1>
         </div>
         {allTests.map((test, idx) => {
            return (
               <TestCardSubject
                  srNo={idx + 1}
                  key={test?._id}
                  testId={test?._id}
                  name={test?.title}
               />
            );
         })}
      </div>
   );
};

export default TestTable;
