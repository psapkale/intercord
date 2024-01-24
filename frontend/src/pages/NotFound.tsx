import { Link } from "react-router-dom";
import notFoundImg from "./../assets/notfound.svg";

const NotFound = () => {
  return (
    <div className="w-full h-[100vh] flex-col flex justify-center items-center gap-8 bg-[#0F0F0F]">
      <img src={notFoundImg} alt="" />
      <div className="text-white flex flex-col justify-center items-center">
        <h1 className="text-white text-4xl font-bold uppercase">
          Page Not Found
        </h1>
        <p className="text-[#a7a7a7] gap-2">
          Let's go back to{"  "}
          <Link to={"/"} className="underline text-white">
            home page
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
