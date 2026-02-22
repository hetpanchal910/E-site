// import React, { useState } from 'react'

// import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { fetchProductsByFilters, setFilters } from "../../redux/Slices/productsSlice";

// const Searchbar = () => {
//     const [searchTerm, setsearchTerm] = useState("")
//     const [isOpen, setIsOpen] = useState(false)
//     const [search, setSearch] = useState("")
//     const dispatch = useDispatch()
//     const navigate = useNavigate()

//     const searchToggle = () => {
//         setIsOpen(!isOpen)
//     }
    

// //     const submit = (e) => {
// //         e.preventDefault()
// //         dispatch(setFilters({ search: searchTerm }))
// //         dispatch(fetchProductsByFilters({ search: searchTerm }))
// //         navigate(`/collections/all?search=${searchTerm}`)
// //         setisOpen(false)
// //         setsearch("")
        
//     //    }
//     const submit = (e) => {
//         e.preventDefault();

//         if (!search.trim()) return; // prevent empty search

//         dispatch(setFilters({ search }));
//         dispatch(fetchProductsByFilters({ search }));
//         navigate(`/collections/all?search=${encodeURIComponent(search)}`);

//         setIsOpen(false);
//         setSearch("");
//     };

//   return (
//       <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50":"w-auto"}`}>
//           {isOpen ? (<form
//               onSubmit={submit}
//               className="relative flex items-center justify-center w-full" >
//               <div className="relative w-1/2">
//                   {/* Input */}
//                   <input type="text" placeholder="search" value={search}
//                       onChange={(e) => {
//                         setsearch(e.target.value)
//                     }}
//                       className=" bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-ln  foucs:outline-none placeholder:text-gray-700 w-full" />
//                   {/* search */}
//                   <button type="submit"
                     
//                       className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700 ">
//                       <HiMagnifyingGlass className="h-5 w-5 hover:text-black" />
//                   </button>
                
//               </div>
//               {/* close */}
//               <button className="absolute right-4 top-1/2 transform -translate-y-1/2 "
//               onClick={searchToggle}
//               >
//                   <HiMiniXMark className="h-6 w-6  hover:text-black" />
//               </button>
//           </form>)
//               :
//               (<button onClick={searchToggle} className="text-gray-700">
//                   <HiMagnifyingGlass className="h-4 w-4 md:h-6 md:w-6  text-xs cursor-pointer hover:text-black" />
//           </button> )}
//       </div>
//     )
  
// }

// export default Searchbar

import React, { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProductsByFilters, setFilters } from "../../redux/Slices/productsSlice";

const Searchbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchToggle = () => {
        setIsOpen((prev) => !prev);
    };

    const submit = (e) => {
        e.preventDefault();

        if (!search.trim()) return; // prevent empty search

        dispatch(setFilters({ search }));
        dispatch(fetchProductsByFilters({ search }));
        navigate(`/collections/all?search=${encodeURIComponent(search)}`);

        setIsOpen(false);
        setSearch("");
    };

    return (
        <div
            className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen
                    ? "absolute top-0 left-0 w-full bg-white h-24 z-50"
                    : "w-auto"
                }`}
        >
            {isOpen ? (
                <form
                    onSubmit={submit}
                    className="relative flex items-center justify-center w-full"
                >
                    <div className="relative w-1/2">
                        <input
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none placeholder:text-gray-700 w-full"
                            autoFocus
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700"
                        >
                            <HiMagnifyingGlass className="h-5 w-5 hover:text-black" />
                        </button>
                    </div>

                    <button
                        type="button"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                        onClick={searchToggle}
                    >
                        <HiMiniXMark className="h-6 w-6 hover:text-black" />
                    </button>
                </form>
            ) : (
                <button onClick={searchToggle} className="text-gray-700">
                    <HiMagnifyingGlass className="h-4 w-4 md:h-6 md:w-6 cursor-pointer hover:text-black" />
                </button>
            )}
        </div>
    );
};

export default Searchbar;
