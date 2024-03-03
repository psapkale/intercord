/* eslint-disable no-constant-condition */
import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import "./SideBarAndOC.css";

const SideBarAndOpenCloseContainer = () => {
  const [isOpen, setIsOpen] = useState(false);

  // closing hamburger
  const RemoveActive = () => {
    const btn = document.querySelector(".btn") as HTMLButtonElement;
    btn.classList.remove("active");
    btn.classList.add("not-active");
  };

  useEffect(() => {
    // Hamburger
    const btn = document.querySelector(".btn") as HTMLButtonElement;
    let i = 1;
    btn.addEventListener("click", function () {
      if (i % 2 !== 0) {
        btn.classList.remove("not-active");
        btn.classList.add("active");
        i++;
      } else {
        btn.classList.remove("active");
        btn.classList.add("not-active");
        i++;
      }
    });
  }, []);

  return (
    <div>
      <div className="box z-40">
        <div
          className="btn"
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          <span className="first"></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <SideBar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        RemoveActive={RemoveActive}
      />
    </div>
  );
};

export default SideBarAndOpenCloseContainer;
