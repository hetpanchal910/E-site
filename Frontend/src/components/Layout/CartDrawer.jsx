import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import CartContents from "../cart/CartContents";

const CartDrawer = ({ drawerOpen, toggleDrawer }) => {
    const navigate = useNavigate();
    const { user, guestId } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);

    const handleCheckout = () => {
        toggleDrawer(); // Close drawer
        if (!user) {
            navigate("/login?redirect=checkout");
        } else {
            navigate("/checkout");
        }
    };

    return (
        <div
            className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-120 h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${drawerOpen ? "translate-x-0" : "translate-x-full"
                }`}
        >
            {/* Close Button */}
            <div className="flex justify-end p-4">
                <button onClick={toggleDrawer}>
                    <IoMdClose className="h-6 w-6 text-gray-600" />
                </button>
            </div>

            {/* Cart Content Area */}
            <div className="grow p-4 overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
                {cart && cart.products.length > 0 ? (
                    <CartContents
                        cart={cart}
                        userId={user?._id}
                        guestId={guestId}
                    />
                ) : (
                    <p className="text-center text-gray-500">Your cart is empty</p>
                )}
            </div>

            {/* Checkout Button Section */}
            {cart && cart.products.length > 0 && (
                <div className="p-4 bg-white sticky bottom-0 border-t">
                    <button
                        onClick={handleCheckout}
                        className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                    >
                        CHECKOUT
                    </button>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                        Shipping, taxes, and discounts calculated at checkout.
                    </p>
                </div>
            )}
        </div>
    );
};

export default CartDrawer;