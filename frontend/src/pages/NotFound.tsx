import { Link } from "react-router-dom";
import notFoundImg from "./../assets/notfound.svg";
import { useUserDetails } from "@/utils/store";

const NotFound = () => {
  const { user } = useUserDetails();

  return (
    <div className="w-full text-black h-[100vh] flex-col flex justify-center items-center gap-8">
      <img src={notFoundImg} alt="" />
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold uppercase">
          Page Not Found {user.name.split(" ")[0]}
        </h1>
        <p className=" gap-2">
          Let's go back to{"  "}
          <Link to={"/"} className="underline text-gray-500 hover:text-black">
            home page
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
