import React, { useEffect, useState, useRef } from "react";
import { MdAccountBalance } from "react-icons/md";
import { Outlet } from "react-router-dom";
import DashboardNav from "../DashboardNav";
import ExpenseChart from "../ExpenseChart";
import IncomeCharts from "../IncomeCharts";
import { BellIcon } from "@heroicons/react/outline";
import { WiSunrise } from "react-icons/wi";
import { BsSun, BsArrowDownLeft, BsArrowUpRight } from "react-icons/bs";
import { MoonIcon } from "@heroicons/react/solid";
import {
  UserCircleIcon,
  ChevronDownIcon,
  SearchIcon,
  CashIcon,
  ClockIcon,
} from "@heroicons/react/outline";
import { MdOutlinePersonOutline } from "react-icons/md";
import { BiTransfer } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NumberFormat from "react-number-format";
import { getMyAccounts } from "../../redux/Slices/accountsSlice";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { getMyStats } from "../../redux/Slices/statsSlice";
import { getMyTransactions } from "../../redux/Slices/transactionsSlice";
import moment from "moment";
import ClockLoader from "react-spinners/ClockLoader";
import { getMyMessages } from "../../redux/Slices/messagesSlice";
import accounting from "accounting";
import { logout } from "../../redux/Slices/authSlice";
import { motion } from "framer-motion";
import { Watch } from "react-loader-spinner";
import TransactionSkeleton from "../TransactionSkeleton/index.";
import AccountSkeleton from "../AccountSkeleton";
import getSymbolFromCurrency from "currency-symbol-map";
import TransactionModal from "../Transactions/TransactionModal";
import { AiOutlineEye } from "react-icons/ai";

const AccountDashboard = ({ toggleProfileDropdown, profileDropdown }) => {
  const stickyElement = useRef(null);
  const root = useRef(null);
  const [dashTextOpacity, setDashTextOpacity] = useState(1);
  const navigate = useNavigate();
  const t1 = useRef();
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  useEffect(() => {
    t1.current = gsap.timeline({}).to("#profileMenu", {
      y: 5,
      ease: "power4.inOut",
      display: "block",
      opacity: 1,
    });
  }, []);

  useEffect(() => {
    if (profileDropdown) {
      t1.current.play();
    } else {
      t1.current.reverse();
    }
  }, [profileDropdown, t1]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyAccounts());
    dispatch(getMyStats());
    dispatch(getMyTransactions({ page: 1, limit: 4 }));
    dispatch(getMyMessages());
  }, [dispatch, isAuthenticated, token]);

  const { user } = useSelector((state) => state.auth);
  const { stats } = useSelector((state) => state.stats);
  const { transactions } = useSelector((state) => state.transactions);
  const { messages } = useSelector((state) => state.messages);
  const { accounts, loading } = useSelector((state) => state.accounts);
  const myDate = new Date();
  const hrs = myDate.getHours();

  const showGreet = () => {
    if (hrs < 12) {
      return (
        <h1 className="flex items-center">
          <WiSunrise className="text-3xl" />
          Good Morning
        </h1>
      );
    } else if (hrs >= 12 && hrs <= 17) {
      return (
        <h1 className="flex items-center">
          <BsSun className="text-3xl" />
          Good Afternoon
        </h1>
      );
    } else if (hrs >= 17 && hrs <= 24) {
      return (
        <h1 className="flex items-center">
          <MoonIcon className="w-6" />
          Good Evening
        </h1>
      );
    }
  };
  const logoutUser = () => {
    dispatch(logout());
    navigate(0);
  };
  const recentTransactions = transactions && transactions.slice(0, 4);
  const recentMessages = messages && messages && messages.slice(0, 2);

  useEffect(() => {
    const handleScroll = () => {
      const rect = stickyElement.current.getBoundingClientRect();
      if (rect.top <= 0) {
        // The sticky element has reached the top, so you can perform your action here
        setDashTextOpacity(0);
      } else {
        setDashTextOpacity(1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getStatusClassNames = (status) => {
    const commonClasses =
      "font-semibold text-xs capitalize border-l p-[0.2rem] rounded-sm ";
    switch (status) {
      case "declined":
        return commonClasses + "text-red-500 border-red-600";
      case "failed":
        return commonClasses + "text-red-500 border-red-600";
      case "reversed":
        return commonClasses + "text-red-500 border-red-500 ";
      case "complete":
        return commonClasses + "text-green-600 border-green-600";
      case "on-hold":
        return commonClasses + "text-yellow-500 border-yellow-600";
      case "awaiting-approval":
        return commonClasses + "text-blue-500 border-blue-600";
      case "refunded":
        return commonClasses + "text-purple-500 border-purple-600";
      default:
        return "font-semibold text-sm capitalize";
    }
  };

  const currencySymbol = (currentCurrency) => {
    if (currentCurrency) {
      return getSymbolFromCurrency(currentCurrency);
    } else {
      return getSymbolFromCurrency("usd");
    }
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const openModal = (transaction) => {
    setSelectedTransaction(transaction);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
    setModalIsOpen(false);
  };

  return (
    <>
      <TransactionModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        selectedTransaction={selectedTransaction}
        accounting={accounting}
        currencySymbol={currencySymbol}
        setModalIsOpen={setModalIsOpen}
        getStatusClassNames={getStatusClassNames}
      />
      <div className="lg:w-[83.6%] lg:absolute lg:right-0 relative">
        <div className="lg:px-10  relative px-4 ">
          <div className="flex bg-blue-200 my-16 justify-between lg:px-[7rem] rounded-md mx-4 relative z-50">
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.85, ease: "easeInOut" }}
              className="text-2xl font-light p-4 flex"
            >
              {showGreet()}, {user?.firstName}
            </motion.div>
            <div
              onClick={() => toggleProfileDropdown()}
              className="cursor-pointer items-center font-thin hidden lg:flex bg-teal-700 my-2 px-2 rounded-full text-gray-100 relative "
            >
              {user?.image?.url || user?.image ? (
                <motion.img
                  initial={{ x: 15, opacity: 0.1 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  src={user?.image?.url || user?.image}
                  alt="profile"
                  className="w-[2.6rem] h-[2.6rem] rounded-full relative right-[.4rem]"
                />
              ) : null}
              {user?.firstName} {user?.lastName}
              <ChevronDownIcon className="w-4 ml-1" />
              <div
                id="profileMenu"
                className={
                  "flex-col bg-blue-200 absolute bottom-0 mb-[-4.5rem] rounded rounded-bl-xl rounded-br-xl z-50 lg:hidden lg:opacity-0"
                }
              >
                <div className="font-normal">
                  <div className="p-2 text-black border-b border-gray-300 hover:bg-blue-300 hover:rounded-xl whitespace-nowrap cursor-pointer">
                    Request Account Update
                  </div>
                  <div
                    onClick={() => logoutUser()}
                    className="p-2 text-red-500 hover:bg-blue-300 hover:rounded-xl cursor-pointer"
                  >
                    Sign Out
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            ref={root}
            className="container lg:px-[7rem] pb-[4rem] rounded-xl z-40 relative  "
          >
            <div
              ref={stickyElement}
              className={
                "sticky top-0 my-16 bg-gray-100 rounded  text-gray-500 flex items-center p-4 justify-between lg:px-6 z-50 " +
                (dashTextOpacity === 0 && "shadow-2xl")
              }
            >
              <h1
                className={
                  `text-md font-semi  flex items-center  duration-300 ` +
                  (dashTextOpacity === 0 ? "opacity-0 " : "opacity-100 ")
                }
              >
                Dashboard
                <MdAccountBalance className="ml-2" />
              </h1>
              <Link to="/account/messages">
                {recentMessages &&
                  recentMessages
                    .slice(0, 1)
                    .map(
                      (message) =>
                        moment(message?.createdAt).fromNow() ===
                          ("a few seconds ago" ||
                            "44 seconds ago" ||
                            "a minute ago") && (
                          <div className=" absolute right-5 top-3 bg-blue-400 rounded-full p-1"></div>
                        )
                    )}
                <BellIcon
                  className={
                    "w-6 lg:opacity-100 " +
                    (dashTextOpacity === 0 ? "opacity-0 " : "opacity-100 ")
                  }
                />
              </Link>
            </div>
            <div className="">
              <div className={"mb-4 bg-gray-100 p-4 lg:p-[5rem] rounded-xl"}>
                <motion.div layout className="flex flex-wrap md:space-x-4">
                  {loading ? (
                    <AccountSkeleton />
                  ) : accounts?.length === 0 ? (
                    <div className="w-full p-10 text-xl text-red-600 bg-gray-200 rounded-xl font-montserrat font-extralight">
                      !!NO ACCOUNTS OPENED CONTACT ADMIN!!
                    </div>
                  ) : (
                    accounts?.map((account) => (
                      <div
                        key={account?._id}
                        className="cursor-pointer bg-gradient-to-r from-teal-500 to-teal-700 h-fit  w-[18rem] rounded-lg text-white relative border-none mb-4 lg:mb-2 py-1 px-3 transition-transform transform hover:scale-[1.01]"
                      >
                        <div className="flex justify-between  mb-1 border-b border-teal-500 pb-1">
                          <h1 className="font-semibold text-sm capitalize">
                            {account?.accountType} account ...
                            {account?.accountNumber.slice(-4)}
                          </h1>
                          <div className="bg-teal-600 p-2 rounded-full"></div>
                        </div>
                        <div className="text-start">
                          <h1 className="text-[16px] font-normal font-poppins tracking-wide">
                            {accounting.formatMoney(
                              account?.balance,
                              currencySymbol(account?.currency)
                            )}
                          </h1>
                          <h1 className="font-light text-sm  text-gray-200 ">
                            Available Balance
                          </h1>
                        </div>
                      </div>
                    ))
                  )}
                </motion.div>

                <div className="flex flex-wrap justify-around">
                  <div
                    className={
                      "bg-gray-200 rounded-3xl mb-6 mt-4 lg:my-6  px-4 shadow-2xl"
                    }
                  >
                    <IncomeCharts stats={stats} />
                  </div>
                  <div
                    className={
                      " bg-gray-200  rounded-3xl mb-6 lg:my-6 px-4 shadow-2xl"
                    }
                  >
                    <ExpenseChart stats={stats} />
                  </div>
                </div>
              </div>
              <div className="w-full  grid lg:grid-cols-2 lg:grid-rows-2 gap-[1rem] grid-cols-1">
                <motion.div
                  layout
                  className="bg-gray-100 h-full w-full row-span-2 row rounded-xl"
                >
                  <div className="p-6">
                    <div className="flex justify-between mb-6 items-center">
                      <h1 className="font-semibold">Recent Transactions</h1>
                      <SearchIcon className="w-6" />
                    </div>
                    {loading ? (
                      <TransactionSkeleton numOfSkeletons={4} />
                    ) : !recentTransactions?.length ? (
                      <div className="px-2 flex items-center justify-center p-4 h-full">
                        <div className=" bg-gray-200 p-4 rounded-3xl">
                          No Recent Transactions
                        </div>
                      </div>
                    ) : (
                      recentTransactions &&
                      recentTransactions.map((transaction) => {
                        const isDiscoverCard =
                          transaction?.memo === "discover_card_info";

                        return (
                          <div
                            key={transaction?._id}
                            className="w-full my-2 pb-3 cursor-pointer border-b border-slate-200 hover:bg-slate-100 p-2  hover:px-3 hover:rounded-xl transition-all duration-100 ease-in-out"
                            onClick={() => openModal(transaction)}
                          >
                            <h1 className="font-semibold text-[.75rem] flex items-center capitalize tracking-wide">
                              {transaction?.transactionType}
                              {transaction?.transactionType === "transfer" ? (
                                <BsArrowUpRight className="text-red-500" />
                              ) : (
                                <BsArrowDownLeft className="text-green-600" />
                              )}
                            </h1>
                            <div className="flex justify-between items-center leading-5">
                              <div className="flex text-sm items-center">
                                {transaction?.status === "pending" ? (
                                  <Watch
                                    height="16"
                                    width="16"
                                    radius="40"
                                    color="#4fa94d"
                                    ariaLabel="watch-loading"
                                    wrapperStyle={{}}
                                    wrapperClassName=""
                                    visible={true}
                                  />
                                ) : (
                                  <h1
                                    className={getStatusClassNames(
                                      transaction?.status
                                    )}
                                  >
                                    {transaction?.status === "complete"
                                      ? "sent"
                                      : transaction?.status}
                                  </h1>
                                )}
                                {/* <h1 className="text-gray-500 mx-2 text-[.8rem] font-light lg:font-normal">
                                  {moment(transaction?.createdAt).format("LLL")}
                                </h1> */}
                                {transaction?.isDiscoverCard ? (
                                  <h1 className="text-teal-600 font-extralight text-center">
                                    ...7944 Discover Card
                                  </h1>
                                ) : (
                                  <h1 className="text-gray-500 text-center hidden md:block">
                                    ...
                                    {transaction?.accountId?.accountNumber.slice(
                                      -4
                                    )}{" "}
                                    {transaction?.accountId?.accountType}
                                  </h1>
                                )}
                              </div>
                              <h1
                                className={
                                  "font-semibold whitespace-nowrap " +
                                  (transaction?.transactionType === "transfer"
                                    ? "text-red-500"
                                    : "text-[#00A389]")
                                }
                              >
                                {transaction?.transactionType === "transfer"
                                  ? "-" +
                                    accounting.formatMoney(
                                      transaction?.amount,
                                      currencySymbol(
                                        transaction?.accountId?.currency
                                      )
                                    )
                                  : "+" +
                                    accounting.formatMoney(
                                      transaction?.amount,
                                      currencySymbol(
                                        transaction?.accountId?.currency
                                      )
                                    )}
                              </h1>
                              <div className="flex text-xs underline items-center justify-center space-x-1">
                                <AiOutlineEye className="text-gray-500 hover:text-gray-700 ml-2" />
                                <span>view details</span>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </motion.div>
                <div className="bg-gray-100 rounded-xl ">
                  <div className="px-2">
                    <h1 className="font-semibold px-4 py-4">Payments</h1>
                    <div className="flex  mt-6 justify-evenly border-b border-gray-300 pb-6 items-end">
                      <Link
                        to="/account/transfer"
                        className="flex flex-col items-center font-semibold text-sm"
                      >
                        <CashIcon className="w-6 stroke-[#90996e]" />
                        Pay a bill
                      </Link>
                      <Link
                        to="/account/transfer"
                        className="flex flex-col items-center font-semibold text-sm"
                      >
                        <MdOutlinePersonOutline className="text-[1.7rem] text-[#90996e]" />
                        Pay a Person
                      </Link>
                      <Link
                        to="/account/transfer"
                        className="flex flex-col items-center font-semibold text-sm"
                      >
                        <BiTransfer className="text-[1.4rem] text-[#90996e]" />
                        Transfer
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-xl p-4 relative">
                  <h1 className="font-semibold lg:absolute top-1">
                    Recent Messages
                  </h1>
                  {!recentMessages?.length ? (
                    <div className="px-2 flex items-center justify-center p-4 lg:h-full">
                      <div className=" bg-gray-200 p-4 rounded-3xl">
                        No New Messages
                      </div>
                    </div>
                  ) : (
                    recentMessages &&
                    recentMessages.map((message) => (
                      <>
                        <div
                          key={message?._id}
                          className="px-2 flex  p-3 mt-6 relative bg-slate-50 rounded-md shadow-lg"
                        >
                          <div className="flex flex-col">
                            <h1 className="font-normal text-[.9rem] border-[1.3px] border-teal-500 w-fit p-[.2rem] rounded-lg ">
                              {message?.title}
                            </h1>
                            <h1 className="text-[.92rem] font-[350] border-l border-yellow-600 pl-1 mt-3 rounded">
                              {message?.text}
                            </h1>
                          </div>
                          <h1 className="absolute right-0 font-extralight text-[.81rem]">
                            {moment(message?.createdAt).fromNow()}
                          </h1>
                        </div>
                        <hr className="border-b border-gray-200" />
                      </>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDashboard;
