import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from "react-icons/fa";
import FilterSideBar from "../components/Products/FilterSideBar";
import SortProducts from "../components/Products/SortProducts";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { fetchProductsByFilters } from "../redux/Slices/productsSlice";
const CollectionPage = () => {
    const { collection } = useParams()
    const [searchParams] = useSearchParams()
    const { products, loading, error } = useSelector((state) =>
        state.products
    )
    const dispatch = useDispatch()

    const sidebarRef = useRef(null)
    const buttonRef = useRef(null)
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)



    useEffect(() => {
        const queryParams = Object.fromEntries([...searchParams])
        dispatch(fetchProductsByFilters({ collection, ...queryParams }))
    }, [dispatch, collection, searchParams])

    const toggleSidebar = () => {
        setIsSideBarOpen(!isSideBarOpen)
    }

    useEffect(() => {
        if (!isSideBarOpen) return;

        const handleClickOutside = (e) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(e.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(e.target)
            ) {
                setIsSideBarOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSideBarOpen]);





    return (
        <div className=" flex flex-col lg:flex-row">
            {/* Mobile filter btn */}
            <button ref={buttonRef} onClick={toggleSidebar} className="lg:hidden flex p-2 justify-center items-center">
                <FaFilter className="mr-2" />Filters
            </button>

            <div ref={sidebarRef} className={`${isSideBarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 w-64 lg:w-100  bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0 `}>
                <FilterSideBar />
            </div>

            <div className="grow p-4 items-center">
                <h2 className="text-2xl  uppercase mb-4">All collection</h2>

                {/* sort products */}
                <SortProducts />

                {/* Products grid */}
                <ProductGrid products={products} loading={loading} error={error} />
            </div>


        </div>
    )
}

export default CollectionPage

