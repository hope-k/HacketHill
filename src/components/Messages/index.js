import React, { useEffect } from 'react'
import { BsEnvelope } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { getMyMessages } from '../../redux/Slices/messagesSlice'


const Messages = () => {
    const dispatch = useDispatch();
    const { messages } = useSelector(state => state.messages);
    useEffect(() => {
        dispatch(getMyMessages())
    },[dispatch])
    
    return (
        <div className='lg:w-[83.6%] lg:absolute lg:right-0 z-50 relative'>
            <div className='relative z-50 py-[6rem]'>
                <h1 className='lg:px-[7rem] top-[15rem] px-4 text-white font-semibold text-xl flex items-center fixed lg:top-40'>
                    Messages <BsEnvelope className='ml-2 text-2xl text-white' />
                </h1>
                <div className='flex h-full items-center mt-[15rem]'>
                    <div className="container relative px-[1.5rem] md:px-[5rem] lg:px-[20rem] ">
                        <div className='bg-gray-100 p-4  rounded-xl shadow-2xl'>
                            <h1 className='font-semibold px-4 mb-2 lg:absolute '>Messages</h1>
                            <div className="px-2 flex-col items-center justify-center p-4 h-full">
                                {
                                    !messages?.length ?
                                        <div className="px-2 flex items-center justify-center p-4 lg:h-full">
                                            <div className=' bg-gray-200 p-4 rounded-3xl'>
                                                No New Messages
                                            </div>
                                        </div>
                                    :
                                        messages && messages.map((message) => (
                                            <>
                                                <div key={message?._id} className='px-4 py-3 flex mt-3 relative bg-white rounded-lg border-b border-gray-200'>
                                                    <div className="flex flex-col">
                                                        <h1 className='font-semibold text-sm text-gray-400 mb-1'>{message?.title}</h1>
                                                        <p className='text-sm text-gray-700 mt-2'>{message?.text}</p>
                                                    </div>
                                                    <span className='absolute right-4 top-3 text-xs text-gray-500'>{moment(message?.createdAt).fromNow()}</span>
                                                </div>
                                                <hr className='border-t border-gray-300 mt-4' />
                                            </>
                                        ))
                                }
                            </div>

                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Messages