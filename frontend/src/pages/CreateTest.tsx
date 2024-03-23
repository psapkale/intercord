/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import QuestionModel from "./QuestionModel";
import { useUserDetails } from "@/utils/store";
import axios from "axios";
import toast from "react-hot-toast";

// Question type
export type question = {
   question: string;
   options: string[];
   answerIndex: number;
};

const CreateTest = () => {
   const [test, setTest] = useState<question[]>([]);
   const [step, setStep] = useState(0);
   const [totalNumberOfQuestions, setTotalNumberOfQuestions] = useState(0);
   const [subjectName, setSubjectName] = useState("c++");
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [forYear, setForYear] = useState("I");
   const [marksPerQuestion, setMarksPerQuestion] = useState(0);
   const [date, setDate] = useState("");
   const [time, setTime] = useState("");
   const [endTime, setEndTime] = useState("");

   const user = useUserDetails((state) => state.user);

   // handling next question
   const handleNext = ({ question, options, answerIndex }: question) => {
      if (test[step] === undefined)
         setTest([...test, { question, options, answerIndex }]);
      else {
         let modifiedTest = test;
         modifiedTest[step] = { question, options, answerIndex };
         setTest(modifiedTest);
      }
      if (step !== totalNumberOfQuestions - 1) setStep((step) => step + 1);
   };

   // Resetting the values after successfull test creation
   const resetValues = () => {
      setTest([]);
      setStep(0);
      setTotalNumberOfQuestions(0);
      setSubjectName("c++");
      setTitle("Elementary test");
      setDescription("");
      setMarksPerQuestion(0);
   };

   // sending test to the backend
   const handleSubmit = async ({
      answerIndex,
      question,
      options,
   }: {
      answerIndex: number;
      question: string;
      options: string[];
   }) => {
      try {
         const data = await axios.post(
            "https://intercord-server.vercel.app/api/teacher/create-test",
            {
               subject: subjectName,
               title: title,
               description: description,
               stream: user.stream.toLowerCase(),
               forYear: forYear,
               totalQuestions: totalNumberOfQuestions,
               totalMarks: marksPerQuestion * totalNumberOfQuestions,
               questions: [...test, { question, options, answerIndex }],
               startDate: date,
               time: time,
               endTime: endTime,
            },
            {
               headers: {
                  Authorization: `Bearer ${user.token}`,
               },
            }
         );

         console.log(data);
         toast.success(data.data?.message);
         resetValues();
      } catch (error) {
         console.log("Error in Create test", error);
      }
   };

   return (
      <div className="w-full italic tracking-wider font-bona h-full pl-[1rem] sm:pl-[2rem] lg:pl-[6rem] pt-[2rem]">
         <div className="flex flex-col gap-4 mb-[3rem]">
            <div>
               <h1
                  className="uppercase not-italic font-bold text-[3rem] sm:text-[4rem] -mb-4"
                  id="title"
               >
                  Create Test
               </h1>
               <p className="pl-1">Here you can create the test (10 mcq)</p>
            </div>
            <div>
               <div className="flex max-lg:flex-col max-lg:pr-4 flex-wrap gap-8 pl-1">
                  <div className="flex flex-col">
                     <label
                        htmlFor="totalNumberOfQuestions"
                        className="font-bold  text-[1rem] rounded-md"
                     >
                        Number of questions:
                     </label>
                     <input
                        type="number"
                        id="totalNumberOfQuestions"
                        className="outline-none bg-gray-100 p-2"
                        value={totalNumberOfQuestions}
                        onChange={(e) => {
                           setTotalNumberOfQuestions(Number(e.target.value));
                        }}
                     />
                  </div>
                  <div className="flex flex-col">
                     <label
                        htmlFor="totalNumberOfQuestions"
                        className="  font-bold  text-[1rem]"
                     >
                        Subject:
                     </label>
                     <select
                        className="outline-none bg-gray-100 p-2 rounded-md"
                        onChange={(e) => {
                           const val = e.target.value;
                           if (
                              val == "C++" ||
                              val == "JAVA" ||
                              val == "PHP" ||
                              val == "TypeScript"
                           ) {
                              setSubjectName(val);
                           }
                        }}
                     >
                        <option value="C++">C++</option>
                        <option value="JAVA">JAVA</option>
                     </select>
                  </div>
                  <div className="flex flex-col">
                     <label
                        htmlFor="totalNumberOfQuestions"
                        className="  font-bold  text-[1rem]"
                     >
                        Title:
                     </label>
                     <textarea
                        placeholder="title of test..."
                        id="totalNumberOfQuestions"
                        className="outline-none bg-gray-100 p-2"
                        cols={30}
                        rows={1}
                        value={title}
                        onChange={(e) => {
                           setTitle(e.target.value);
                        }}
                     />
                  </div>
                  <div className="flex flex-col">
                     <label
                        htmlFor="totalNumberOfQuestions"
                        className="  font-bold  text-[1rem] rounded-md"
                     >
                        Test Description:
                     </label>
                     <textarea
                        placeholder="short description about test..."
                        id="totalNumberOfQuestions"
                        className="outline-none bg-gray-100 p-2"
                        cols={30}
                        rows={5}
                        value={description}
                        onChange={(e) => {
                           setDescription(e.target.value);
                        }}
                     />
                  </div>
                  <div className="flex flex-col">
                     <label
                        htmlFor="totalNumberOfQuestions"
                        className="font-bold  text-[1rem]"
                     >
                        Stream:
                     </label>
                     <select className="outline-none bg-gray-100 p-2 rounded-md">
                        <option value={user.stream.toLowerCase()}>
                           {user.stream.toLowerCase()}
                        </option>
                     </select>
                  </div>
                  <div className="flex flex-col">
                     <label
                        htmlFor="totalNumberOfQuestions"
                        className="  font-bold  text-[1rem]"
                     >
                        For year:
                     </label>
                     <select
                        className="outline-none bg-gray-100 p-2 rounded-md"
                        onChange={(e) => {
                           const val = e.target.value;
                           if (val == "I" || val == "II" || val == "III") {
                              setForYear(val);
                           }
                        }}
                     >
                        <option value="I">I</option>
                        <option value="II">II</option>
                        <option value="III">III</option>
                     </select>
                  </div>
                  <div className="flex flex-col">
                     <label
                        htmlFor="totalNumberOfQuestions"
                        className="  font-bold  text-[1rem] rounded-md"
                     >
                        Marks per question:
                     </label>
                     <input
                        id="totalNumberOfQuestions"
                        type="number"
                        className="outline-none bg-gray-100 p-2"
                        value={marksPerQuestion}
                        onChange={(e) => {
                           setMarksPerQuestion(Number(e.target.value));
                        }}
                     />
                  </div>
                  <div className="flex flex-col">
                     <label
                        htmlFor="date"
                        className="  font-bold  text-[1rem] rounded-md"
                     >
                        Date:
                     </label>
                     <input
                        required
                        id="date"
                        type="date"
                        className="outline-none bg-gray-100 p-2"
                        onChange={(e) => {
                           if (e.target.value) setDate(e.target.value);
                        }}
                     />
                  </div>
                  <div className="flex flex-col">
                     <label
                        htmlFor="time"
                        className="  font-bold  text-[1rem] rounded-md"
                     >
                        Time:
                     </label>
                     <input
                        required
                        id="time"
                        type="time"
                        value={time}
                        className="outline-none bg-gray-100 p-2"
                        onChange={(e) => {
                           setTime(e.target.value);
                        }}
                     />
                  </div>
                  <div className="flex flex-col">
                     <label
                        htmlFor="endtime"
                        className="  font-bold  text-[1rem] rounded-md"
                     >
                        End Time:
                     </label>
                     <input
                        id="endtime"
                        type="time"
                        value={endTime}
                        className="outline-none bg-gray-100 p-2"
                        onChange={(e) => {
                           setEndTime(e.target.value);
                        }}
                        required
                     />
                  </div>
               </div>
            </div>
         </div>
         {/* If Number of questions are not selected then in that case */}
         {totalNumberOfQuestions > 0 && subjectName ? (
            <QuestionModel
               handleNext={handleNext}
               handleSubmit={handleSubmit}
               step={step}
               totalNumberOfQuestions={totalNumberOfQuestions}
               test={test}
               setStep={setStep}
               description={description}
               marksPerQuestion={marksPerQuestion}
            />
         ) : (
            <h1 className="text-5xl  ">
               Select Subject Name and Total number of questions.
            </h1>
         )}
      </div>
   );
};

export default CreateTest;
