import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { firstSectionAnimation } from "@/utils/Animation";

type userType = {
  email: string;
  password: string;
  role: string;
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<userType>({
    email: "",
    password: "",
    role: "student",
  });
  const navigate = useNavigate();

  // Handling login submit
  const submitHandler = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    // Demo testing of toast
    setLoading(true);
    const toastID = toast.loading("loading");
    setTimeout(() => {
      toast.dismiss(toastID);
      setLoading(false);
      toast.success("Login Successfull", {
        duration: 3000,
      });
      navigate("/dashboard/account");
    }, 2000);
  };

  // Calling Animation
  useEffect(() => {
    firstSectionAnimation();
  }, []);

  return (
    <div className="h-[100vh] w-full flex items-center justify-center bg-[#F5F5F5]">
      <div className="flex justify-center items-center h-full font-zyada font-semibold">
        <form
          className="auth-page h-fit absolute z-10 w-[30rem]  px-6 py-12 flex flex-col gap-5 rounded-lg login
        "
        >
          <h1 className="text-[3rem] -mb-8">Login</h1>
          <p className="tracking-wide font-medium text-[1.2rem]">
            Enter your username and password so u can start!
          </p>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-[1.8rem] -mb-2">
              email<span className="text-red-600">*</span>
            </label>
            <input
              required
              type="text"
              id="username"
              className="w-full py-2 px-2 border rounded-sm outline-1 outline-gray-600  transition-all duration-300 border-gray-300 text-black"
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
            <label htmlFor="password" className="text-[1.6rem] -mb-2">
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
            className="mt-4 -mb-2 text-black w-[50%] px-1 rounded-sm text-[1.8rem]"
          >
            <option selected>Student</option>
            <option>Teacher</option>
            <option>Admin</option>
          </select>

          <p className="text-[1.8rem]">
            Need an account?{" "}
            <Link to={"/signup"} className="text-[#059CE8] underline">
              Sign up
            </Link>{" "}
          </p>
          <button
            disabled={loading}
            type="submit"
            className={`mt-4 tracking-wider w-full rounded-md text-[1.8rem]  duration-500 ${
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

export default Login;
