import React from 'react'

const Services = ({
  title,
  image,
  description,
  reversed,
  services

}) => {
  return (
    <div className={`${reversed ? ' lg:flex-row-reverse ' : ' flex-row '}  flex px-[2rem] lg:px-[8rem] bg-gray-100 w-full h-full lg:h-[100vh] items-center justify-between flex-wrap flex-col lg:flex-row `}>
      <div className='lg:w-[45%] w-full'>
        <h1 className='text-base mb-12 font-bold font-montserrat tracking-tight'>{title}</h1>
        <div>
            <p className="text-gray-600 mb-6 font-poppins text-base">{description}</p>
            <ul className="grid lg:grid-cols-2 gap-4 w-full">
              {services.map((s, index) => (
                <li
                  key={index}
                  className="bg-gray-50 text-gray-700  rounded-xl p-4 flex items-center space-x-3"
                >
                  <span className="text-teal-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </span>
                  <span className="whitespace-nowrap font-poppins text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>

      </div>
      <div className='lg:w-[50%] w-full pb-10 lg:pb-0'>
        <img src={image} alt='heroImage' />
      </div>
    </div>
  )
}

export default Services