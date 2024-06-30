"use client";
import React, { useState, FC } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero"
import Courses from "./components/Route/Courses";
import Features from "./components/Route/Features";
import { FaEraser } from "react-icons/fa";
import MissionVision from "./components/Route/MissionVision";
import Testimonials from "./components/Route/Testimonials";
import Footer from "./components/Route/Footer";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login")

  return (
    <div>
      <Heading
        title="Elearning"
        description="Elearning platform for medical professionals to learn and upskil"
        keywords="Elearning,MERN,Redux,Programming"
      />
      <Header 
      open={open} 
      activeItem={activeItem} 
      setOpen={setOpen} 
      setRoute={setRoute}
      route={route}
      
      />
      <Hero />
      <Courses/>
      <Features/>
      <MissionVision/>
      <Testimonials/>
      <Footer/>


   
    </div>
  );
};

export default Page;
