import React from 'react'
import { FaShippingFast } from "react-icons/fa";
import { RiLoopRightFill } from "react-icons/ri";
import { MdCreditCard } from "react-icons/md";
const FeatureSection = () => {
  return (
      <div className="flex items-between mb-5 justify-center h-auto w-full px-2 md:px-7  lg:px-25 flex-col space-y-5 md:space-y-0 md:flex-row md:items-center md:justify-between  ">
          
          <div className="flex flex-col items-center justify-center">
              <div ><FaShippingFast className="h-6 w-6" /></div>
              <div className="text-lg md:text-lg font-medium tracking-tighter">Free Internation Shipping</div>
              <div  className="text-sm md:text-sm md:font-normal tracking-tighter text-gray-800">on all orders over $100</div>
          </div>

          <div className=" flex flex-col items-center justify-center">
              <div ><RiLoopRightFill className="h-6 w-6" /></div>
              <div className="text-lg md:text-lg font-medium ">45 days return</div>
              <div className="text-sm md:text-sm md:font-normal tracking-tighter text-gray-800">money back gaurantee</div>
          </div>

          <div className=" flex flex-col items-center justify-center">
              <div ><MdCreditCard className="h-6 w-6" /></div>
              <div className="text-lg md:text-lg font-medium ">Secured checkout</div>
              <div className="text-sm md:text-sm md:font-normal tracking-tighter text-gray-800">100% secured checkout</div>
          </div>
    </div>
  )
}

export default FeatureSection