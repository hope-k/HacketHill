import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNotifications } from 'reapop';
import NumberFormat from 'react-number-format';
import { adminDeposit, resetAdminTransactionsError, resetAdminTransactionsSuccess } from '../../redux/Slices/adminTransactionsSlice';


const AdminDeposit = () => {

    const [status, setStatus] = useState('sent');
    const [transactionType, setTransactionType] = useState('deposit');
    const [amount, setAmount] = useState('');
    const [accountID, setAccountID] = useState('');
    const [userID, setUserID] = useState('');

    const { notify } = useNotifications();
    const { error, success, loading } = useSelector(state => state.adminTransactions)
    const dispatch = useDispatch();



    useEffect(() => {

        if (loading) {
            notify('Processing Transaction...', 'loading', { dismissible: false })
        }
        if (error?.length) {
            error?.forEach(err => {
                notify(err, { title: 'Transaction Error', status: 'error' })

            })
            dispatch(resetAdminTransactionsError())
        }
        if (success) {
            notify('Transaction Approved and is Being Processed', { title: 'Transaction Being Processed', status: 'success' })
            dispatch(resetAdminTransactionsSuccess());
        }

    }, [error, dispatch, notify, loading, success]);




    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(adminDeposit({ user: userID, amount: amount, accountId: accountID, transactionType: transactionType, status: status }));

        setUserID('')
        setAccountID('')
        setAmount('')
        setStatus('')


    }






    return (
        <>
            <div className='flex flex-col justify-center'>
                <form className='px-4 ' onSubmit={submitHandler}>

                    <div className='mt-6 bg-slate-100 border border-gray-200 rounded-xl p-6 flex flex-col justify-center items-center'>
                        <h1 className='mb-4 flex justify-start w-full font-bold'>DEPOSIT AMOUNT
                        </h1>
                        <div className='mt-6  flex flex-wrap justify-center lg:px-12 lg:w-[50rem]'>
                            <div className='flex flex-col relative m-5 w-fit h-fit '>
                                <select
                                    className='z-[1] rounded-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-green-700 focus-within:border-b'
                                    type='text'
                                    placeholder=' '
                                    value={transactionType}
                                    disabled
                                >
                                    <option value={'deposit'}>DEPOSIT</option>
                                </select>
                            </div>
                            <div className='flex flex-col relative m-5 w-fit h-fit '>
                                <select
                                    className='z-[1] rounded-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-green-700 focus-within:border-b'
                                    type='text'
                                    placeholder=' '
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value={'sent'}>Sent</option>
                                    <option value={'pending'}>Pending</option>
                                    <option value={'complete'}>Complete</option>
                                    <option value={'declined'}>Declined</option>
                                    <option value={'on-hold'}>On Hold</option>
                                    <option value={'refunded'}>Refunded</option>
                                    <option value={'awaiting-approval'}>Awaiting Approval</option>
                                    <option value={'reversed'}>Awaiting Approval</option>
                                </select>
                            </div>
                            <div className='flex flex-col relative m-5 w-fit h-fit '>
                                <input
                                    className='z-[1] rounded-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-green-700 focus-within:border-b'
                                    type='number'
                                    placeholder=' '
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}

                                />
                                <label className=' lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-teal-500 peer-focus:font-semibold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none text-gray-500'>
                                    $ Amount
                                </label>

                            </div>
                            <div className='flex flex-col relative m-5 w-fit h-fit '>
                                <input
                                    className='z-[1] rounded-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-green-700 focus-within:border-b'
                                    type='text'
                                    placeholder=' '
                                    value={accountID}
                                    onChange={(e) => setAccountID(e.target.value)}

                                />
                                <label className=' lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-teal-500 peer-focus:font-semibold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none text-gray-500'>
                                    ACCOUNT ID
                                </label>

                            </div>
                            <div className='flex flex-col relative m-5 w-fit h-fit '>
                                <input
                                    className='z-[1] rounded-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-green-700 focus-within:border-b'
                                    type='text'
                                    placeholder=' '
                                    value={userID}
                                    onChange={(e) => setUserID(e.target.value)}

                                />
                                <label className=' lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-teal-500 peer-focus:font-semibold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none text-gray-500'>
                                    USER ID
                                </label>

                            </div>

                        </div>

                        <button type='submit' className=' bg-[#3ebde4] m-5 w-fit p-2 text-white font-semibold rounded-md px-6'>
                            DEPOSIT
                        </button>
                    </div>
                </form>

            </div>
        </>
    )
}

export default AdminDeposit