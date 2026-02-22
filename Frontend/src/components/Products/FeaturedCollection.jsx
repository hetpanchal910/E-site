import React from 'react'
import { Link } from "react-router-dom"
const FeaturedCollection = () => {
  return (
      <div className="mt-8 w-full h-screen flex justify-center  items-center ">
          <div className="flex flex-col md:flex-row bg-blue-100 h-[80%] w-[80%] rounded-lg ">
              
              <div className="w-full h-1/2 md:h-auto py-1 md:w-1/2 flex flex-col px-6 items-center justify-start md:items-start md:justify-center space-y-2 md:py-0 md:space-y-4">
                  <h5 className=" text:[12px] md:text-sm font-medium text-gray-900">Comfort and Style</h5>
                  <h1 className=" text-[20px] tracking-tighter md:text-3xl font-bold ">Apparel made for your <br />
                      everyday life</h1>
                  <p className=" text-[12px] md:text-sm font-normal text-gray-800 tracking-tighter">Discover High quality and comfortable clothing that effortlessly blends fashion and function, Designed to make you look and feel good everyday</p>
                  <div>
                      <Link to="/collections/all" className="bg-black text-[12px] md:text-lg text-white px-2 py-1 rounded-lg hover:bg-gray-800 ">Shop Now</Link>
                  </div>
                  
              </div>
              <div className="w-full overflow-hidden h-1/2 md:h-auto md:w-1/2  ">
                  <img
                      className="h-full w-full object-cover rounded-lg "
                      src="https://images.unsplash.com/photo-1640746942093-cec8e647596d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sbGVjdGlvbiUyMG9mJTIwY2xvdGhzfGVufDB8fDB8fHww" alt="" />
              </div>
          </div>
    </div>
  )
}

export default FeaturedCollection