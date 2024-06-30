import React, { FC } from 'react';
import Image from 'next/image';

type Props = {}

const Testimonials: FC<Props> = () => {
  const testimonials = [
    {
      id: 1,
      name: "Student One",
      imageSrc: "https://via.placeholder.com/150",
      testimonial: "This platform has greatly enhanced my medical knowledge and skills.",
      stars: 5
    },
    {
      id: 2,
      name: "Student Two",
      imageSrc: "https://via.placeholder.com/150",
      testimonial: "The courses are well-structured and engaging.",
      stars: 4
    },
    {
      id: 3,
      name: "Student Three",
      imageSrc: "https://via.placeholder.com/150",
      testimonial: "I highly recommend this platform for all medical professionals.",
      stars: 5
    }
  ];

  return (
    <div className='w-full max-w-screen-xl mx-auto bg-gray-300 rounded-lg p-8'>
      <h3 className='text-3xl font-bold text-center mb-8 text-gray-800'>Certified Students</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((student) => (
          <div key={student.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <div className="mb-4">
              <Image
                src={student.imageSrc}
                alt={student.name}
                width={150}
                height={150}
                className="mx-auto rounded-full"
              />
            </div>
            <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{student.name}</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{student.testimonial}</p>
            <div className="flex justify-center">
              {[...Array(student.stars)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927C9.432 1.573 10.568 1.573 10.951 2.927L12.216 7.154C12.34 7.603 12.742 7.947 13.21 7.947H17.672C18.662 7.947 19.034 9.23 18.241 9.715L14.417 12.065C14.017 12.305 13.843 12.821 13.967 13.271L15.232 17.498C15.615 18.852 14.283 19.83 13.49 19.345L9.665 17.995C9.265 17.755 8.735 17.755 8.335 17.995L4.51 19.345C3.717 19.83 2.385 18.852 2.768 17.498L4.033 13.271C4.157 12.821 3.983 12.305 3.583 12.065L-0.241 9.715C-1.034 9.23 -0.662 7.947 0.328 7.947H4.79C5.258 7.947 5.66 7.603 5.784 7.154L7.049 2.927C7.432 1.573 8.568 1.573 8.951 2.927H9.049Z" />
                </svg>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
