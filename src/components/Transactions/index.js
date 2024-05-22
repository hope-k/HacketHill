import "react-loading-skeleton/dist/skeleton.css";
import React, { useEffect, useState } from "react";
import { BsArrowDownLeft, BsArrowUpRight } from "react-icons/bs";
import { SearchIcon } from "@heroicons/react/outline";
import { useSelector, useDispatch } from "react-redux";
import { GiChecklist } from "react-icons/gi";
import { getMyTransactions } from "../../redux/Slices/transactionsSlice";
import moment from "moment";
import ClockLoader from "react-spinners/ClockLoader";
import accounting from "accounting";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaEllipsisH } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { Watch } from "react-loader-spinner";
import Skeleton from "react-loading-skeleton";
import { motion } from "framer-motion";
import TransactionSkeleton from "../TransactionSkeleton/index.";
import getSymbolFromCurrency from "currency-symbol-map";
import TransactionModal from "./TransactionModal";
import { AiOutlineEye } from "react-icons/ai";

const Transactions = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getMyTransactions({ page: page }));
  }, [dispatch, page]);

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  const { transactions, loading, totalPages, hasNextPage, hasPrevPage } =
    useSelector((state) => state.transactions);

  const currencySymbol = (transaction) => {
    const currency = transaction?.accountId?.currency;
    if (currency) {
      return getSymbolFromCurrency(currency);
    } else {
      return getSymbolFromCurrency("usd");
    }
  };

  const getStatusClassNames = (status) => {
    const commonClasses =
      "font-semibold text-xs capitalize border-l p-[0.2rem] rounded-sm ";
    switch (status) {
      case "declined":
        return commonClasses + "text-red-500 border-red-600";
      case "failed":
        return commonClasses + "text-red-500 border-red-600";
      case "reversed":
        return commonClasses + "text-red-500 border-red-500";
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
        setModalIsOpen={setModalIsOpen}
        getStatusClassNames={getStatusClassNames}
      />
      <motion.div
        layout
        className="lg:w-[83.6%] lg:absolute lg:right-0 z-30  relative "
      >
        <h1 className="lg:px-[7rem] top-[15rem] p-4 text-white font-semibold text-xl flex items-center fixed lg:top-40">
          Transactions <GiChecklist className="ml-2 text-2xl text-white" />
        </h1>
        <div className="h-full pt-[20rem] lg:px-[16rem] md:px-[4rem] container px-4  relative">
          <div className="bg-white w-full row rounded-xl h-full pt-3 shadow-2xl relative">
            <div className="p-4 lg:p-6 relative">
              <div className="flex justify-between mb-6 items-center">
                <h1 className="font-semibold">Transactions</h1>
                <SearchIcon className="w-6" />
              </div>

              {loading ? (
                <TransactionSkeleton numOfSkeletons={3} />
              ) : !transactions?.length ? (
                <div className="px-2 flex items-center justify-center p-4 h-full">
                  <div className=" bg-gray-200 p-4 rounded-3xl">
                    No Transactions
                  </div>
                </div>
              ) : (
                transactions &&
                transactions.map((transaction) => {
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
                              {transaction?.accountId?.accountNumber.slice(-4)}{" "}
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
                                currencySymbol(transaction)
                              )
                            : "+" +
                              accounting.formatMoney(
                                transaction?.amount,
                                currencySymbol(transaction)
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
              {(hasNextPage || hasPrevPage) && (
                <ReactPaginate
                  breakLabel="..."
                  nextLabel={
                    <div className="flex items-center justify-center px-2 py-1">
                      {" "}
                      <FaChevronRight />{" "}
                    </div>
                  }
                  previousLabel={
                    <div className="flex items-center justify-center px-2 py-1">
                      {" "}
                      <FaChevronLeft />{" "}
                    </div>
                  }
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={1}
                  pageCount={totalPages}
                  renderOnZeroPageCount={null}
                  containerClassName={
                    " flex items-center justify-center w-full "
                  }
                  activeClassName={
                    "duration-300 ease-out mx-2  bg-teal-600 text-white rounded-full px-2 py-1 flex items-center justify-center border-white border"
                  }
                  pageLinkClassName={"px-2 py-1 rounded-full"}
                  nextClassName={
                    "rounded-full mx-2 border-teal-500 border  flex items-center justify-center"
                  }
                  previousClassName={
                    "rounded-full mx-2 border-teal-500 border  flex items-center justify-center"
                  }
                />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Transactions;
