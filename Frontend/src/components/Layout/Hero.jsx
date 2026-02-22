import React from 'react'
import { Link } from "react-router-dom"
const Hero = () => {
  return (
    <section className="relative">
      <img
        className=" h-100  md:h-140 lg:h-140    w-full object-cover "
        src="https://media.istockphoto.com/id/1521934849/photo/fabric-texture.webp?a=1&b=1&s=612x612&w=0&k=20&c=XyGKX59IPvVPm5jH9kPDaTOWcFUIjE4r2BDHtbbRN9I=" alt="E-Site" />

      <div className="absolute flex-col   flex h-full w-full inset-0 items-center justify-center ">
        <h1 className="text-white text-3xl sm:text-4xl md:text-9xl tracking-tighter font-bold uppercase ">global  <br />style, </h1>
        <p className="text-[12px] px-2 sm:text-sm text-center tracking-tighter md:text-lg mb-6 text-white md:mr-25">Destination-Bound. Shop our getaway-ready collection with express worldwide delivery</p>
        <Link to="/collections/all" className="text-[14px] sm:text-sm md:text-xl bg-white text-black border-none px-5 py-2 hover:bg-gray-300 rounded-sm">Shop Now</Link>
      </div>

    </section>
  )
}

export default Hero