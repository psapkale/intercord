/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
// import bgImg from "./../assets/banner.png";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { firstSectionAnimation } from "@/utils/Animation";
import { useUserDetails } from "@/utils/store";
import axios from "axios";

// user type
type userType = {
  username: string;
  name: string;
  password: string;
  email: string;
  academicYear: string;
  stream: string;
  pursuingYear: string;
  linkedinUrl?: string;
  githubUrl?: string;
  twitterUrl?: string;
};

const SignUp = () => {
  const [userInfo, setUserInfo] = useState<userType>({
    username: "",
    password: "",
    email: "",
    name: "",
    academicYear: "",
    stream: "",
    pursuingYear: "",
  });
  const [loading, setLoading] = useState(false);
  const setUserDetails = useUserDetails((state) => state.setUserDetails);

  // using useNavigate
  const navigate = useNavigate();
  const submitHandler = async (
    e: React.FormEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();

    // email validation
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userInfo.email)) {
      toast.error("Enter valid email", {
        duration: 3000,
      });
      return;
    }

    // password validation
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
        userInfo.password
      )
    ) {
      toast.error(
        "Enter valid password, enter atleast 1 small char, 1 capital char and 1 number and password should be more than 8 digit",
        {
          duration: 3000,
        }
      );
      return;
    }

    // ? signup-request
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/student/signup",
        {
          name: userInfo.name,
          email: userInfo.email,
          username: userInfo.username,
          password: userInfo.password,
          academicYear: userInfo.academicYear,
          stream: userInfo.stream,
          pursuingYear: userInfo.pursuingYear,
        }
      );

      toast.success(response.data.message);
      // get token from response.data.token
      // get student data from response.data.student
      setUserDetails({
        ...response?.data?.student,
        role: "student",
        isSignedUp: true,
        leaderboardDriverJs: true,
        sideBarDriverJs: true,
        testDriverJs: true,
        token: response?.data?.token,
      });

      setLoading(false);
      navigate("/dashboard/account");
    } catch (err: any) {
      toast.error(err.response.data.message);
      setLoading(false);
    }
  };

  // Calling Animation
  useEffect(() => {
    firstSectionAnimation();
  }, []);

  return (
    <div className="py-10 w-full flex items-center justify-center containerBg">
      <div className="flex justify-center py-20! items-center font-bona italic font-semibold">
        <form
          className="w-[90%] sm:w-[30rem] bg-white px-2 md:px-8 rounded-md py-8 shadow-lg flex flex-col gap-2
        "
        >
          <div>
            <h1 className="text-[3rem] not-italic">SignUp</h1>
            <p className="tracking-wide font-medium text-[1.1rem]">
              Enter your username and password so u can start!
            </p>
          </div>
          <div className="flex flex-col">
            <label htmlFor="fullname" className="text-xl ">
              Fullname<span className="text-red-600">*</span>
            </label>
            <input
              required
              type="text"
              id="fullname"
              className="w-full py-2 px-2 border rounded-sm outline-1 outline-gray-600  transition-all duration-300 border-gray-300 text-black text-xl italic"
              value={userInfo.name}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  name: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-xl ">
              email<span className="text-red-600">*</span>
            </label>
            <input
              required
              type="email"
              id="email"
              className="w-full px-2 py-2 border rounded-sm outline-1 outline-gray-600  transition-all duration-300 border-gray-300 text-black text-[1.2rem] italic"
              value={userInfo.email}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  email: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-xl ">
              username<span className="text-red-600">*</span>
            </label>
            <input
              required
              type="text"
              id="username"
              className="w-full px-2 py-2 border rounded-sm outline-1 outline-gray-600  transition-all duration-300 border-gray-300 text-black text-[1.2rem] italic"
              value={userInfo.username}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  username: e.target.value,
                });
              }}
            />
          </div>

          {/* Academic data */}
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-xl ">
              academic year<span className="text-red-600">*</span>
            </label>
            <input
              required
              type="text"
              id="academic year"
              className="w-full px-2 py-2 border rounded-sm outline-1 outline-gray-600  transition-all duration-300 border-gray-300 text-black text-[1.2rem] italic"
              value={userInfo.academicYear}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  academicYear: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-xl ">
              stream<span className="text-red-600">*</span>
            </label>
            <input
              required
              type="text"
              id="stream"
              className="w-full px-2 py-2 border rounded-sm outline-1 outline-gray-600  transition-all duration-300 border-gray-300 text-black text-[1.2rem] italic"
              value={userInfo.stream}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  stream: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-xl ">
              pursuing year<span className="text-red-600">*</span>
            </label>
            <input
              required
              type="text"
              id="username"
              className="w-full px-2 py-2 border rounded-sm outline-1 outline-gray-600  transition-all duration-300 border-gray-300 text-black text-[1.2rem] italic"
              value={userInfo.pursuingYear}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  pursuingYear: e.target.value,
                });
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-xl">
              Password<span className="text-red-600">*</span>
            </label>
            <input
              required
              type="text"
              id="password"
              className="w-full px-2 py-2 border rounded-sm outline-1 outline-gray-600  transition-all duration-300 border-gray-300 text-black text-[1.2rem] italic"
              value={userInfo.password}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  password: e.target.value,
                });
              }}
            />
          </div>

          <p className="text-xl mt-4">
            Already have a account?{" "}
            <Link to={"/login"} className="text-[#059CE8] underline">
              login
            </Link>{" "}
          </p>
          <button
            disabled={loading}
            type="submit"
            className={`mt-4 tracking-wider w-full rounded-md text-xl py-2 italic duration-500 ${
              loading
                ? "bg-white text-black cursor-not-allowed"
                : "bg-[#313338] hover:bg-[#27292c] transition-all text-white"
            }`}
            onClick={submitHandler}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
