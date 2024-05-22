import React, { useState, useEffect, useMemo } from "react";
import { ShieldCheckIcon } from "@heroicons/react/outline";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { Link } from "react-router-dom";
import Intro from "../Intro";
import Services from "../Services";
import Footer from "../Footer";
import { Parallax, Background } from "react-parallax";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "../Hero";
import WhyChooseUs from "../WhyChooseUs";

gsap.registerPlugin(TextPlugin);

const Home = () => {
  const bgImages = [
    "/images/bg1.jpg",
    "/images/bg2.jpg",
    "/images/bg3.jpg",
    "/images/bg4.jpg",
    "/images/bg5.jpg",
    "/images/bg6.jpg",
    "/images/bg7.jpg",
  ];
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * bgImages.length);
    return bgImages[randomIndex];
  };
  const [currentImage, setCurrentImage] = useState(getRandomImage);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage(getRandomImage);
    }, 6000); // Change the interval time as needed (in milliseconds)

    return () => clearInterval(intervalId);
  }, []);

  const serviceListOne = [
    "Free account",
    "100% transparent costs",
    "24/7 support",
    "Online banking",
    "Mobile banking",
    "Full data privacy compliance",
  ];
  const serviceListTwo = [
    "Easy transfers",
    "A powerful security infrastructure",
    "Business without borders",
    "Deposit checks instantly",
    "Worldwide Coverage",
    "Affiliates and partnership",
  ];
  const serviceListThree = [
    "Corporate Cards",
    "International Investments",
    "Direct Debit",
    "Premium Support",
    "Automated Accounting",
    "Business Banking",
  ];

  return (
    <div className="">
      <div id="homePage">
        <div className="relative overflow-hidden">
          <AnimatePresence presenceAffectsLayout>
            <motion.div
              initial={{ opacity: 0.5, scale: 1, filter: "brightness(40%)" }}
              animate={{
                scale: 1.5,
                opacity: 1,
                filter: "brightness(25%)",
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                opacity: { duration: 0.55 },
                filter: { duration: 5.55 },
              }}
              style={{
                width: "100%",
                height: "100%",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                position: "absolute",
                backgroundPosition: "center center",
                backgroundImage: `url(${currentImage})`,
              }}
              key={currentImage}
              exit={{
                filter: ["brightness(40%)", "brightness(20%)"],
                transition: { duration: 1.5, ease: "easeIn" },
              }}
            ></motion.div>
          </AnimatePresence>
          <div className="px-10 md:pb-[10rem] lg:px-[10rem] h-full w-full z-10 relative items-center flex lg:items-baseline">
            <div className="pt-[5rem] w-full flex flex-col justify-center items-start relative">
              <div
                id="heading"
                className="relative whitespace-nowrap space-x-1 flex text-[#cababa] text-[18px] tracking-normal font-thin pb-11 pt-8 lg:pt-8"
              >
                <span id="heading">Invest.</span>
                <span className="items-center justify-center flex">
                  <ShieldCheckIcon className="w-5" />
                  Secure
                </span>{" "}
                .<span>Guarantee</span>
              </div>

              <h1 className="text-4xl font-montserrat pb-8 text-[#f0f0f0] lora md:max-w-lg capitalize tracking-tighter">
                Welcome to the{" "}
                <span className="border-b-2 underline border-yellow-700 font-medium tracking-tight mb-2">
                  <br /> Hackett Hill Capital,{" "}
                </span>{" "}
                Your Next Experience In Trust.
              </h1>
              <p className="max-w-[75ch] text-[16px] text-[#C0C0C0] lg:mb-6 font-montserrat tracking-tight">
                The modern banking landscape is shaped by Hackett Hill Capital.
                Everything you require in one location to construct your
                financial future. The simplest approach to handling personal
                finances. Send and receive money globally. Our goal is to help
                you achieve success in administering your personal money as well
                as the revenues from your business.
              </p>

              <div className="flex font-light text-[#ccc] flex-col md:flex-row md:pt-1 py-[2rem]">
                <Link
                  to="/sign-in"
                  id="bankings"
                  className="mr-20 cursor-pointer hover:text-blue-300 duration-500 hover:border-b-4 pb-4 border-cyan-700 mb-4"
                >
                  <div className="relative">
                    <div className="absolute top-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="ml-8">
                      <div className="mb-1">Online</div>
                      <hr className="w-[10rem]" />
                      <div className="mt-1">Banking</div>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/sign-in"
                  id="bankings"
                  className="mr-20 cursor-pointer hover:text-blue-300 duration-500 hover:border-b-4 pb-4 border-cyan-700 mb-4"
                >
                  <div className="relative">
                    <div className="absolute top-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div className="ml-8">
                      <div className="mb-1">Personal</div>
                      <hr className="w-[10rem]" />
                      <div className="mt-1">Banking</div>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/sign-in"
                  id="bankings"
                  className="mr-20 cursor-pointer hover:text-blue-300 duration-500 hover:border-b-4 border-cyan-700"
                >
                  <div className="relative">
                    <div className="absolute top-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="ml-8">
                      <div className="mb-1">Business</div>
                      <hr className="w-[10rem]" />
                      <div className="mt-1">Banking</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Hero />

        <Intro />
        <WhyChooseUs />

        <Services
          title="For People, Entrepreneurs and Business Men"
          description="Our bank is equiped with the right tools to grow both your personal and business incomex."
          image="/serviceOne.png"
          services={serviceListOne}
        />
        <Services
          title="Small- to medium-sized businesses"
          description="Our bank is perfect for SMEs"
          image="/serviceTwo.png"
          services={serviceListTwo}
          reversed={true}
        />
        <Services
          title="Large or enterprise level businesses"
          description="We render top class services to all our corporate customers, providing world class business products at their disposal."
          image="/serviceThree.png"
          services={serviceListThree}
        />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
