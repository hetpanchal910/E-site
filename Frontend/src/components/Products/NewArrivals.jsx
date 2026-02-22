import axios from "axios"
import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import {Link} from "react-router-dom"

const NewArrivals = () => {

  
   
    const scrollRef = useRef(null)
    const [Arrivals, setArrivals] = useState([])

        const scrollingLeft = () => {
        scrollRef.current.scrollLeft -= 700;
        };

        const scrollingRight = () => {
        scrollRef.current.scrollLeft += 700;
    };
    
    useEffect(() => {
        const newArrivals = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`)
                setArrivals(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        newArrivals()
    },[])
   
   

    
   

   
  return (
      <section className="mb-15">
          <div className="container mx-auto mb-10 text-center relative">
              <h2 className="text-3xl font-bold mb-4 capitalize">Explore new arrivals</h2>
              <p className="text-md text-gray-800 mb-8 px-4">
                  Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.
              </p>
              {/* scrollbuttons */}

              <div className="absolute right-0 -bottom-8.5 flex space-x-2">
                  
                  <button onClick={scrollingLeft} className="p-2 rounded border bg-white text-black">
                      <FiChevronLeft className="text-xl" />
                  </button>
                  <button  onClick={scrollingRight} className="p-2 rounded border bg-white text-black">
                      <FiChevronRight className="text-xl" />
                  </button>
              </div>
          </div> 
              {/* content */}
              <div ref={scrollRef} className="mx-auto overflow-x-scroll space-x-6 flex transition-all scroll-smooth relative">
              {
                  
                  Arrivals.map((product) => (
                    //   <Link to={`/product/${product._id}`} className="block " >
                          <div key={product._id} className="min-w-full  sm:min-w-[50%] lg:min-w-[30%]   relative   ">
                             
                              <img className="object-cover w-full h-125 cursor-grab rounded-lg  "
                                  src={product.images[0]?.url}
                                  alt={product.images[0].altText || product.name }  />
                              <div className="absolute  bottom-0 left-4 right-4  bg-opacity-50 backdrop-blur-md
                              text-white rounded-b-lg">
                                 <Link to={`/product/${product._id}`} className="block " >
                                      <h4 className="font-medium px-6 "> {product.name} </h4>
                                      <p className="mt-1 px-6"> {product.price} </p>
                              </Link>

                              </div>
                              
                  
                          </div>
                          
                          
                      ))
                  }
                  
              </div>
          
             
         
    </section>
  )
}

export default NewArrivals