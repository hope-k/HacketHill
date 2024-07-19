import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNotifications } from "reapop";
import {
  deleteAccount,
  getAllAccounts,
  resetAdminAccountsError,
  resetAdminAccountsSuccess,
  updateAccount,
  createAccount,
} from "../../redux/Slices/adminAccountsSlice";
import { DataGrid } from "@mui/x-data-grid";
import accounting from "accounting";
import Lottie from "lottie-react";
import lottieSpinner from "../../animations/lottieSpinner";
import getSymbolFromCurrency from "currency-symbol-map";

const AdminBankAccount = () => {
  const currencies = [
    "usd",
    "eur",
    "gbp",
    "cad",
    "aud",
    "inr",
    "cny",
    "jpy",
    "krw",
    "rub",
    "brl",
    "zar",
    "ngn",
    "kes",
    "ghs",
    "ugx",
    "tzs",
    "zwd",
    "zmk",
    "xof",
    "xaf",
    "xdr",
  ];
  const [accountType, setAccountType] = useState("checking");
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState("");
  const [accountID, setAccountID] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [editField, setEditField] = useState("");
  const [editID, setEditID] = useState("");
  const [editValue, setEditValue] = useState("");
  const { notify } = useNotifications();
  const { error, success, accounts, loading } = useSelector(
    (state) => state.adminAccounts
  );
  const dispatch = useDispatch();

  const deleteAccountHandler = (e) => {
    e.preventDefault();

    dispatch(deleteAccount({ id: accountID }));
    setAccountID("");
  };

  useEffect(() => {
    if (editField && editValue && editID) {
      dispatch(
        updateAccount({ value: editValue, field: editField, id: editID })
      );
    }
  }, [dispatch, editField, editID, editValue]);

  useEffect(() => {
    dispatch(getAllAccounts());

    if (error?.length) {
      error?.forEach((err) => {
        notify(err, "error");
      });
      dispatch(resetAdminAccountsError());
    }

    if (success) {
      notify("Action was successful", "success");
      dispatch(resetAdminAccountsSuccess());
    }
  }, [error, success, dispatch, notify]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(createAccount({ accountType, balance, user, currency }));
    setAccountType(accountType);
    setBalance("");
  };
  const columns = [
    { field: "id", headerName: "Account ID", width: 270 },
    { field: "currency", headerName: "Currency", width: 200 },
    { field: "accountType", headerName: "Account Type", editable: true },
    { field: "balance", headerName: "Balance", editable: true },
    { field: "accountNumber", headerName: "accountNumber", width: 180 },
    { field: "user", headerName: "User ID", editable: true, width: 250 },
    { field: "fullName", headerName: "Full name", width: 200 },
  ];

  const rows = [];

  accounts &&
    accounts?.forEach((account) => {
      rows.push({
        id: account?._id,
        currency: account?.currency,
        accountType: account?.accountType,
        balance: account?.balance,
        accountNumber: account?.accountNumber,
        user: account?.user?._id,
        fullName: account?.user?.firstName + " " + account?.user?.lastName,
      });
    });

  return (
    <>
      <div className="flex flex-col justify-center">
        <form className="px-4 " onSubmit={submitHandler}>
          <div className="mt-6 bg-slate-100 border border-gray-200 rounded-xl p-6 flex flex-col justify-center items-center">
            <h1 className="mb-4 flex justify-start w-full font-bold">
              ADD BANK ACCOUNT
            </h1>
            <div className="mt-6  flex flex-wrap justify-center lg:px-12 lg:w-[50rem]">
              <div className="flex flex-col relative m-5 w-fit h-fit ">
                <select
                  className="z-[1] rounded-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-green-700 focus-within:border-b"
                  type="text"
                  placeholder=" "
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                >
                  <option value={"checking"}>Checking</option>
                  <option value={"savings"}>Savings</option>
                  <option value={"investments"}>investments</option>
                </select>
              </div>

              <div className="flex flex-col relative m-5 w-fit h-fit ">
                <select
                  className="z-[1] rounded-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-green-700 focus-within:border-b"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  {currencies.map((currency, index) => (
                    <option key={index} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
                <label className="lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-teal-500 peer-focus:font-semibold peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none text-gray-500">
                  Currency
                </label>
              </div>

              <div className="flex flex-col relative m-5 w-fit h-fit ">
                <input
                  className="z-[1] rounded-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-green-700 focus-within:border-b"
                  type="number"
                  placeholder=""
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                />
                <label className=" lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-teal-500 peer-focus:font-semibold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none text-gray-500">
                  {getSymbolFromCurrency(currency)} Balance
                </label>
              </div>
              <div className="flex flex-col relative m-5 w-fit h-fit ">
                <input
                  className="z-[1] rounded-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-green-700 focus-within:border-b"
                  type="text"
                  placeholder=" "
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
                <label className=" lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-teal-500 peer-focus:font-semibold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none text-gray-500">
                  USER ID
                </label>
              </div>
            </div>

            <button
              type="submit"
              className=" bg-[#3ebde4] m-5 w-fit p-2 text-white font-semibold rounded-md px-6"
            >
              Add Bank Account
            </button>
          </div>
        </form>
        <div className="flex flex-col justify-center w-full items-center p-8">
          <div className="bg-slate-100 m-5 max-w-fit rounded-xl">
            <h1 className="px-20 p-8 font-bold ">
              {accounts?.length ? (
                <span className="whitespace-nowrap">
                  {accounts?.length} Bank Account(s)
                </span>
              ) : (
                loading && (
                  <div className="w-full h-full">
                    <Lottie
                      animationData={lottieSpinner}
                      className=" w-20 h-20 "
                    />
                  </div>
                )
              )}
            </h1>
          </div>
          <form className="flex items-center " onSubmit={deleteAccountHandler}>
            <div className="flex flex-col relative m-5 w-fit h-fit border-2 rounded-lg bg-red-100">
              <input
                className="z-[1] rounded-lg bg-transparent peer pb-2 outline-none  placeholder-transparent focus-within:border-green-700 focus-within:border-b"
                type="text"
                placeholder=" "
                onChange={(e) => setAccountID(e.target.value)}
                value={accountID}
              />
              <label className="px-3 font-semibold text-black lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-red-500 peer-focus:font-bold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none">
                ACCOUNT ID
              </label>
            </div>
            <button
              type="submit"
              className="text-sm bg-red-400 h-fit w-fit p-1 font-semibold rounded-lg"
            >
              DELETE ACCOUNT
            </button>
          </form>
          <div className="h-[30rem] w-full px-4 flex justify-center items-center bg-slate-100  rounded-3xl ">
            <DataGrid
              rows={rows}
              columns={columns}
              disableSelectionOnClick
              onCellEditCommit={(cell) => {
                setEditField(cell.field);
                setEditValue(cell.value);
                setEditID(cell.id);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminBankAccount;
