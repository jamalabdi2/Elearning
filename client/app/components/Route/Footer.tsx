import React, { FC } from "react";
import Image from "next/image";
import companyLogo from "../../assets/company_logo.png";
import Link from "next/link";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { HiOutlinePhone, HiOutlineEnvelope } from "react-icons/hi2";
import { HiOutlineHome, HiOutlineInformationCircle, HiOutlineAcademicCap, HiOutlineUser } from "react-icons/hi";

type Props = {};

const Footer: FC<Props> = (props: Props) => {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="mb-6 sm:mb-0">
            <Image src={companyLogo} alt="company logo" className="h-12 w-auto" />
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Quick Links</h2>
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <Link href="/" className="hover:underline flex items-center">
                  <HiOutlineHome className="mr-2 w-5 h-5" />
                  Home
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/about" className="hover:underline flex items-center">
                  <HiOutlineInformationCircle className="mr-2 w-5 h-5" />
                  About
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/courses" className="hover:underline flex items-center">
                  <HiOutlineAcademicCap className="mr-2 w-5 h-5" />
                  Courses
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/profile" className="hover:underline flex items-center">
                  <HiOutlineUser className="mr-2 w-5 h-5" />
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Get Help</h2>
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <a href="tel:0700000000" className="hover:underline flex items-center">
                  <HiOutlinePhone className="mr-2 w-5 h-5" />
                  0700 000 000
                </a>
              </li>
              <li className="mb-4">
                <a href="mailto:instituite@gmail.com" className="hover:underline flex items-center">
                  <HiOutlineEnvelope className="mr-2 w-5 h-5" />
                  instituite@gmail.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow Us</h2>
            <div className="flex mt-4 space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <FaFacebook className="w-6 h-6" />
                <span className="sr-only">Facebook page</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <FaTwitter className="w-6 h-6" />
                <span className="sr-only">Twitter page</span>
              </a>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="text-center">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024 Institute Of HealthCare Quality. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;