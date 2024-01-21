import React, { useEffect, useLayoutEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { XIcon } from '@heroicons/react/solid'
import gsap from 'gsap'
import { BiTransfer } from 'react-icons/bi'
import { FaFileInvoice } from 'react-icons/fa'
import { GiHistogram } from 'react-icons/gi'
import { HiOutlineLogout } from 'react-icons/hi'
import { BsEnvelope, BsCashCoin, BsQuestionCircle } from 'react-icons/bs'
import { VscRemote } from 'react-icons/vsc'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/Slices/authSlice'


const MobileNav = ({ open, toggleOpen }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isAuthenticated, user } = useSelector(state => state.auth)
    const location = useLocation()
    const t1 = React.useRef()
    useLayoutEffect(() => {
        t1.current = gsap.timeline({ paused: true, defaults: { duration: .25 } })
            .to('#menu', {
                xPercent: 100,
                ease: 'power4.out'
            })
    }, [])

    useEffect(() => {
        if (open) {
            t1.current.play()
        } else {
            t1.current.reverse()
        }
    }, [open, t1])
    const logoutUser = () => {
        dispatch(logout());
        navigate(0)

    }




    return (
        <div id='menu' className='bg-slate-100 h-[98%] w-[70%] fixed top-0 px-0 lg:hidden z-[81] translate-x-[-100%] rounded-tr-2xl rounded-br-2xl my-[2%] drop-shadow-xl'>
            <div className='px-4 mt-2'>
                <div className='w-8 fixed right-0 top-4 mr-3 z-[1]' onClick={() => toggleOpen()}>
                    <XIcon />
                </div>
                <div className=' cursor-pointer'>
                    <Link to='/' className=' z-[-1] relative top-[2.3rem]'>
                        <div className=''>
                            <img className='' src='/hacketthill.png' alt='logo' />
                        </div>
                    </Link>
                </div>
                {//<div className='mt-4'>
                    //   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute " viewBox="0 0 20 20" fill="currentColor">
                    //       <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    //   </svg>
                    //   <input
                    //       type='text'
                    //       placeholder='Search'
                    //       className='border-b border-gray-400 bg-slate-100 pl-8 pb-1'
                    //  />
                    //</div>
                }
            </div>
            {
                user && user?.role?.includes('admin') ?
                    <div className='container  w-full  flex-col flex justify-center text-gray-600 font-semibold items-center duration-200 h-full'>
                        <Link onClick={() => toggleOpen()} to={'/admin/users'} className={' rounded-md duration-500  p-2 my-4 ' + (location.pathname === '/admin/users' && 'bg-teal-600 text-white  ')}>Users</Link>
                        <Link onClick={() => toggleOpen()} to={'/admin/transactions'} className={' rounded-md  p-2 my-4 duration-500 ' + (location.pathname === '/admin/transactions' && 'bg-teal-600 text-white ')}>Transactions</Link>
                        <Link onClick={() => toggleOpen()} to={'/admin/statistics'} className={' rounded-md  p-2 my-4 duration-500 ' + (location.pathname === '/admin/statistics' && 'bg-teal-600 text-white ')}>Statistics</Link>
                        <Link onClick={() => toggleOpen()} to={'/admin/accounts'} className={' rounded-md  p-2 my-4 duration-500 whitespace-nowrap ' + (location.pathname === '/admin/accounts' && 'bg-teal-600 text-white ')}>User Bank Account</Link>
                        <Link onClick={() => toggleOpen()} to={'/admin/deposit'} className={' rounded-md  p-2 my-4 duration-500 whitespace-nowrap ' + (location.pathname === '/admin/deposit' && 'bg-teal-600 text-white ')}>Deposit Money</Link>
                        <Link onClick={() => toggleOpen()} to={'/admin/messages'} className={' rounded-md  p-2 my-4 duration-500 ' + (location.pathname === '/admin/messages' && 'bg-teal-600 text-white ')}>Send Messages</Link>
                        <div onClick={() => logoutUser()} className='text-red-500 cursor-pointer my-4'>Log Out</div>
                    </div>
                    :
                    <div className='container w-full flex flex-col h-full pt-[8rem] font-montserrat'>
                        <div className='font-semibold w-full'>
                            <Link to={'/'} onClick={() => toggleOpen()} className={'duration-500 px-6 py-[0.62rem]  mb-8  flex ' + (isAuthenticated && 'hidden')}>
                                <div className='mr-1 stroke-[#060926]'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="" strokeWidth="1.2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                </div>
                                Home
                            </Link>
                            <Link to={isAuthenticated ? '/account/dashboard' : '/sign-in'} onClick={() => toggleOpen()} className={'duration-500 px-4 py-[0.62rem]  mb-6  flex ' + (location.pathname === '/account/dashboard' && ' flex  bg-[#74b3e750] font-semibold border-l-[5.5px] border-green-600')}>
                                {
                                    isAuthenticated ?
                                        <div className={' flex items-center '}>
                                            <FaFileInvoice className={'mr-3 text-lg text-[#3ebde4]'} />
                                            Account Summary
                                        </div>
                                        :
                                        <div className='flex px-2'>
                                            <div className='mr-1 stroke-[#060926]'>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="" strokeWidth="1.2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            My Accounts
                                        </div>
                                }
                            </Link>
                            <Link to={isAuthenticated ? '/account/transfer' : 'sign-in'} onClick={() => toggleOpen()} className={'duration-500 px-6 py-[0.62rem] mb-6  flex ' + (location.pathname === '/account/transfer' && 'bg-[#74b3e750] flex  font-semibold border-l-[5.5px] border-green-600')}>
                                {
                                    isAuthenticated ?
                                        <div className={' flex items-center '}>
                                            <BiTransfer className='mr-1 text-2xl text-[#3ebde4]' />
                                            Transfer Funds
                                        </div> :
                                        <div className='flex'>
                                            <div className='mr-1 stroke-[#060926]'>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="">
                                                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            Credit Cards
                                        </div>
                                }
                            </Link>
                            <Link to={isAuthenticated ? '/account/transactions' : 'sign-in'} onClick={() => toggleOpen()} className={'duration-500 px-6 py-[0.62rem] mb-6  flex ' + (location.pathname === '/account/transactions' && 'bg-[#74b3e750] flex  font-semibold border-l-[5.5px] border-green-600')}>
                                {
                                    isAuthenticated ?
                                        <div className={'flex items-center '}>
                                            <GiHistogram className='mr-1 text-2xl text-[#3ebde4]' />
                                            Transactions
                                        </div> :
                                        <div className='flex'>
                                            <div className='mr-1 stroke-[#060926]'>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="" strokeWidth="1.2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </div>
                                            Savings
                                        </div>
                                }
                            </Link>
                            {
                                isAuthenticated && (
                                    <div>
                                        <Link to='/account/messages' onClick={() => toggleOpen()} className={'duration-500 mb-5 flex items-center   px-6 py-[0.62rem] ' + (location.pathname === '/account/messages' && 'bg-[#74b3e750] flex  font-semibold border-l-[5.5px] border-green-600')}>
                                            <BsEnvelope className='mr-2 text-2xl text-[#3ebde4]' />
                                            Messages
                                        </Link>
                                        <Link to='/account/payments' onClick={() => toggleOpen()} className={'duration-500 mb-5 flex items-center   px-6 py-[0.62rem] ' + (location.pathname === '/account/payments' && 'bg-[#74b3e750] flex  font-semibold border-l-[5.5px] border-green-600')}>
                                            <BsCashCoin className='mr-2 text-2xl text-[#3ebde4]' />
                                            Payments
                                        </Link>
                                        <div className='mb-5 flex items-center   px-6 py-[0.62rem]'>
                                            <VscRemote className='mr-2 text-2xl text-[#3ebde4]' />
                                            Remote Deposits
                                        </div>
                                        <a href='mailto:support@rothbardau.com' className='mb-5 flex items-center   px-6 py-[0.62rem]'>
                                            <BsQuestionCircle className='mr-2 text-2xl text-[#3ebde4]' />
                                            Support
                                        </a>
                                    </div>
                                )
                            }

                            <div onClick={() => toggleOpen()} className='px-6 py-[0.62rem] mb-6 flex'>

                                {
                                    isAuthenticated ?
                                        <div className=' flex items-center' onClick={() => logoutUser()} >
                                            <HiOutlineLogout className='mr-1 text-2xl text-red-600' />
                                            Sign Out
                                        </div> :
                                        <div className='flex flex-col'>
                                            <div className='flex'>
                                                <div className='mr-1 stroke-[#060926]'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="" strokeWidth="1.2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                Loans
                                            </div>
                                            <Link to='register' className='flex mt-6 border-l-4 border-black bg-transparent p-2 rounded text-[#060926]'>
                                                Apply Now
                                            </Link>
                                        </div>
                                }
                            </div>

                        </div>
                        <div className='px-4 pt-5'>
                            <h1 className='text-gray-400 border-t font-semibold  border-gray-300'>Country: AU</h1>
                        </div>
                        <div className='absolute bottom-0 px-4 mt-4'>
                            <h1 className='text-gray-500 border-t border-gray-300'>
                                Language: English
                            </h1>
                        </div>
                    </div>
            }

        </div>
    )
}

export default MobileNav