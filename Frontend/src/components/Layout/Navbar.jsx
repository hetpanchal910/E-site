import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from "../Common/Searchbar";
import CartDrawer from "../Layout/CartDrawer";

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [navDrawerOpen, setNavDrawerOpen] = useState(false);

   
    const { cart } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    // Calculate total items in cart 
    const cartItemCount = cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

    const toggleNavDrawer = () => { setNavDrawerOpen(!navDrawerOpen); }
    const toggleCartDrawer = () => { setDrawerOpen(!drawerOpen); }

    return (
        <>
            <nav className="container mx-auto flex items-center justify-between py-4 px-6">
                {/* Logo */}
                <div>
                    <Link to="/" className="text-2xl font-medium">
                        E-Site
                    </Link>
                </div>


                <div className="hidden md:flex space-x-6 text-sm font-medium uppercase text-gray-700">
                    <Link to="/collections/all?gender=Men" className="hover:text-black">Men</Link>
                    <Link to="/collections/all?gender=Women" className="hover:text-black">Women</Link>
                    <Link to="/collections/all?category=Topwear" className="hover:text-black">Topwear</Link>
                    <Link to="/collections/all?category=Bottomwear" className="hover:text-black">Bottomwear</Link>
                </div>


                <div className="flex items-center space-x-4">
                    {user && user.role === "admin" && (
                        <Link to="/admin" className="block bg-black px-2 text-sm text-white rounded">
                        Admin
                        </Link>
                    )}


                   

                    <Link to="/profile" className="hover:text-black">
                        <HiOutlineUser className="h-6 w-6 text-gray-700" />
                    </Link>


                    <button onClick={toggleCartDrawer} className="relative hover:text-black">
                        <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-1 bg-cyan-900 text-white text-[10px] rounded-full px-2 py-0.5">
                                {cartItemCount}
                            </span>
                        )}
                    </button>


                    <div className="overflow-hidden">
                        <SearchBar />
                    </div>


                    <button onClick={toggleNavDrawer} className="md:hidden">
                        <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
                    </button>
                </div>
            </nav>

            {/* Cart Drawer */}
            <CartDrawer drawerOpen={drawerOpen} toggleDrawer={toggleCartDrawer} />


            <div
                className={`fixed top-0 left-0 w-3/4 sm:w-1/2 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex justify-end p-4">
                    <button onClick={toggleNavDrawer}>✕</button>
                </div>
                <div className="p-4 uppercase font-semibold text-xl border-b mb-4">Menu</div>
                <nav className="flex flex-col space-y-4 p-4 text-gray-600">
                    <Link to="/collections/all?gender=Men" onClick={toggleNavDrawer}>Men</Link>
                    <Link to="/collections/all?gender=Women" onClick={toggleNavDrawer}>Women</Link>
                    <Link to="/collections/all?category=Topwear" onClick={toggleNavDrawer}>Topwear</Link>
                    <Link to="/collections/all?category=Bottomwear" onClick={toggleNavDrawer}>Bottomwear</Link>
                </nav>
            </div>
        </>
    );
};

export default Navbar;