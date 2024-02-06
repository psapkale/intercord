/* eslint-disable no-constant-condition */
import { useEffect, useState } from "react";
import { callSideBarDriver } from "./../utils/driver.js";
import SideBar from "./SideBar";
import "./SideBarAndOC.css";
import { useUserDetails } from "@/utils/store.js";

const SideBarAndOpenCloseContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUserDetails((state) => state.user);
  const updateTutorial = useUserDetails((state) => state.updateTutorial);

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

  //calling driver && checking if already done with instructions
  if (isOpen && user.isSignedUp && user.sideBarDriverJs) {
    setTimeout(() => {
      callSideBarDriver();
      updateTutorial("sideBarDriverJs");
    }, 200);
  }

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
