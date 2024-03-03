/* eslint-disable no-constant-condition */
import { useState } from "react";
import SideBar from "./SideBar";
import { Menu, X } from "lucide-react";

const SideBarAndOpenCloseContainer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className="hover:bg-gray-200 rounded-full h-10 w-10 flex justify-center items-center transition-colors absolute top-0 left-0 z-30 duration-300 cursor-pointer m-2"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        {isOpen ? <X className="size-7" /> : <Menu className="size-7" />}
      </div>
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default SideBarAndOpenCloseContainer;
