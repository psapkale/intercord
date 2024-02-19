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
import {
  AtSign,
  CheckCircle,
  Github,
  Linkedin,
  Mail,
  Trash2,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const StudentProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [studentDetails, setStudentDetails] = useState<StudentType>();
  const user = useUserDetails((state) => state.user);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();

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

      setStudentDetails(data?.data?.student);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err, "Error in student profile page");
    }
  };

  // handle student accout deletion
  const handleDeleteStudentAccount = async () => {
    setDeleteLoading(true);
    try {
      const data = await axios.delete(
        `http://localhost:3000/api/admin/deletestudent/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      toast.success(data?.data?.message);
      setDeleteLoading(false);
      navigate("/dashboard/search");
    } catch (err) {
      console.log("Error in Hanlde Delete Student Page", err);
      setDeleteLoading(false);
      setIsPopUpOpen(false);
    }
  };

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  return (
    <div className="w-full h-fit pl-[1.5rem] sm:pl-[2rem] md:pl-[6rem] pt-[2rem] overflow-y-scroll py-8">
      <div className="w-full flex justify-between max-md:mt-10 pr-10">
        <h1 className="text-3xl sm:text-5xl font-semibold uppercase">
          {studentDetails?.name}
        </h1>
        {user.role == "admin" && (
          <TooltipProvider>
            <Tooltip delayDuration={1}>
              <TooltipTrigger>
                <button
                  className="hover:bg-gray-200 rounded-full h-10 w-10 flex justify-center items-center transition-colors duration-300"
                  onClick={() => setIsPopUpOpen(true)}
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
      <div className="w-full h-fit mt-8">
        <div className="flex max-md:flex-col w-full gap-10 flex-wrap">
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
                  className="bg-gray-200 rounded-md py-2 text-black text-xl px-2 font-bold tracking-[0.1rem] w-[90%] lg:w-[20rem] outline-none"
                >
                  {studentDetails?.name}
                </span>
              </>
            ) : (
              <InputLabel />
            )}
          </div>
          {/* userName */}
          <div className="flex flex-col font-zyada max-md:-mt-10">
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
                  className="bg-gray-200 rounded-md py-2 text-black text-xl px-2 font-bold tracking-[0.1rem] items-center flex w-[90%] lg:w-[20rem] outline-none"
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
                  className="bg-gray-200 rounded-md py-2 text-black text-xl px-2 font-bold tracking-[0.1rem] items-center flex w-[90%] lg:w-[20rem] outline-none"
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
                  htmlFor="submission"
                  className="font-bold text-2xl gap-1 items-center flex"
                >
                  Total Test Submissions
                  <CheckCircle className="size-4 mb-2" />
                </label>
                <span
                  id="submission"
                  className="bg-gray-200 rounded-md py-2 text-black text-xl px-2 font-bold tracking-[0.1rem] items-center flex w-[90%] lg:w-[20rem] outline-none"
                >
                  {studentDetails?.submissions.length}
                </span>
              </>
            ) : (
              <InputLabel />
            )}
          </div>
          {/* Current Rank */}
          <div className="flex flex-col font-zyada">
            {!loading ? (
              <>
                <label
                  htmlFor="rank"
                  className="font-bold text-2xl gap-1 items-center flex"
                >
                  Rank
                  {/* <CheckCircle className="size-4 mb-2" /> */}
                </label>
                <span
                  id="rank"
                  className="bg-gray-200 rounded-md py-2 text-black text-xl px-2 font-bold tracking-[0.1rem] items-center flex w-[90%] lg:w-[20rem] outline-none"
                >
                  {1}
                </span>
              </>
            ) : (
              <InputLabel />
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-fit mt-14">
        <h1 className="uppercase text-5xl font-semibold">Visit Social Links</h1>
        <div className="flex mt-6">
          <TooltipProvider>
            <div className="flex gap-8">
              {
                <Tooltip delayDuration={1}>
                  <TooltipTrigger>
                    <a href={studentDetails?.githubUrl}>
                      <button className="hover:bg-gray-200 rounded-full h-12 w-12 flex justify-center items-center transition-colors duration-300">
                        <Github className="size-8" />
                      </button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>GitHub</p>
                  </TooltipContent>
                </Tooltip>
              }
              {
                <Tooltip delayDuration={1}>
                  <TooltipTrigger>
                    <a href={studentDetails?.linkedinUrl}>
                      <button className="hover:bg-gray-200 rounded-full h-12 w-12 flex justify-center items-center transition-colors duration-300">
                        <Linkedin className="size-8" />
                      </button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Linkdin</p>
                  </TooltipContent>
                </Tooltip>
              }
              {
                <Tooltip delayDuration={1}>
                  <TooltipTrigger>
                    <a href={studentDetails?.twitterUrl}>
                      <button className="hover:bg-gray-200 rounded-full h-12 w-12 flex justify-center items-center transition-colors duration-300">
                        <FaXTwitter className="size-8" />
                      </button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Twitter</p>
                  </TooltipContent>
                </Tooltip>
              }
            </div>
          </TooltipProvider>
        </div>
      </div>
      <div
        className={`w-full h-full z-30 bg-[#0f0f0f49] absolute top-0 left-0 flex justify-center items-center ${
          !isPopUpOpen ? "hidden" : "flex"
        }`}
        onClick={() => setIsPopUpOpen(false)}
      >
        <div className="w-[30rem] h-[10rem] rounded-md bg-white flex flex-col justify-center items-center gap-4">
          <h1 className="text-[1.2rem]">
            Do you really want to
            <span className="text-red-600 font-bold font-zyada text-2xl">
              {" "}
              Delete
            </span>{" "}
            this account?
          </h1>
          <div className="flex gap-2">
            <button
              className={`w-[6rem] py-2 border rounded-md bg-red-600 text-black
             hover:bg-red-700 transition-colors duration-300 flex justify-center items-center gap-1 ${
               deleteLoading && "cursor-not-allowed"
             }`}
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteStudentAccount();
              }}
              disabled={deleteLoading}
            >
              {deleteLoading ? "Deleting..." : "Confirm"}
            </button>
            <button
              className="w-[6rem] py-2 border rounded-md hover:bg-gray-200 transition-colors duration-300"
              onClick={() => setIsPopUpOpen(false)}
              disabled={deleteLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePage;
