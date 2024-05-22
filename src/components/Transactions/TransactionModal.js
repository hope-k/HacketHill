import React from "react";
import moment from "moment";
import { motion } from "framer-motion";
import getSymbolFromCurrency from "currency-symbol-map";

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: { opacity: 1, scale: 1 },
};

const TransactionModal = ({
  modalIsOpen,
  closeModal,
  selectedTransaction,
  accounting,
  getStatusClassNames,
}) => {
  const currencySymbol = (currency) => {
    if (currency) {
      return getSymbolFromCurrency(currency);
    } else {
      return getSymbolFromCurrency("usd");
    }
  };
  return (
    modalIsOpen && (
      <motion.div
        className="fixed inset-0 flex items-center  justify-center bg-black bg-opacity-50 z-[100]"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.div
          className="bg-white rounded-2xl shadow-xl max-w-md w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl p-6 relative m-4 z-[100]"
          variants={modalVariants}
          transition={{ duration: 0.3, type: "spring" }}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            &#10005;
          </button>
          {selectedTransaction && (
            <div className="space-y-4 z-[100] relative">
              <h2 className="text-base font-semibold text-gray-800 font-montserrat">Transaction #{selectedTransaction?._id}</h2>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-bold">$</span>
                </div>
                <div>
                  <p className="text-gray-400">Amount</p>
                  <p className="text-lg font-medium text-gray-900">
                    {accounting.formatMoney(
                      selectedTransaction.amount,
                      currencySymbol(selectedTransaction?.accountId?.currency)
                    )}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className='border-b border-gray-200 md:border-b-none pb-1 '>
                  <p className="text-gray-500 text-base">Type</p>
                  <p className="text-gray-900 text-sm capitalize">{selectedTransaction.transactionType}</p>
                </div>
                <div className='border-b border-gray-200 md:border-b-none pb-1 '>
                  <p className="text-gray-500 text-base">Status</p>
                  <p className={getStatusClassNames(selectedTransaction.status)}>{selectedTransaction.status}</p> 
                </div>
                <div className='border-b border-gray-200 md:border-b-none pb-1 '>
                  <p className="text-gray-500 text-base">Recipient Routing No</p>
                  <p className='text-sm'>{selectedTransaction.payeeRoutingNumber}</p> 
                </div>
                <div className='border-b border-gray-200 md:border-b-none pb-1 '>
                  <p className="text-gray-500 text-base">Recipient Account No</p>
                  <p className='text-sm'>{selectedTransaction.payeeAccountNumber}</p> 
                </div>
                <div className='border-b border-gray-200 md:border-b-none pb-1 '>
                  <p className="text-gray-500 text-base">Date</p>
                  <p className="text-gray-900 text-sm">{moment(selectedTransaction.createdAt).format("LLL")}</p>
                </div>
                <div className='border-b border-gray-200 md:border-b-none pb-1 '>
                  <p className="text-gray-500 text-base">Account</p>
                  <h1 className="mt-1 text-sm">
                          ...{selectedTransaction?.accountId?.accountNumber.slice(-4)}{" "}
                          {selectedTransaction?.accountId?.accountType}
                        </h1>
                </div>
                <div>
                  <p className="text-gray-500 text-base">Memo</p>
                  <p className="text-gray-900 text-sm capitalize">{selectedTransaction?.memo}</p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <button
                  onClick={closeModal}
                  className="w-full py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    )
  );
};

export default TransactionModal;
