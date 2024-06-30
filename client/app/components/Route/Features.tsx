import React, { FC } from "react";
import Image from "next/image";
import certificateImage from "../../assets/certificate_image.png";

type Props = {};

const Features: FC<Props> = (props: Props) => {
  return (
    <div className="w-full max-w-screen-xl mx-auto bg-[#EED3F5] text-[#FFFFFF] flex flex-col lg:flex-row items-center py-12 px-4">
      <div className="lg:w-1/2 space-y-8 lg:space-y-6">
        <div>
          <h3 className="text-2xl lg:text-3xl font-bold mb-2">Advanced and Thrive</h3>
          <p className="text-base lg:text-lg leading-relaxed">
            The learning experience you get is rooted in the latest advancements
            in medical education. With a wide range of innovative learning tools
            to support your growth, our approach is guided by three fundamental
            principles:
          </p>
        </div>
        <div>
          <h3 className="text-xl lg:text-2xl font-semibold mb-2">Engagement</h3>
          <p className="text-base lg:text-lg leading-relaxed">
            Acquire new medical knowledge and skills through a variety of
            engaging methods, including immersive video lectures, dynamic
            medical illustrations, data representations, and interactive
            components.
          </p>
        </div>
        <div>
          <h3 className="text-xl lg:text-2xl font-semibold mb-2">Skill Development</h3>
          <p className="text-base lg:text-lg leading-relaxed">
            Practicing and demonstrating your medical knowledge is essential for
            your growth. Our courses and programs offer opportunities to hone
            your skills through quizzes, open-ended assessments, virtual
            simulations, and more.
          </p>
        </div>
        <div>
          <h3 className="text-xl lg:text-2xl font-semibold mb-2">Application Learning</h3>
          <p className="text-base lg:text-lg leading-relaxed">
            With us, reshapes your thinking and enhances your abilities, enabling
            you to directly apply your newfound expertise in real-world medical
            scenarios—immediately integrating your new skills into your medical
            practice.
          </p>
        </div>
      </div>
      <div className="lg:w-1/2 flex justify-center mt-8 lg:mt-0">
        <div className="w-3/4 lg:w-1/2">
          <Image 
            src={certificateImage}
            alt="certificate image"
            layout="responsive"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
