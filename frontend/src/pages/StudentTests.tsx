import StudentTestCard from '@/components/StudentTestCard';
import { useUserDetails } from '@/utils/store';
import axios from 'axios';
import bannerImg from '@/assets/banner.png';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export type StudentSubmissionType = {
   test: string;
   testTitle: string;
   subject: string;
   submittedAnswersIndex: number[];
   marksObtained: number;
   submittedAt: Date;
};

const StudentTests = () => {
   const userInfo = useUserDetails((store) => store.user);
   const subjects = ['All', 'C++', 'Java', 'PHP'];
   const [selected, setSelected] = useState('All');

   const [allMySubmissions, setAllMySubmissions] = useState<
      StudentSubmissionType[]
   >([]);

   const [dumSubmission, setDumSubmission] = useState<StudentSubmissionType[]>(
      []
   );

   useEffect(() => {
      getAllMySubmissions();
   }, []);

   const getAllMySubmissions = async () => {
      try {
         const res = await axios.get(
            `https://intercord-server.vercel.app/api/student/mytests`,
            {
               headers: {
                  Authorization: `Bearer ${userInfo.token}`,
               },
            }
         );

         res?.data?.submissions && setAllMySubmissions(res?.data?.submissions);
         res?.data?.submissions && setDumSubmission(res?.data?.submissions);
         return;
      } catch (e: any) {
         toast.error(e?.response?.data?.message);
      }
   };

   const handleSelect = (
      allSubmissions: StudentSubmissionType[],
      subject: string
   ) => {
      return subject === 'All'
         ? allSubmissions
         : allSubmissions.filter(
              (submission) =>
                 submission?.subject?.toLowerCase() == subject.toLowerCase()
           );
   };

   return (
      <div className='w-[90%] h-full pl-[6rem] pt-[2rem] flex flex-col gap-4'>
         <div>
            <h1 className='font-bona font-semibold text-[3rem]'>My Tests</h1>
            <p className='mt-1 text-slate-800 text-[1.1rem] font-bona font-[600]'>
               {allMySubmissions?.length === 0
                  ? 'Currently you have not given any test'
                  : allMySubmissions?.length >= 10
                  ? "Well done! You're doing good"
                  : 'Keep it up, consistency is the key'}
            </p>
         </div>

         <div>
            {/* test tags */}
            <div className='mt-2 pl-2 flex gap-2  cursor-pointer'>
               {subjects.map((subject, idx) => (
                  <div
                     key={idx}
                     className={`py-1 px-2 font-bona font-bold border border-[#d0d0d0] rounded-lg ${
                        selected === subject
                           ? 'bg-black text-white'
                           : 'text-slate-800 hover:bg-[#f0f0f0]'
                     }`}
                     onClick={() => {
                        const filteredSubjects = handleSelect(
                           dumSubmission,
                           subject
                        );
                        setAllMySubmissions(filteredSubjects);
                        setSelected(subject);
                     }}
                  >
                     <h1>{subject}</h1>
                  </div>
               ))}
            </div>
            {/* test submission */}
            <div className='w-full h-fit mt-4 p-2 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 grid md:grid-cols-4 gap-4'>
               {allMySubmissions.length === 0 ? (
                  <div className='invisible lg:visible w-full h-[80%] items-center justify-center'>
                     <img
                        src={bannerImg}
                        alt=''
                        className='absolute top-[30%] xl:top-[15%] right-[10%] w-[50%] h-fit'
                     />
                  </div>
               ) : (
                  allMySubmissions?.map((submission, idx) => (
                     <StudentTestCard
                        key={idx}
                        submission={submission}
                        user={userInfo}
                     />
                  ))
               )}
            </div>
         </div>
      </div>
   );
};

export default StudentTests;
