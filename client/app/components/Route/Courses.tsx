import React, { FC } from 'react';
import Image from 'next/image';

type Props = {}

const Courses: FC<Props> = (props: Props) => {
  const cardData = [
    {
      id: 1,
      title: "Course Title 1",
      imageSrc: "https://via.placeholder.com/400x200",
      students: 50,
      studentImages: [
        "https://via.placeholder.com/24",
        "https://via.placeholder.com/24",
        "https://via.placeholder.com/24",
        "https://via.placeholder.com/24",
        "https://via.placeholder.com/24"
      ]
    },
    {
      id: 2,
      title: "Course Title 2",
      imageSrc: "https://via.placeholder.com/400x200",
      students: 30,
      studentImages: [
        "https://via.placeholder.com/24",
        "https://via.placeholder.com/24",
        "https://via.placeholder.com/24",
        "https://via.placeholder.com/24",
        "https://via.placeholder.com/24"
      ]
    },
    {
      id: 3,
      title: "Course Title 3",
      imageSrc: "https://via.placeholder.com/400x200",
      students: 75,
      studentImages: [
        "https://via.placeholder.com/24",
        "https://via.placeholder.com/24",
        "https://via.placeholder.com/24",
        "https://via.placeholder.com/24",
        "https://via.placeholder.com/24"
      ]
    }
  ];

  return (
    <div className="container mx-auto py-8 mb-10 ">
      <h3 className="text-center text-2xl font-semibold dark:text-white">Our Top Courses</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {cardData.map((course) => (
          <div key={course.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
            <Image 
              src={course.imageSrc}
              alt={course.title}
              width={400}
              height={200}
              className="rounded-lg"
            />
            <h5 className="mt-4 text-lg font-semibold dark:text-white">{course.title}</h5>
            {/* Student images stacking */}
            <div className="flex -space-x-2 mt-2">
              {course.studentImages.map((image, i) => (
                <Image 
                  key={i}
                  src={image}
                  alt={`Student ${i}`}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800"
                />
              ))}
            </div>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{course.students} Students</p>
              <div className="flex flex-row justify-between items-center ">
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">View Course</button>
                <a href="#" className="block mt-2 text-blue-500 hover:underline">Enroll Now</a>
              </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Courses;
