import React, { useState } from "react";
import bgImg from "./../assets/svgexport-3.svg";
// import bgImg from "./../assets/banner.png";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// how to diable toast
// const toastId = toast.loading('Loading...');
// toast.dismiss(toastId);

// user type
type userType = {
  username: string;
  password: string;
  email: string;
};

const SignUp = () => {
  const [userInfo, setUserInfo] = useState<userType>({
    username: "",
    password: "",
    email: "",
  });

  // using useNavigate
  const navigate = useNavigate();
  const submitHandler = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userInfo.email)) {
      toast.error("Enter valid email", {
        duration: 3000,
      });
      return;
    }

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
    // Demo testing of toast
    const toastID = toast.loading("loading");
    setTimeout(() => {
      toast.dismiss(toastID);
      toast.success("Signup Successfull", {
        duration: 3000,
      });
      setTimeout(() => {
        navigate("/dashboard/profile");
      }, 500);
    }, 2000);
    toast.loading;
    console.log(userInfo);
  };

  return (
    <div className="h-[100vh] w-full flex justify-center items-center bg-[#F5F5F5]">
      <img
        src={bgImg}
        alt=""
        className="absolute h-full w-full object-cover -z-0"
      />
      <div className="w-full h-full absolute bg-black opacity-30"></div>
      <form className="auth-page h-fit absolute z-10 w-[30rem] bg-[#313338] text-white px-6 py-12 flex flex-col gap-5 rounded-lg">
        <h1 className="text-2xl -mb-4">Sign Up</h1>
        <p className="text-white tracking-wide font-light text-[0.9rem]">
          Fill the below details to create a student account!
        </p>
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="text-[1.1rem]">
            Username<span className="text-red-600">*</span>
          </label>
          <input
            required
            type="text"
            id="username"
            className="w-full py-2 px-2 border rounded-sm outline-1 outline-gray-600  transition-all duration-300 border-gray-300 text-black"
            value={userInfo.username}
            onChange={(e) => {
              setUserInfo({
                ...userInfo,
                username: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-[1.1rem]">
            Password<span className="text-red-600">*</span>
          </label>
          <input
            required
            type="password"
            id="password"
            className="w-full px-2 py-2 border rounded-sm outline-1 outline-gray-600  transition-all duration-300 border-gray-300 text-black"
            value={userInfo.password}
            onChange={(e) => {
              setUserInfo({
                ...userInfo,
                password: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-[1.1rem]">
            Email<span className="text-red-600">*</span>
          </label>
          <input
            required
            type="email"
            id="email"
            className="w-full px-2 py-2 border rounded-sm outline-1 outline-gray-600  transition-all duration-300 border-gray-300 text-black"
            value={userInfo.email}
            onChange={(e) => {
              setUserInfo({
                ...userInfo,
                email: e.target.value,
              });
            }}
          />
          <p className="text-[1rem] mt-1">
            Already have an account?{" "}
            <Link to={"/login"} className="text-[#059CE8] underline">
              Login
            </Link>{" "}
          </p>
        </div>

        <button
          type="submit"
          className="mt-4 bg-[#5865F2] w-full py-2 rounded-md text-[1.1rem] hover:bg-[#3c4cf8] transition-all duration-500"
          onClick={submitHandler}
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default SignUp;
