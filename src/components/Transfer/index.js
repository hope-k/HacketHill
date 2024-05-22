import React, { useEffect, useState } from "react";
import { BiTransfer } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import NumberFormat from "react-number-format";
import { getMyAccounts } from "../../redux/Slices/accountsSlice";
import accounting from "accounting";
import {
  makeTransfer,
  resetTransferSuccess,
  resetTransferError,
} from "../../redux/Slices/transferSlice";
import { useNotifications } from "reapop";
import { useNavigate } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";
import { RotatingLines } from "react-loader-spinner";
import Lottie from "lottie-react";
import transferLoader from "../../animations/transferLoader.json";
import getSymbolFromCurrency from "currency-symbol-map";

const Transfer = () => {
  const navigate = useNavigate();
  const { notify } = useNotifications();
  const { error, loading, success } = useSelector((state) => state.transfer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error?.length) {
      error?.forEach((err) => {
        notify(err, {
          title: "An error occurred while trying to process your transaction",
          status: "error",
          id: "transfer",
        });
      });
      dispatch(resetTransferError());
    }
    if (success) {
      notify("Transaction Approved and is Being Processed", {
        title: "Transaction Being Processed",
        status: "success",
        id: "transfer",
      });
      dispatch(resetTransferSuccess());
      navigate("/account/transactions");
    }
  }, [error, dispatch, notify, success, navigate]);

  useEffect(() => {}, [dispatch]);

  useEffect(() => {
    if (loading) {
      notify("Processing Transaction...", "loading", {
        dismissible: false,
        id: "transfer",
      });
    }
  }, [loading, notify]);

  const { accounts } = useSelector((state) => state.accounts);
  const [payeeAccountNumber, setPayeeAccountNumber] = useState("");
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
  const [payeeRoutingNumber, setPayeeRoutingNumber] = useState("");
  const [memo, setMemo] = useState("");
  const [amount, setAmount] = useState("");
  const [accountId, setAccountId] = useState(`${accounts?.[0]?._id}`);
  const selectedAccount = accounts?.find(
    (account) => account._id === accountId
  );

  const submitHandler = (e) => {
    e.preventDefault();
    const transferDetails = {
      payeeAccountNumber,
      confirmAccountNumber,
      payeeRoutingNumber,
      memo,
      amount,
      accountId,
    };
    dispatch(makeTransfer(transferDetails));
  };

  const handleSelect = (id) => {
    setAccountId(id);
  };
  const currencySymbol = (currency) => {
    if (currency) {
      return getSymbolFromCurrency(currency);
    } else {
      return getSymbolFromCurrency("usd");
    }
  };

  return (
    <div className="lg:w-[83.6%] lg:absolute lg:right-0 z-50 relative">
      <h1 className="lg:px-[7rem] top-[15rem] px-4 text-white font-semibold text-xl flex items-center fixed lg:top-40">
        Transfer Funds <BiTransfer className="ml-2 text-2xl text-white" />
      </h1>
      <div className="flex h-full items-center mt-[20rem]">
        <div className="container relative px-[1.5rem] md:px-[5rem] lg:px-[20rem] pb-6">
          <div className="bg-white p-4 pb-10 rounded-xl shadow-2xl">
            
            <form className="px-4 " onSubmit={submitHandler}>
              <div className="flex justify-between mt-4 border-b border-gray-300 py-4 ">
                <div className="relative">
                <label htmlFor="from" className="font-normal text-gray-400 mb-1">
                  Select Account
                </label>
                  <ul className=" z-10 m-1 bg-white rounded-lg shadow-md flex flex-col md:flex-row">
                    {accounts &&
                      accounts.map((account) => (
                        <li key={account?._id} className="m-1">
                          <button
                            type="button"
                            onClick={() => handleSelect(account?._id)}
                            className={
                              (accountId === account?._id &&
                                " border-teal-500 border-2 rounded-lg") +
                              " w-full px-4 py-2 text-left hover:bg-gray-200 bg-slate-100 rounded-lg m-1"
                            }
                          >
                            <div className="flex flex-row item-center">
                              <span className="pr-6">
                                ...{account?.accountNumber.slice(-4)}{" "}
                                {account?.accountType}{" "}
                              </span>
                              {accountId === account?._id && (
                                <div className="rounded-full bg-teal-100">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-teal-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-row items-center ">
                              <h1 className="text-gray-400 text-sm pr-6">
                                Available Balance
                              </h1>

                              <span className="font-normal text-gray-600">
                                {accounting.formatMoney(
                                  account?.balance,
                                  currencySymbol(account?.currency)
                                )}
                              </span>
                            </div>
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              <div className="mt-6 rounded-xl p-6 flex flex-col justify-center items-center">
                <h1 className="mb-4 flex justify-start w-full font-semibold text-gray-400">
                  Transfer To:
                </h1>
                <div className="mt-6  flex flex-wrap justify-between">
                  <div className="flex flex-col relative mt-8 w-fit h-fit ">
                    <input
                      className="z-[1] rounded-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-green-700 focus-within:border-b"
                      type="text"
                      placeholder=" "
                      onChange={(e) => setPayeeRoutingNumber(e.target.value)}
                    />
                    <label className=" lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-teal-500 peer-focus:font-semibold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-sm text-sm pointer-events-none text-gray-500">
                      Routing Number
                    </label>
                  </div>
                  <div className="flex flex-col relative mt-6 w-fit h-fit">
                    <input
                      className="z-[1] rounded-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-green-700 focus-within:border-b"
                      type="text"
                      placeholder=" "
                      onChange={(e) => setPayeeAccountNumber(e.target.value)}
                    />
                    <label className=" lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-teal-500 peer-focus:font-semibold    peer-placeholder-shown:top-[0] peer-placeholder-shown:text-sm text-sm pointer-events-none text-gray-500">
                      Account Number
                    </label>
                  </div>
                  <div className="flex flex-col relative mt-6 w-fit h-fit">
                    <input
                      className="z-[1] rounded-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-green-700 focus-within:border-b"
                      type="text"
                      placeholder=" "
                      onChange={(e) => setConfirmAccountNumber(e.target.value)}
                    />
                    <label className=" whitespace-nowrap lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-teal-500 peer-focus:font-semibold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-sm text-sm pointer-events-none text-gray-500">
                      Confirm Account Number
                    </label>
                  </div>
                  <div className="flex flex-col relative mt-6 w-fit h-fit">
                    <input
                      className="z-[1] rounded-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-green-700 focus-within:border-b"
                      type="text"
                      placeholder=" "
                      onChange={(e) => setMemo(e.target.value)}
                    />
                    <label className=" whitespace-nowrap lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-teal-500 peer-focus:font-semibold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-sm text-sm pointer-events-none text-gray-500">
                      Memo
                    </label>
                  </div>
                  <div className="flex flex-col relative mt-6 w-fit h-fit rounded-xl">
                    <NumberFormat
                      className=" bg-[#cfcece33] peer pb-2 rounded-none border-b-2 border-green-700 outline-none mb-6 placeholder-transparent focus-within:border-green-700 focus-within:border-b"
                      thousandsGroupStyle="thousand"
                      prefix={
                        getSymbolFromCurrency(selectedAccount?.currency)
                          ? getSymbolFromCurrency(selectedAccount?.currency)
                          : "$"
                      }
                      decimalSeparator="."
                      displayType="input"
                      type="tel"
                      placeholder=""
                      thousandSeparator={true}
                      onValueChange={(value) => setAmount(value.floatValue)}
                    />
                    <label className="whitespace-nowrap lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-teal-500 peer-focus:font-semibold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-sm text-sm pointer-events-none text-gray-500">
                      Amount {getSymbolFromCurrency(selectedAccount?.currency)}
                    </label>
                  </div>
                </div>

                <button
                  disabled={loading ? true : false}
                  type="submit"
                  className={
                    (loading ? "bg-red-500" : "bg-[#3ebde4]") +
                    "  h-fit  p-2 text-white font-semibold rounded-md px-6 disabled:opacity-70 flex items-center justify-center"
                  }
                >
                  {loading ? (
                    <div className=" w-full md:w-[10rem] h-full ">
                      <Lottie animationData={transferLoader} />
                    </div>
                  ) : (
                    <span>Send</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
