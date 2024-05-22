import React from "react";
import {
  FaRegThumbsUp,
  FaShieldAlt,
  FaMobileAlt,
  FaDollarSign,
} from "react-icons/fa";

function WhyChooseUs() {
  const reasons = [
    {
      icon: (
        <img
          src="/why-choose-us/nofees.svg"
          alt="No fees"
          className="w-it h-it mb-2"
        />
      ),
      title: "No fees",
      description:
        "We are trusted by millions of customers worldwide for our secure and reliable banking services.",
    },
    {
      icon: (
        <img
          src="/why-choose-us/support.svg"
          alt="No fees"
          className="w-it h-it mb-2"
        />
      ),
      title: "Customer Support",
      description:
        "Your security is our top priority. We use advanced encryption methods to protect your data.",
    },
    {
      icon: (
        <img
          src="/why-choose-us/planning.svg"
          alt="No fees"
          className="w-it h-it mb-2"
        />
      ),
      title: "Goal Planning",
      description:
        "Manage your finances on the go with our user-friendly mobile banking app.",
    },
    {
      icon: (
        <img
          src="/why-choose-us/like.svg"
          alt="No fees"
          className="w-it h-it mb-2"
        />
      ),
      title: "100% guarantee",
      description:
        "Enjoy competitive interest rates and low fees on all our financial products.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-start">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 font-montserrat">
            Here’s why you
            <br /> should choose
            <br /> us for banking
          </h1>
          <p className="text-base text-gray-700 font-poppins">
            At our bank, we prioritize your needs and provide top-notch services
            to ensure you have the best banking experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg text-left"
            >
              <div className="p-2 bg-teal-500/20 rounded-full w-10 h-10">{reason.icon}</div>
              <h2 className="text-[16px] font-bold text-gray-900 mb-2 font-poppins">
                {reason.title}
              </h2>
              <p className="text-gray-700 font-poppins text-sm">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;
