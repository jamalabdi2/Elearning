import React, { FC } from 'react';
import Image from 'next/image';
import visionGirl from "../../assets/visionGirl.jpeg";
import love from "../../assets/love.png";

type Props = {}

const MissionVision: FC<Props> = (props: Props) => {
  return (
    <div className="container mx-auto py-12 px-4 text-center">
      <h3 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Mission and Vision</h3>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
        <div className="lg:w-1/2 flex flex-col items-center space-y-6">
          <div className="w-64 h-64">
            <Image 
              src={love}
              alt='Love'
              layout="responsive"
              width={800}
              height={800}
              className="rounded-lg"
            />
          </div>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Our mission is to realize a future where healthcare delivery consistently achieves the highest standards of excellence and leads the continuous transformation of the healthcare system.
          </p>
        </div>
        <div className="lg:w-1/2 flex flex-col items-center space-y-6">
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            We have a vision to cultivate a generation of transformative healthcare professionals and visionary leaders who are unwavering champions of quality improvement.
          </p>
          <div className="w-64 h-80">
            <Image 
              src={visionGirl}
              alt='visionGirl'
              layout="responsive"
              width={478.73}
              height={626}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MissionVision;
