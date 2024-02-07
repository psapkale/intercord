/* eslint-disable @typescript-eslint/no-unused-vars */
import { AtSign, Github, Linkedin, LockKeyhole, MailCheck } from "lucide-react";
import { BsSave } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { InputLabel } from "./../components/PrimeSkeleton";
import { useEffect, useState } from "react";
import { useUserDetails } from "@/utils/store";

const ProfilePage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const user = useUserDetails((state) => state.user);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <div className="w-full h-fit pl-[1.5rem] sm:pl-[2rem] md:pl-[6rem] pt-[2rem] overflow-y-scroll py-8">
      <div className="flex flex-col gap-10">
        <h1 className="font-semibold text-5xl max-md:mt-[1rem]  font-mono">
          Account
        </h1>
        <div className="flex w-full gap-[2rem] lg:gap-[5rem] lg:flex-row flex-col">
          {/* FullName */}
          <div className="flex flex-col font-zyada ">
            {!loading ? (
              <>
                <label htmlFor="fn" className="font-bold text-2xl">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fn"
                  className="bg-[#F7F7F8] rounded-md py-2 text-black text-xl px-2 font-bold tracking-[0.1rem] w-[90%] lg:w-[20rem] outline-none"
                  placeholder={user.name}
                />
              </>
            ) : (
              <InputLabel />
            )}
          </div>
          {/* Username */}
          <div className="flex flex-col font-zyada">
            {!loading ? (
              <>
                <label htmlFor="username" className="font-bold text-2xl flex">
                  <AtSign className="w-5" /> username
                </label>

                <input
                  type="text"
                  id="username"
                  className="bg-[#F7F7F8] rounded-md py-2 text-black text-xl px-2 font-bold tracking-[0.1rem] w-[90%] lg:w-[20rem] outline-none"
                  placeholder={user.username}
                />
              </>
            ) : (
              <InputLabel />
            )}
          </div>
        </div>
        {/* Password */}
        <div className="w-full">
          <div className="flex flex-col font-zyada ">
            {!loading ? (
              <>
                <label
                  htmlFor="password"
                  className="flex gap-2 font-bold text-2xl"
                >
                  Password <LockKeyhole className="w-5" />
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-[#F7F7F8] rounded-md py-2 text-black text-xl px-2 font-bold tracking-[0.1rem] w-[90%] lg:w-[20rem] outline-none"
                  placeholder="Enter new password"
                />
              </>
            ) : (
              <InputLabel />
            )}
          </div>
        </div>
        {/* Email */}
        <div className="w-full">
          <div className="flex flex-col font-zyada ">
            {!loading ? (
              <>
                <label
                  htmlFor="email"
                  className="flex gap-2 font-bold text-2xl"
                >
                  Email <MailCheck className="w-5" />
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-[#F7F7F8] rounded-md py-2 text-black text-xl px-2 font-bold tracking-[0.1rem] w-[90%] lg:w-[20rem] outline-none"
                  placeholder={user.email}
                />
              </>
            ) : (
              <InputLabel />
            )}
          </div>
        </div>
      </div>
      {/* Social Links */}
      <div className="w-full h-fit mt-[2rem] md:mt-[3rem] lg:mt-[5rem] overflow-scroll">
        <h1 className="font-semibold text-5xl font-mono">Social Media</h1>
        <div className="w-full flex gap-[0.5rem] flex-col lg:flex-row lg:gap-[5rem] flex-wrap">
          {/* Github */}
          <div className="flex flex-col font-zyada mt-[2rem]">
            {!loading ? (
              <>
                <label
                  htmlFor="github"
                  className="font-bold text-2xl flex gap-2"
                >
                  GitHub <Github className="w-5" />
                </label>
                <input
                  type="text"
                  id="github"
                  className="bg-[#F7F7F8] rounded-md py-2 text-black text-xl px-2 font-bold tracking-[0.1rem] w-[90%] lg:w-[20rem] outline-none"
                  placeholder="www.9xVibee"
                />
              </>
            ) : (
              <InputLabel />
            )}
          </div>
          {/* Lindin */}
          <div className="flex flex-col font-zyada mt-[2rem]">
            {!loading ? (
              <>
                <label
                  htmlFor="linkdin"
                  className="flex gap-2 font-bold text-2xl"
                >
                  Linkdin <Linkedin className="w-5" />
                </label>
                <input
                  type="text"
                  id="linkdin"
                  className="bg-[#F7F7F8] rounded-md py-2 text-black text-xl px-2 font-bold tracking-[0.1rem] w-[90%] lg:w-[20rem] outline-none"
                  placeholder="@linkdinId"
                />
              </>
            ) : (
              <InputLabel />
            )}
          </div>
          {/* Twitter */}
          <div className="flex flex-col font-zyada mt-[2rem]">
            {!loading ? (
              <>
                <label
                  htmlFor="twitter"
                  className="flex gap-2 font-bold text-2xl"
                >
                  Twitter <FaXTwitter className="w-5" />
                </label>
                <input
                  type="text"
                  id="twitter"
                  className="bg-[#F7F7F8] rounded-md py-2 text-black text-xl px-2 font-bold tracking-[0.1rem] w-[90%] lg:w-[20rem] outline-none"
                  placeholder="@twitter"
                />
              </>
            ) : (
              <InputLabel />
            )}
          </div>
        </div>
      </div>
      <button className="w-[10rem] mt-8 rounded-md tracking-wider text-2xl font-semibold border border-black hover:bg-white hover:text-black transition-all duration-300 font-zyada py-2 bg-[#0F0F0F] text-white flex justify-center items-center gap-2">
        Update <BsSave className="w-4 mb-1" />
      </button>
    </div>
  );
};

export default ProfilePage;
