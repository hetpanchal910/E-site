import React from 'react'
import Topbar from "../Layout/Topbar"
import Navbar from "../Layout/Navbar"

const Header = () => {
  return (
      <>
      <header className="border-b w-full border-gray-700">
        {/* Topbar  */}
        <Topbar />
        {/* Navbar  */}
        <Navbar />
        {/* Cart drawer  */}
        
     </header>
      </>
  )
}

export default Header