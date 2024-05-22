import React from "react";

const Hero = () => {
  return (
    <div className="min-h-screen bg-[#0d3236] text-white flex flex-col items-center justify-center px-4">
      <main className="flex flex-col md:flex-row items-center md:justify-between max-w-[80vw] mx-auto">
        <div className="text-center md:text-left space-y-4 md:space-y-6 md:w-1/2">
          <h2 className="text-sm font-semibold uppercase text-yellow-700 font-montserrat">
            Banking for the modern world
          </h2>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-montserrat">
            Take control of your finances like never before
          </h1>

          <p className="text-base sm:text-base  leading-relaxed font-poppins">
            Discover innovative financial solutions designed to simplify your
            life. <br className="hidden sm:block" />We are here to help you achieve success in administering your <br className="hidden sm:block" />personal money as well as the revenues from your business.
          </p>
        </div>

        <div className="w-full md:w-1/2 p-4 flex justify-center md:justify-end mt-10">
          <img
            src="/hero/hero.png"
            alt="Professional person managing finances"
            className="rounded-lg shadow-lg w-full max-w-md"
          />
        </div>
      </main>
    </div>
  );
};

export default Hero;
