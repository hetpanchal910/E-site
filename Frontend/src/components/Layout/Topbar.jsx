import React from 'react'
import { TbBrandMeta } from "react-icons/tb"
import { IoLogoInstagram } from "react-icons/io"
import { RiTwitterXLine } from "react-icons/ri"

const Topbar = () => {
  return (
      <div className="bg-cyan-900 text-white ">
          {/* Leftside */}
          <div className="container mx-auto flex justify-between items-center">
              <div className="hidden md:flex p-2 gap-2 items-center lg:pl-10">
                  <a href="#" className="hover:text-gray-300" >
                      <TbBrandMeta className="h-5 w-5" />
                  </a>
                  <a href="#" className="hover:text-gray-300" >
                      <IoLogoInstagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="hover:text-gray-300" >
                      <RiTwitterXLine className="h-4 w-4" />
                  </a>
                 
              </div>
              {/* Mid */}
              <div className="text-[13px] tracking-tighter md:text-lg text-center grow " >
                  <h3 className="">Global Style, Delivered. Premium worldwide shipping at your doorstep.</h3>
              </div>
              {/* Rightside */}
              <div className="hidden md:block hover:text-gray-300 lg:pr-10">
                  <a href="#">Ubiquity</a>
              </div>
              

          </div>
        



    </div>
  )
}

export default Topbar