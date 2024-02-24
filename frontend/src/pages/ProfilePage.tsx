/* eslint-disable @typescript-eslint/no-unused-vars */
import { AtSign, Github, Linkedin, LockKeyhole, MailCheck } from "lucide-react";
import { BsSave } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { InputLabel } from "./../components/PrimeSkeleton";
import { useState } from "react";
import { useUserDetails } from "@/utils/store";
import axios from "axios";
import toast from "react-hot-toast";

type UserType = {
  name: string;
  usernameNew: string;
  email: string;
  password: string;
  linkedinUrl: string;
  githubUrl: string;
  twitterUrl: string;
};

const ProfilePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const user = useUserDetails((state) => state.user);
  const updateprofile = useUserDetails((state) => state.updateprofile);
  const [userDetails, setUserDetails] = useState<UserType>({
    name: user.name,
    usernameNew: user.username,
    email: user.email,
    password: "",
    linkedinUrl: user.linkedinUrl,
    githubUrl: user.githubUrl,
    twitterUrl: user.twitterUrl,
  });

  //! handling user profile update
  const updateUserProfile = async () => {
    setLoading(true);
    try {
      const data = await axios.put(
        `http://localhost:3000/api/${user.role}/updateprofile`,
        {
          ...userDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // updating user details in zustand store!
      setUserDetails({
        ...data?.data?.user,
        usernameNew: data?.data?.user?.username,
        password: "",
      });

      updateprofile({ ...data?.data?.user });
      // Adding detay to show shimmer 😉
      setTimeout(() => {
        toast.success("Profile updated Successfully");
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.log("Error in update profile", error);
      toast.error("Some Error occured");
      setLoading(false);
    }
  };

  return (
    <div className="w-full !italic h-fit pl-[1.5rem] sm:pl-[2rem] md:pl-[6rem] pt-[2rem] overflow-y-scroll py-8">
      <div className="flex flex-col gap-[1.5rem]">
        <h1 className="font-semibold not-italic text-5xl max-md:mt-[1rem]  font-bona">
          Account
        </h1>
        <div className="flex w-full italic gap-[1.5rem] lg:gap-[5rem] lg:flex-row flex-col">
          {/* FullName */}
          <div className="flex flex-col font-bona ">
            {!loading ? (
              <>
                <label htmlFor="fn" className="font-semibold text-xl">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fn"
                  className="bg-gray-200 rounded-md py-2 text-black text-[16px] px-2 font-[400]   w-[90%] lg:w-[20rem] outline-none italic"
                  placeholder="Enter new Name"
                  value={userDetails.name}
                  onChange={(e) => {
                    setUserDetails({
                      ...userDetails,
                      name: e.target.value,
                    });
                  }}
                />
              </>
            ) : (
              <InputLabel />
            )}
          </div>
          {/* Username */}
          <div className="flex flex-col font-bona">
            {!loading ? (
              <>
                <label
                  htmlFor="username"
                  className="font-bold text-xl flex items-center"
                >
                  <AtSign className="size-5" /> username
                </label>

                <input
                  type="text"
                  id="username"
                  className="bg-gray-200 rounded-md py-2 text-black text-[16px] px-2 font-[400] w-[90%] lg:w-[20rem] outline-none italic"
                  placeholder="Enter new username"
                  value={userDetails.usernameNew}
                  onChange={(e) => {
                    setUserDetails({
                      ...userDetails,
                      usernameNew: e.target.value,
                    });
                  }}
                />
              </>
            ) : (
              <InputLabel />
            )}
          </div>
        </div>
        {/* Password */}
        <div className="w-full">
          <div className="flex flex-col font-bona ">
            {!loading ? (
              <>
                <label
                  htmlFor="password"
                  className="flex gap-2 font-bold text-xl"
                >
                  Password <LockKeyhole className="w-5" />
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-gray-200 italic rounded-md py-2 text-black text-[16px] px-2 font-[400]   w-[90%] lg:w-[20rem] outline-none"
                  placeholder="Enter new password"
                  value={userDetails.password}
                  onChange={(e) => {
                    setUserDetails({
                      ...userDetails,
                      password: e.target.value,
                    });
                  }}
                />
              </>
            ) : (
              <InputLabel />
            )}
          </div>
        </div>
        {/* Email */}
        <div className="w-full">
          <div className="flex flex-col font-bona ">
            {!loading ? (
              <>
                <label htmlFor="email" className="flex gap-2 font-bold text-xl">
                  Email <MailCheck className="w-5" />
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-200 italic rounded-md py-2 text-black text-[16px] px-2 font-[400]   w-[90%] lg:w-[20rem] outline-none"
                  placeholder="Enter new Email"
                  value={userDetails.email}
                  onChange={(e) => {
                    setUserDetails({
                      ...userDetails,
                      email: e.target.value,
                    });
                  }}
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
        <h1 className="font-semibold text-5xl not-italic font-bona">
          Social Media
        </h1>
        <div className="w-full flex gap-[0.5rem] flex-col lg:flex-row lg:gap-[5rem] flex-wrap">
          {/* Github */}
          <div className="flex flex-col font-bona mt-[2rem]">
            {!loading ? (
              <>
                <label
                  htmlFor="github"
                  className="font-bold text-xl flex items-center gap-2"
                >
                  GitHub <Github className="w-5" />
                </label>
                <input
                  type="text"
                  id="github"
                  className="bg-gray-200 rounded-md py-2 text-black text-[16px] px-2 font-[400] w-[90%] lg:w-[20rem] italic outline-none italic"
                  placeholder="Github Url"
                  value={userDetails.githubUrl}
                  onChange={(e) => {
                    setUserDetails({
                      ...userDetails,
                      githubUrl: e.target.value,
                    });
                  }}
                />
              </>
            ) : (
              <InputLabel />
            )}
          </div>
          {/* Lindin */}
          <div className="flex flex-col font-bona mt-[2rem]">
            {!loading ? (
              <>
                <label
                  htmlFor="linkdin"
                  className="flex items-center gap-2 font-bold text-xl"
                >
                  Linkdin <Linkedin className="w-5" />
                </label>
                <input
                  type="text"
                  id="linkdin"
                  className="bg-gray-200 italic rounded-md py-2 text-black text-[16px] px-2 font-[400]   w-[90%] lg:w-[20rem] outline-none"
                  placeholder="Linkdin Url"
                  value={userDetails.linkedinUrl}
                  onChange={(e) => {
                    setUserDetails({
                      ...userDetails,
                      linkedinUrl: e.target.value,
                    });
                  }}
                />
              </>
            ) : (
              <InputLabel />
            )}
          </div>
          {/* Twitter */}
          <div className="flex flex-col font-bona mt-[2rem]">
            {!loading ? (
              <>
                <label
                  htmlFor="twitter"
                  className="flex items-center gap-2 font-bold text-xl"
                >
                  Twitter <FaXTwitter className="w-5" />
                </label>
                <input
                  type="text"
                  id="twitter"
                  className="bg-gray-200 italic rounded-md py-2 text-black text-[16px] px-2 font-[400]   w-[90%] lg:w-[20rem] outline-none"
                  placeholder="Twitter url"
                  value={userDetails.twitterUrl}
                  onChange={(e) => {
                    setUserDetails({
                      ...userDetails,
                      twitterUrl: e.target.value,
                    });
                  }}
                />
              </>
            ) : (
              <InputLabel />
            )}
          </div>
        </div>
      </div>
      <button
        className="w-[10rem] mt-8 rounded-md tracking-wider text-xl font-bold border border-black hover:bg-white hover:text-black transition-all duration-300 font-bona py-2 bg-[#0F0F0F] text-white flex justify-center items-center gap-2 italic"
        onClick={updateUserProfile}
        disabled={loading}
      >
        Update <BsSave className="w-4" />
      </button>
    </div>
  );
};

export default ProfilePage;
