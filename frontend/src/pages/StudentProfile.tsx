import { InputLabel } from "@/components/PrimeSkeleton";
import { StudentType } from "@/components/StudentSearchCard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUserDetails } from "@/utils/store";
import axios from "axios";
import { AtSign, CheckCircle, Mail, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StudentProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [studentDetails, setStudentDetails] = useState<StudentType>();
  const user = useUserDetails((state) => state.user);

  const { id } = useParams();

  // fetch student details
  const fetchStudentDetails = async () => {
    setLoading(true);
    setLoading(false);
    try {
      const data = await axios.get(
        `http://localhost:3000/api/student/studentdetails/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log(data);
      setStudentDetails(data?.data?.student);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err, "Error in student profile page");
    }
  };

  // handle student accout deletion
  const handleDeleteStudentAccount = async () => {};

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  return (
    <div className="w-full h-fit pl-[1.5rem] sm:pl-[2rem] md:pl-[6rem] pt-[2rem] overflow-y-scroll py-8">
      <div className="w-full flex justify-between pr-10">
        <h1 className="text-5xl font-semibold uppercase">
          {studentDetails?.name}
        </h1>
        {user.role == "admin" && (
          <TooltipProvider>
            <Tooltip delayDuration={1}>
              <TooltipTrigger>
                <button
                  className="hover:bg-gray-100 rounded-full h-10 w-10 flex justify-center items-center transition-colors duration-300"
                  onClick={handleDeleteStudentAccount}
                >
                  <Trash2 className="size-6" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="w-full h-full mt-8">
        <div className="flex w-full gap-10 flex-wrap">
          {/* Full Name */}
          <div className="flex flex-col font-zyada">
            {!loading ? (
              <>
                <label
                  htmlFor="fullname"
                  className="font-bold text-2xl flex gap-2"
                >
                  FullName
                </label>
                <span
                  id="fullname"
                  className="bg-[#F7F7F8] rounded-md py-2 text-black text-xl px-2 font-bold tracking-[0.1rem] w-[90%] lg:w-[20rem] outline-none"
                >
                  {studentDetails?.name}
                </span>
              </>
            ) : (
              <InputLabel />
            )}
          </div>
          {/* userName */}
          <div className="flex flex-col font-zyada">
            {!loading ? (
              <>
                <label
                  htmlFor="username"
                  className="font-bold text-2xl items-center flex"
                >
                  <AtSign className="size-4" />
                  username
                </label>
                <span
                  id="username"
                  className="bg-[#F7F7F8] rounded-md py-2 text-black text-xl px-2 font-bold tracking-[0.1rem] items-center flex w-[90%] lg:w-[20rem] outline-none"
                >
                  <AtSign className="size-4" />
                  {studentDetails?.username}
                </span>
              </>
            ) : (
              <InputLabel />
            )}
          </div>
          {/* Email */}
          <div className="flex flex-col font-zyada">
            {!loading ? (
              <>
                <label
                  htmlFor="email"
                  className="font-bold text-2xl gap-1 items-center flex"
                >
                  Email
                  <Mail className="size-6 mb-2" />
                </label>
                <span
                  id="email"
                  className="bg-[#F7F7F8] rounded-md py-2 text-black text-xl px-2 font-bold tracking-[0.1rem] items-center flex w-[90%] lg:w-[20rem] outline-none"
                >
                  {studentDetails?.email}
                </span>
              </>
            ) : (
              <InputLabel />
            )}
          </div>
          {/* Submissions */}
          <div className="flex flex-col font-zyada">
            {!loading ? (
              <>
                <label
                  htmlFor="email"
                  className="font-bold text-2xl gap-1 items-center flex"
                >
                  Total Test Submissions
                  <CheckCircle className="size-4 mb-2" />
                </label>
                <span
                  id="email"
                  className="bg-[#F7F7F8] rounded-md py-2 text-black text-xl px-2 font-bold tracking-[0.1rem] items-center flex w-[90%] lg:w-[20rem] outline-none"
                >
                  {studentDetails?.submissions.length}
                </span>
              </>
            ) : (
              <InputLabel />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePage;
