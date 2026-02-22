import React from 'react'
import { IoLogoInstagram } from "react-icons/io"
import { RiTwitterXFill } from "react-icons/ri"
import { TbBrandMeta } from "react-icons/tb"
import { FiPhoneCall } from "react-icons/fi"
import {Link} from "react-router-dom"
const Footer = () => {
  return (
      <footer className="border-t py-12 px-10 md:px-20">
          <div className="mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-2 md:px-4 ">
              {/* newsletter */}
              <div>
                  <h3 className="text-[18px] md:text-lg font-medium text-black mb-4 ">Newsletter</h3>
                  <p className="mb-6 font-medium text-[12px] md:text-sm text-gray-700">Be the first to hear about new products, exclusive events and online offers.</p>
                  <p className="mb-6 font-medium text-[12px] md:text-sm text-gray-600">Sign up and get 10% off on your first order.</p>
                  {/* Newsletter form */}
                  <form className="flex " >
                      <input type="email" placeholder="Enter your email" className="text-[12px] md:text-normal p-3 w-full border-l border-t border-b text-sm border-cyan-900 rounded-l-md focus:outline-none focus:ring-2 focuse:ring-cyan-900 transition-all" required />
                      <button type="submit" className="bg-cyan-900 text-white rounded-r-md text-[12px] px-1 md:text-normal md:px-2 hover:bg-cyan-700">Subscribe</button>
                 </form>
              </div>
              {/* shop */}
              <div>
                  <h1 className="text-[18px] sm:text-lg font-medium text-black mb-4">Shop</h1> 
                  <ul className="space-y-2 text-gray-700 text-sm font-medium">
                      <li>
                          <Link to="#" className="hover:text-gray-500 text-[12px] sm:text-sm transition-colors" >Men's Top-wear</Link>
                      </li>
                      <li>
                          <Link to="#" className="hover:text-gray-500 text-[12px] sm:text-sm transition-colors" >Women's Bottom-wear</Link>
                      </li>
                      <li>
                          <Link to="#" className="hover:text-gray-500 text-[12px] sm:text-sm transition-colors" >Men's Top-wear</Link>
                      </li>
                      <li>
                          <Link to="#" className="hover:text-gray-500 text-[12px] sm:text-sm transition-colors" >Women's Bottom-wear</Link>
                      </li>
                  </ul>
              </div>
              {/* support */}
              <div>
                  <h1 className="text-lg font-medium text-black mb-4">Support</h1>
                  <ul className="space-y-2 text-gray-700 text-sm font-medium">
                      <li>
                          <Link to="#" className="hover:text-gray-500 text-[12px] sm:text-sm transition-colors" >Contact-us</Link>
                      </li>
                      <li>
                          <Link to="#" className="hover:text-gray-500 text-[12px] sm:text-sm transition-colors" >About-us</Link>
                      </li>
                      <li>
                          <Link to="#" className="hover:text-gray-500 text-[12px] sm:text-sm transition-colors" >FAQ's</Link>
                      </li>
                      <li>
                          <Link to="#" className="hover:text-gray-500 text-[12px] sm:text-sm transition-colors" >Features</Link>
                      </li>
                  </ul>
              </div>
              {/* Follow us */}
              <div>
                  <h3 className="text-black text-lg font-medium mb-4">Follow Us</h3>
                  <div className="flex items-center space-x-4 mb-6">
                      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-500">
                      <TbBrandMeta className="h-5 w-5" />
                      </a>
                      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-500">
                          <IoLogoInstagram className="h-5 w-5" />
                      </a>
                      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-500">
                          <RiTwitterXFill className="h-4 w-4" />
                      </a>

                  </div>
                  <p className="text-gray-800 text-[14px] sm:text-sm font-medium">Call us</p>
                  <p className="text-[14px] sm:text-sm text-gray-700 hover:text-gray-500"><FiPhoneCall className="inline-block mr-2 text-sm" /> +91 8780404879 </p>
              </div>
              
        </div>
          <div className="border-t mx-auto mt-12 px-0  md:px-4 border-cyan-900 pt-6 flex items-center justify-center">
              <p className=" text-[12px] md:text-sm text-gray-700">
                  © Copyright, all rights reserved
              </p>
          </div>
    </footer>
  )
}

export default Footer