import React, { useEffect, useLayoutEffect, useState } from 'react'
import { LockClosedIcon, FingerPrintIcon } from '@heroicons/react/outline'
import gsap from 'gsap'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'
import { login } from '../../redux/Slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNotifications } from 'reapop'
import { resetAuthError } from '../../redux/Slices/authSlice'
import FadeLoader from 'react-spinners/FadeLoader'
import { useNavigate } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'
import { motion } from 'framer-motion'

const LoginPage = () => {
    const { error, loading, isAuthenticated, user } = useSelector(state => state.auth)
    const { notify } = useNotifications()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate()

    const togglePasswordVisible = () => {
        setPasswordVisible(!passwordVisible);
    }

    useEffect(() => {

        if (error?.length) {
            error?.forEach(err => {
                notify(err, { title: 'Please Check Your Credentials', showDismissButton: true, status: err.includes('processed') ? 'loading' : 'error' })
            })
            dispatch(resetAuthError());
        }
    }, [error, notify, dispatch, isAuthenticated, loading, user])
    useLayoutEffect(() => {
        gsap.from('#loginPage', {
            opacity: 0,
            duration: .85,
            ease: 'power4.inOut'

        })
    }, []);
    const submitHandler = (e) => {
        e.preventDefault();
        const userObj = {
            username,
            password
        }
        dispatch(login(userObj));
    }

    useEffect(() => {
        if (isAuthenticated && user?.role === 'user') {
            navigate('/pin')
        } else if (user?.role === ('admin' || 'super-admin') && isAuthenticated) {
            navigate('/admin/users')
        }
    }, [isAuthenticated, user?.role, navigate])

    return (
        <div className='relative' id='loginPage'>
        <div className="loginBg"></div>
        <div className='pt-20 flex justify-center px-2 md:px-24 lg:px-7 relative '>
            <div className=' bg-white z-10 lg:p-12 flex flex-col rounded-2xl relative lg:w-[40%] w-full '>
                <div className='relative  pb-24 mt-6 whitespace-nowrap justify-center flex flex-col items-center'>
                    <h1 className='font-semibold text-lg text-[black] flex lg:flex-row flex-col justify-center relative'>
                    Welcome Back! Secure Sign-In
                        <div className='flex w-full justify-center mt-1 lg:mt-0'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 ml-2 mb-[.3rem]  lg:mt-1" fill="none" viewBox="0 0 24 24" stroke="#1c2c5e" strokeWidth="1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                        </div>
                    </h1>


                </div>
                <form className='flex flex-col mx-6 pb-28' onSubmit={submitHandler}>
                    <div className='flex flex-col relative mb-10 lg:mb-8 '>
                        <input
                            className='z-[1] rounded-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-green-700 focus-within:border-b-2 '
                            type='text'
                            placeholder=' '
                            onChange={e => setUsername(e.target.value)}
                            value={username}

                        />
                        <label className='flex lg:flex duration-200 transition-all ease-in-out absolute top-[-2rem] peer-focus:top-[-2rem] peer-focus:scale-90  peer-placeholder-shown:top-[0] pointer-events-none'>
                            <FingerPrintIcon className='w-4 mr-2 flex' />
                            User ID
                        </label>

                    </div>
                    <div className='flex flex-col relative pb-8 lg:pb-1'>
                        <input
                            onChange={e => setPassword(e.target.value)}
                            className='z-[1] rounded-none tracking-wider appearance-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-green-700 focus-within:border-b-2'
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder=' '
                            value={password}

                        />
                        <div className='cursor-pointer absolute w-6 right-4 z-10' onClick={() => togglePasswordVisible()}>
                            {passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
                        </div>
                        <label className='flex lg:flex duration-200 transition-all ease-in-out absolute top-[-2rem] peer-focus:top-[-2rem] peer-focus:scale-90  peer-placeholder-shown:top-[0] pointer-events-none'>
                            <LockClosedIcon className='w-4 mr-2 flex' />
                            Password
                        </label>

                    </div>
                    <button disabled={loading && true} type='submit' className='bg-[#1c2c5e] duration-300 text-[white] h-14  rounded-lg mb-4 disabled:bg-[#1c2d5e8e] flex justify-center items-center'>
                        {
                            loading ?
                                <motion.div
                                    initial={{ opacity: 0.9, scale: 0.7 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.35 }}
                                >
                                    <Oval
                                        strokeColor="white"
                                        strokeWidth="1.5"
                                        animationDuration="0.75"
                                        width="35"
                                        ariaLabel='loading'
                                        visible={true}



                                    />

                                </motion.div> :
                                <h4>Sign On</h4>
                        }
                    </button>

                </form>
                <div className=' bg-[rgba(0,0,0,0.35)] absolute left-0 bottom-0 w-full lg:h-16 p-4'>
                    <div className='cursor-pointer flex flex-col lg:flex-row w-full h-full text-[#ccc] text-[.9rem] px-8 underline justify-between items-center'>
                        <h1>Forgot user ID?</h1>
                        <h1>Reset Password</h1>
                        <h1>Activate a card </h1>
                        <h1>Register for online access</h1>
                    </div>
                </div>
            </div>


        </div>
    </div>
    )
}

export default LoginPage