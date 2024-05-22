import React, { useEffect, useLayoutEffect, useState } from 'react'
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
import { motion } from 'framer-motion'
import { ChevronDownIcon } from '@heroicons/react/solid';
 



const MobileNav = ({ open, toggleOpen }) => {
    const [openMenu, setOpenMenu] = useState(null);

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isAuthenticated, user } = useSelector(state => state.auth)
    const location = useLocation()
    const t1 = React.useRef()

    useLayoutEffect(() => {
        t1.current = gsap.timeline({ paused: true, defaults: { duration: .55 } })
            .to('#menu', {
                xPercent: 100,
                ease: 'expo.out'
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
        <div id='menu' className='bg-white h-[100dvh] w-[70%] fixed top-0 px-0 lg:hidden z-[81] translate-x-[-100%] rounded-tr-lg rounded-br-lg  drop-shadow-xl'>
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
                        {/* Unauthenticated Links */}
                        {!isAuthenticated && (
                    <>
                        <div className='mb-1'>
                            <div onClick={() => toggleMenu('bank')} className='flex justify-between items-center px-6 py-3 cursor-pointer border-b border-gray-200'>
                                <span className='text-sm'>Bank</span>
                                <motion.div
                                    initial={false}
                                    animate={{ rotate: openMenu === 'bank' ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDownIcon className='h-5 w-5' />
                                </motion.div>
                            </div>
                            {openMenu === 'bank' && (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto', transition: { duration: 0.3, type:"spring", bounce:0 }} }
                                    className='overflow-hidden bg-gray-100'>
                                    <Link to='/sign-in' className='block px-8 py-2 text-sm font-medium text-gray-700 border-b border-gray-200 '>Checking</Link>
                                    <Link to='/sign-in' className='block px-8 py-2 text-sm font-medium text-gray-700 border-b border-gray-200 '>Home & Mortgages</Link>
                                    <Link to='/sign-in' className='block px-8 py-2 text-sm font-medium text-gray-700 '>Credit Cards</Link>
                                </motion.div>
                            )}
                        </div>

                        <div className='mb-1'>
                            <div onClick={() => toggleMenu('services')} className='flex justify-between items-center px-6 py-3 cursor-pointer border-b border-gray-200'>
                                <span className='text-sm'>Services</span>
                                <motion.div
                                    initial={false}
                                    animate={{ rotate: openMenu === 'services' ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDownIcon className='h-5 w-5' />
                                </motion.div>
                            </div>
                            {openMenu === 'services' && (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto', transition: { duration: 0.3, type:"spring", bounce:0 }} }
                                    className='overflow-hidden bg-gray-100'>
                                    <Link to='/sign-in' className='block px-8 py-2 text-sm font-medium text-gray-700 border-b border-gray-200'>Financial Planning</Link>
                                    <Link to='/sign-in' className='block px-8 py-2 text-sm font-medium text-gray-700 border-b border-gray-200'>Loans</Link>
                                    <Link to='/sign-in' className='block px-8 py-2 text-sm font-medium text-gray-700'>Insurance</Link>
                                </motion.div>
                            )}
                        </div>

                        <div className='mb-1'>
                            <div onClick={() => toggleMenu('online-banking')} className='flex justify-between items-center px-6 py-3 cursor-pointer border-b border-gray-200'>
                                <span className='text-sm'>Online Banking</span>
                                <motion.div
                                    initial={false}
                                    animate={{ rotate: openMenu === 'online-banking' ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDownIcon className='h-5 w-5' />
                                </motion.div>
                            </div>
                            {openMenu === 'online-banking' && (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto', transition: { duration: 0.3, type:"spring", bounce:0 }} }
                                    className='overflow-hidden bg-gray-100'>
                                    <Link to='/sign-in' className='block px-8 py-2 text-sm font-medium text-gray-700 border-b border-gray-200'>Online Access</Link>
                                    <Link to='/sign-in' className='block px-8 py-2 text-sm font-medium text-gray-700 border-b border-gray-200'>Mobile Banking</Link>
                                    <Link to='/sign-in' className='block px-8 py-2 text-sm font-medium text-gray-700'>Bill Pay</Link>
                                </motion.div>
                            )}
                        </div>

                        <div className='mb-1'>
                            <div onClick={() => toggleMenu('customer-support')} className='flex justify-between items-center px-6 py-3 cursor-pointer border-b border-gray-200'>
                                <span className='text-sm'>Customer Support</span>
                                <motion.div
                                    initial={false}
                                    animate={{ rotate: openMenu === 'customer-support' ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDownIcon className='h-5 w-5' />
                                </motion.div>
                            </div>
                            {openMenu === 'customer-support' && (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto', transition: { duration: 0.3, type:"spring", bounce:0 }} }
                                    className='overflow-hidden bg-gray-100'>
                                    <Link to='/sign-in' className='block px-8 py-2 text-sm font-medium text-gray-700 border-b border-gray-200'>Contact Us</Link>
                                    <Link to='/sign-in'  className='block px-8 py-2 text-sm font-medium text-gray-700 border-b border-gray-200'>FAQ</Link>
                                    <Link to='/sign-in' className='block px-8 py-2 text-sm font-medium text-gray-700'>Support</Link>
                                </motion.div>
                            )}
                        </div>
                        <div className='mb-1'>
                            <div onClick={() => toggleMenu('account')} className='flex justify-between items-center px-6 py-3 cursor-pointer border-b border-gray-200'>
                                <span className='text-sm'>Account</span>
                                <motion.div
                                    initial={false}
                                    animate={{ rotate: openMenu === 'account' ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDownIcon className='h-5 w-5' />
                                </motion.div>
                            </div>
                            {openMenu === 'account' && (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto', transition: { duration: 0.3, type:"spring", bounce:0 }} }
                                    className='overflow-hidden bg-gray-100'>
                                    <Link to='/register' className='block px-8 py-2 text-sm font-medium text-gray-700 border-b border-gray-200'>Open an account</Link>
                         
                                </motion.div>
                            )}
                        </div>
                    </>
                )}
            
                        {/* Authenticated Links */}
                        {isAuthenticated && (
                            <>
                                <Link to='/account/dashboard' onClick={() => toggleOpen()} className={`duration-500 px-4 py-[0.62rem] mb-6 flex ${location.pathname === '/account/dashboard' && 'bg-[#74b3e750] font-semibold border-l-[5.5px] border-green-600'}`}>
                                    <div className='flex items-center'>
                                        <FaFileInvoice className='mr-3 text-lg text-[#3ebde4]' />
                                        Account Summary
                                    </div>
                                </Link>
            
                                <Link to='/account/transfer' onClick={() => toggleOpen()} className={`duration-500 px-6 py-[0.62rem] mb-6 flex ${location.pathname === '/account/transfer' && 'bg-[#74b3e750] font-semibold border-l-[5.5px] border-green-600'}`}>
                                    <div className='flex items-center'>
                                        <BiTransfer className='mr-1 text-2xl text-[#3ebde4]' />
                                        Transfer Funds
                                    </div>
                                </Link>
            
                                <Link to='/account/transactions' onClick={() => toggleOpen()} className={`duration-500 px-6 py-[0.62rem] mb-6 flex ${location.pathname === '/account/transactions' && 'bg-[#74b3e750] font-semibold border-l-[5.5px] border-green-600'}`}>
                                    <div className='flex items-center'>
                                        <GiHistogram className='mr-1 text-2xl text-[#3ebde4]' />
                                        Transactions
                                    </div>
                                </Link>
            
                                <Link to='/account/messages' onClick={() => toggleOpen()} className={`duration-500 mb-5 flex items-center px-6 py-[0.62rem] ${location.pathname === '/account/messages' && 'bg-[#74b3e750] font-semibold border-l-[5.5px] border-green-600'}`}>
                                    <BsEnvelope className='mr-2 text-2xl text-[#3ebde4]' />
                                    Messages
                                </Link>
            
                                <Link to='/account/payments' onClick={() => toggleOpen()} className={`duration-500 mb-5 flex items-center px-6 py-[0.62rem] ${location.pathname === '/account/payments' && 'bg-[#74b3e750] font-semibold border-l-[5.5px] border-green-600'}`}>
                                    <BsCashCoin className='mr-2 text-2xl text-[#3ebde4]' />
                                    Payments
                                </Link>
            
                                <div className='mb-5 flex items-center px-6 py-[0.62rem]'>
                                    <VscRemote className='mr-2 text-2xl text-[#3ebde4]' />
                                    Remote Deposits
                                </div>
            
                                <a href='mailto:hacketthillcapital@support.com' className='mb-5 flex items-center px-6 py-[0.62rem]'>
                                    <BsQuestionCircle className='mr-2 text-2xl text-[#3ebde4]' />
                                    Support
                                </a>
            
                                <div onClick={() => toggleOpen()} className='px-6 py-[0.62rem] mb-6 flex'>
                                    <div className='flex items-center' onClick={() => logoutUser()}>
                                        <HiOutlineLogout className='mr-1 text-2xl text-red-600' />
                                        Sign Out
                                    </div>
                                </div>
                            </>
                        )}
                        </div>
            
                
                    <div className='absolute bottom-0 px-4 mt-4'>
                        <h1 className='text-gray-500 border-t border-gray-300 text-xs'>
                            Language: English
                        </h1>
                    </div>
                </div>
            } 


        </div>
    )
}

export default MobileNav