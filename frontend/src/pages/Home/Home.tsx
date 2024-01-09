import "./Home.css";
import OSvg from "./../../assets/oimg.svg";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import downArrow from "./../../assets/downArrow.svg";
import wires from "./../../assets/wires.svg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="h-[100vh] w-full flex-col tracking-tight flex justify-center items-center text-[4rem] bg-[#0F0F0F] text-white">
        <p className="font-bold w-[60%] text-center leading-[4rem] relative z-10 mt-5">
          <motion.p
            initial={{
              y: 100,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 1.4,
              delay: 0.5,
            }}
          >
            Welcome to DEOGIRI COLLEGE{" "}
          </motion.p>
          <motion.div
            initial={{
              y: 100,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 1.4,
              delay: 0.5,
            }}
            className="flex justify-center mt-3"
          >
            <span className="font-zyada tracking-wide text-[4.5rem] bg-[#9D98FE] text-[#0F0F0F] font-semibold rounded-3xl py-3 mr-5 inline-block">
              Assignment{" "}
            </span>
            <p className="flex justify-center items-center mb-5">
              P
              <span className="pink-o mt-4">
                <img src={OSvg} alt="" />
              </span>
              rtal
            </p>
          </motion.div>
        </p>
        <Link to={"/login"}>
          <motion.button
            initial={{
              y: 100,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 1,
              delay: 0.7,
            }}
            className="bg-[#9D98FE] text-[#0F0F0F] font-zyada text-[2.5rem] 
        mt-20 flex justify-center items-center rounded-2xl px-2 gap-3 h-[3.5rem]
        hover:bg-[#665eff] relative transition-colors duration-300
      "
          >
            <p className="mt-3 font-bold">Let's Start!</p>
            <Sparkles />
          </motion.button>
        </Link>

        {/* Wires */}
        <motion.img
          initial={{
            y: 150,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.6,
          }}
          src={downArrow}
          alt=""
          className="downArrow absolute left-[15%] bottom-[10%] w-[8rem] h-[8rem]"
        />
        <motion.img
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 1.5,
            delay: 1,
          }}
          src={wires}
          alt=""
          className="absolute w-[50%] rotate-6 top-[25%] -z-1"
        />
        <motion.img
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 1.5,
            delay: 1,
          }}
          src={wires}
          alt=""
          className="absolute w-[50%] -rotate-3 top-[25%] -z-1"
        />
      </div>
    </>
  );
};

export default Home;
