import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MobileNav from "../MobileNav";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { logout } from "../../redux/Slices/authSlice";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const dispatch = useDispatch();
  const { user, loading, isAuthenticated, pinVerified } = useSelector(
    (state) => state.auth
  );

  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const menus = [
    {
      title: "Banking",
      submenus: ["Home & Mortgages", "Credit Cards", "Checking & Savings"],
    },
    {
      title: "Online Access",
      submenus: ["Mobile Banking", "Bill Pay"],
    },
    {
      title: "Loans",
      submenus: ["Insurance", "Financial Planning"],
    },
  ];

  const toggleOpen = () => {
    setOpen(!open);
  };

  const toggleProfileOpen = () => {
    setProfileOpen(!profileOpen);
  };

  const logoutUser = () => {
    dispatch(logout());
    window.location.reload();
  };

  return (
    <>
      <MobileNav open={open} toggleOpen={toggleOpen} />

      {loading ? (
        <></>
      ) : (
        !isAuthenticated && (
          <div
            className={"hidden bg-white w-full h-[6rem] lg:flex relative z-20 "}
          >
            <div className="container px-[6rem] h-full flex items-center justify-between">
              <div className=" flex cursor-pointer">
                <Link to="/" className="">
                  <div className="w-[16rem] h-full p-2 mr-[2rem] rounded-2xl">
                    <img src="/hacketthill.png" alt="logo" />
                  </div>
                </Link>
              </div>
              <div className="flex ml-[6rem]">
                <div className="bg-slate-100 rounded-full p-4 mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-4 "
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <div className="text-slate-600 font-bold text-sm">
                    +61 3 9854 4666{" "}
                  </div>
                  <div className="text-slate-500 text-sm">
                    hacketthillau@support.com
                  </div>
                </div>
              </div>
              <div className="flex mr-[4rem] whitespace-nowrap">
                <div className="bg-slate-100 rounded-full p-4 mr-4">
                  <LocationMarkerIcon className="w-4" />
                </div>
                <div>
                  <div className="text-slate-600 font-bold text-sm">
                    232 High St
                  </div>
                  <div className="text-slate-500 text-sm">
                    {" "}
                    232 High St, Kew VIC 3101, Australia
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
      <div
        className={
          "drop-shadow-xl border-b-[.4px] border-slate-500 flex font-base text-base sticky top-0 z-[60] h-[3.5rem] " +
          (isAuthenticated &&
            !pinVerified &&
            user?.role === "user" &&
            "bg-slate-200") +
          (isAuthenticated && pinVerified
            ? " bg-transparent border-none "
            : " bg-[#fff] ") +
          (isAuthenticated &&
            user?.role?.includes("admin") &&
            " flex lg:hidden ")
        }
      >
        <div
          className={
            "px-4 md:px-10 flex p-3 justify-between w-full items-center  relative  z-[60]" +
            (!pinVerified && isAuthenticated ? " lg:flex " : " lg:hidden  ")
          }
        >
          <button
            disabled={
              isAuthenticated && !pinVerified && user?.role === "user"
                ? true
                : false
            }
            className="w-[2.5rem] p-1 relative "
            onClick={() => toggleOpen()}
          >
            <svg viewBox="0 0 100 80" width="40" height="30">
              <rect
                fill={
                  isAuthenticated && pinVerified && user?.role === "user"
                    ? "#000"
                    : "#000000"
                }
                width="100"
                height="5"
              ></rect>
              <rect
                fill={
                  isAuthenticated && pinVerified && user?.role === "user"
                    ? "#000"
                    : "#000000"
                }
                y="30"
                width="100"
                height="5"
              ></rect>
              <rect
                fill={
                  isAuthenticated && pinVerified && user?.role === "user"
                    ? "#000"
                    : "#000000"
                }
                y="60"
                width="100"
                height="5"
              ></rect>
            </svg>
          </button>
          <div className=" text-black text-sm bg-transparent p-2 font-semibold flex rounded-lg items-center  relative ">
            <div
              className={
                "text-sm bg-slate-100 p-2 rounded-lg " +
                (isAuthenticated &&
                  "text-gray-100 bg-teal-500 rounded-full p-4 cursor-pointer")
              }
            >
              {!loading && isAuthenticated ? (
                <div onClick={() => toggleProfileOpen()}>
                  <h1 className="px-4">{user?.firstName}</h1>

                  <div
                    className={
                      "flex-col bg-blue-300 absolute bottom-0 mb-[-3.9rem] right-0 rounded rounded-bl-xl rounded-br-xl  z-[70] transition duration-500 ease-in-out  " +
                      (profileOpen
                        ? " block opacity-100  visible w-fit "
                        : " invisible  opacity-0 -translate-y-3 ")
                    }
                  >
                    <div className="font-normal duration-300 bg-blue-300 rounded">
                      <div className="p-2 text-black border-b border-gray-300 hover:bg-blue-300 whitespace-nowrap duration-200 cursor-pointer">
                        Request Account Update
                      </div>
                      <div
                        onClick={() => logoutUser()}
                        className="p-2 text-red-500 hover:bg-blue-300 cursor-pointer"
                      >
                        Sign Out
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link to="/sign-in" className="flex">
                  Sign On
                  <div className="ml-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </Link>
              )}
            </div>
            {isAuthenticated && (
              <div className="ml-2 flex">
                {user?.image?.url || user?.image ? (
                  <motion.div className="flex items-center justify-center py-5 relative  rounded-full">
                    <motion.img
                      initial={{ x: 20, opacity: 0.1 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      src={user?.image?.url || user?.image}
                      alt="profile"
                      className="w-[2.6rem] h-[2.6rem] rounded-full border-teal-500 bg-gray-200 hover:bg-gray-300  flex items-center justify-center border-[1.4px] hover:border-gray-400 duration-500 object-cover "
                    />
                  </motion.div>
                ) : null}
                <ChevronDownIcon
                  onClick={() => toggleProfileOpen()}
                  className="w-4 ml-1 text-white"
                />
              </div>
            )}
          </div>
        </div>

        {!isAuthenticated && (
          <div className=" hidden container lg:flex px-[10rem] items-center text-[#665522] justify-center">
            <div className="flex w-full">
              {menus.map((menu, index) => (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() => setOpenMenu(index)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <Link
                    to="/sign-in"
                    className="duration-200 p-4 hover:text-white hover:bg-[#605111] flex items-center font-montserrat"
                  >
                    {menu.title}
                    <ChevronDownIcon
                      className={`ml-2 h-5 w-5 transform ${
                        openMenu === index ? "rotate-180" : ""
                      } transition-transform duration-200`}
                    />
                  </Link>
                    {openMenu === index && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ type: "spring", bounce: 0, duration:.15 }}
                        className="absolute left-0 w-40 mt-2 p-2 bg-white shadow-lg rounded-md"
                      >
                        {menu.submenus.map((submenu, subIndex) => (
                          <Link
                            key={subIndex}
                            to="/sign-in"
                            className="block p-2 hover:bg-[#605111] hover:rounded-lg hover:text-white duration-100 text-sm font-poppins"
                          >
                            {submenu}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                </div>
              ))}
            </div>

            <div className="flex">
              <Link
                to="/register"
                className="duration-200 p-4  whitespace-nowrap hover:text-white hover:bg-[#605111]"
              >
                Request Account
              </Link>
              <Link
                to="/sign-in"
                className="whitespace-nowrap duration-200 p-4 flex hover:text-white hover:bg-[#605111] text-[#665522] font-semibold"
              >
                Sign On
                <div className="ml-2 pt-[2px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
