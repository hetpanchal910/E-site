import React from 'react'
import {Link} from "react-router-dom"
const GenderCollection = () => {
    return (
        <section className="py-16 px-4">
            <div className="container flex flex-col mx-auto md:flex-row gap-8">
                {/* Womens collextion */}
                <div className="relative flex-1">
                    <img src="https://images.unsplash.com/photo-1598554793905-075f7b355cd9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2hpdGUlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D" alt="" className="w-full h-175 object-cover" />
                    <div className="absolute bottom-8 left-8 bg-white p-4">
                        
                        <h2 className="text-2xl font-bold mb-3 text-black">
                            Women's collection
                        </h2>
                        <Link to="/Collections/all?gender=Women" className="text-cyan-800 underline">
                            Shop Now
                        </Link>
                        </div>
                </div>



                {/* Mens collection */}
                <div className="relative flex-1">
                    <img src="https://images.unsplash.com/photo-1592728036073-d0ae31a18fdc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHdoaXRlJTIwc2hpcnR8ZW58MHx8MHx8fDA%3D" alt="" className="w-full h-175 object-cover" />
                    <div className="absolute bottom-8 left-8 bg-white p-4">

                        <h2 className="text-2xl font-bold mb-3 text-black">
                            Men's collection
                        </h2>
                        <Link to="/Collections/all?gender=Men" className="text-cyan-800 underline">
                            Shop Now
                        </Link>
                    </div>
                </div>

                </div>
           
            
         
            
      </section>
    
  )
}

export default GenderCollection