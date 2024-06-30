"use-client";

import { FC } from "react";
import Image from "next/image";
import studentHome from "../../assets/student_home.jpeg";
import Courses from "./Courses";

type Props = {};

const Hero: FC<Props> = (props) => {
  return (
    <div className="w-full 1000px:flex items-center">
      <div className="w-[1728px] h-[557.66px] bg-[#D9D9D9] flex items-center">
        <div className="">
          <h5 className="font-Poppins text-[25px] text-black dark:text-white font-[500] text-justify py-2 px-8">
            Start your journey towards becoming a proficient <br /> healthcare
            professional today <br /> with our expertly crafted courses
          </h5>
          <div className=" flex flex-row justify-between px-10 py-10">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-md px-4">
              Get certified
            </button>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold  hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              View Courses
            </button>
          </div>
        </div>

        <div className="w-[569.74px] h-[500px] rounded-sm">
          <Image
            src={studentHome}
            alt="student home"
            className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10] rounded-xl" //left 1066px top 146.78px
          />
        </div>
      </div>
      
    </div>
  );
};

export default Hero;
