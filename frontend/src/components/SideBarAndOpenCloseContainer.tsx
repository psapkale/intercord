import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import "./SideBarAndOC.css";
import gsap from "gsap";

const SideBarAndOpenCloseContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    // Hamburger
    const btn = document.querySelector(".btn") as HTMLButtonElement;
    let i = 1;
    btn.addEventListener("click", function () {
      if (i % 2 !== 0) {
        btn.classList.remove("not-active");
        btn.classList.add("active");
        i++;
        gsap.to(".ham-items-div", {
          opacity: 1,
          duration: 0.3,
          x: 0,
        });
      } else {
        btn.classList.remove("active");
        btn.classList.add("not-active");
        i++;
        gsap.to(".ham-items-div", {
          opacity: 0,
          duration: 0.3,
          x: 100,
        });
      }
    });
  }, []);
  return (
    <div>
      <div className="box z-30">
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
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default SideBarAndOpenCloseContainer;
