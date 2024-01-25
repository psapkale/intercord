import React, { useState } from "react";
import bgImg from "./../assets/svgexport-3.svg";
// import bgImg from "./../assets/banner.png";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// how to diable toast
// const toastId = toast.loading('Loading...');
// toast.dismiss(toastId);

type userType = {
  username: string;
  password: string;
  role: string;
};

//  regix

const Login = () => {
  const [userInfo, setUserInfo] = useState<userType>({
    username: "",
    password: "",
    role: "student",
  });
  const navigate = useNavigate();

  // Handling login submit
  const submitHandler = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    // Demo testing of toast
    const toastID = toast.loading("loading");
    setTimeout(() => {
      toast.dismiss(toastID);
      toast.success("Login Successfull", {
        duration: 3000,
      });
      navigate("/dashboard/profile");
    }, 2000);
    toast.loading;
  };

  return (
    <div className="h-[100vh] w-full flex justify-center items-center bg-[#F5F5F5]">
      <img
        src={bgImg}
        // width={"100vw"}
        // height={"100vh"}
        alt=""
        className="absolute h-full w-full object-cover -z-0"
      />
      <div className="w-full h-full absolute bg-black opacity-30"></div>

      <form className="auth-page h-fit absolute z-10 w-[30rem] bg-[#313338] text-white px-6 py-12 flex flex-col gap-5 rounded-lg">
        <h1 className="text-2xl -mb-4">Login</h1>
        <p className="text-white tracking-wide font-light text-[0.9rem]">
          Enter your username and password so u can start!
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

        <select
          onChange={(e) => {
            setUserInfo({ ...userInfo, role: e.target.value.toLowerCase() });
          }}
          className="mt-4 -mb-2 text-black w-[50%] py-1 px-1 rounded-sm text-[1rem]"
        >
          <option selected>Student</option>
          <option>Teacher</option>
          <option>Admin</option>
        </select>

        <p className="text-[1rem]">
          Need an account?{" "}
          <Link to={"/signup"} className="text-[#059CE8] underline">
            Sign up
          </Link>{" "}
        </p>
        <button
          type="submit"
          className="mt-2 bg-[#5865F2] w-full py-2 rounded-md text-[1.1rem] hover:bg-[#3c4cf8] transition-all duration-500"
          onClick={submitHandler}
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default Login;
