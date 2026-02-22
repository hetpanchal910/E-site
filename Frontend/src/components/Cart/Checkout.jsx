
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCheckout } from "../../redux/Slices/checkoutSlice";
import PayPalButton from "./PayPalButton";
import axios from "axios";

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cart, loading: cartLoading, error: cartError } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    const { checkout, loading: checkoutLoading, error: checkoutError } = useSelector((state) => state.checkout);

    const [checkoutId, setCheckoutId] = useState(null);
    const [shippingAddress, setShippingAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
    });

    //  cart is not empty before allowing checkout
    useEffect(() => {
        if (!cart || cart.products.length === 0) {
            navigate("/");
        }
    }, [cart, navigate]);

    const handleCreateCheckout = async (e) => {
        e.preventDefault();
        console.log("Checkout.jsx - User from Redux:", user);
        console.log("Checkout.jsx - Cart from Redux:", cart);

        if (!user) {
            alert("Please log in to continue");
            navigate("/login");
            return;
        }
        if (cart && cart.products.length > 0) {
            const res = await dispatch(
                createCheckout({
                    checkoutItems: cart.products,
                    shippingAddress,
                    paymentMethod: "PayPal",
                    totalPrice: cart.totalPrice,
                })
            );
            if (res.payload && res.payload._id) {
                setCheckoutId(res.payload._id);
            }
        }
    };

    const handlePaymentSuccess = async (details) => {
        try {
            // Mark checkout as paid
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
                { paymentStatus: "paid", paymentDetails: details },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
                }
            );

            if (response.status === 200) {
                // Finalize order
                await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
                    {},
                    { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
                );
                navigate("/order-confirmation");
            }
        } catch (error) {
            console.error("Payment finalization failed:", error);
            if (error.response && error.response.status === 401) {
                alert("Your session has expired. Please log in again.");
                localStorage.removeItem("userToken");
                localStorage.removeItem("user");
                window.location.href = "/login";
            }
        }
    };

    if (cartLoading) return <p>Loading cart...</p>;
    if (cartError) return <p>Error: {cartError}</p>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
            {/* Left: Shipping Form */}
            <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl uppercase mb-6">Checkout</h2>
                <form onSubmit={handleCreateCheckout}>
                    <h3 className="text-lg mb-4">Contact Details</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={user ? user.email : ""}
                            className="w-full p-2 border rounded"
                            disabled
                        />
                    </div>

                    <h3 className="text-lg mb-4">Delivery</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-gray-700">First Name</label>
                            <input
                                type="text"
                                value={shippingAddress.firstName}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Last Name</label>
                            <input
                                type="text"
                                value={shippingAddress.lastName}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Address</label>
                        <input
                            type="text"
                            value={shippingAddress.address}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-gray-700">City</label>
                            <input
                                type="text"
                                value={shippingAddress.city}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Postal Code</label>
                            <input
                                type="text"
                                value={shippingAddress.postalCode}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Country</label>
                        <input
                            type="text"
                            value={shippingAddress.country}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Phone</label>
                        <input
                            type="tel"
                            value={shippingAddress.phone}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div className="mt-6">
                        {!checkoutId ? (
                            <button type="submit" className="w-full bg-black text-white py-3 rounded">
                                {checkoutLoading ? "Processing..." : "Continue to Payment"}
                            </button>
                        ) : (
                            <div>
                                <h3 className="text-lg mb-4">Pay with PayPal</h3>
                                {console.log("Rendering PayPalButton with checkoutId:", checkoutId, "and amount:", cart.totalPrice)}
                                <PayPalButton
                                    amount={cart.totalPrice}
                                    onSuccess={handlePaymentSuccess}
                                    onError={(err) => {
                                        console.error("PayPal Error in Checkout.jsx:", err);
                                        alert("Payment Error: " + err);
                                    }}
                                />

                                {/* Development Bypass Button */}
                                <button
                                    onClick={() => handlePaymentSuccess({ id: "MOCK_PAYMENT_" + Date.now(), status: "COMPLETED" })}
                                    className="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded border border-gray-300 hover:bg-gray-300 transition-colors"
                                >
                                    Dev: Simulate Success (Bypass PayPal)
                                </button>
                            </div>
                        )}
                    </div>
                    {checkoutError && <p className="text-red-500 mt-4 text-center">{checkoutError}</p>}
                </form>
            </div>

            {/* Right: Order Summary */}
            <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg mb-4">Order Summary</h3>
                <div className="border-t py-4 mb-4">
                    {cart.products.map((item, index) => (
                        <div key={index} className="flex items-start justify-between py-2 border-b">
                            <div className="flex items-start">
                                <img src={item.image} alt={item.name} className="w-20 h-24 object-cover mr-4" />
                                <div>
                                    <h3 className="text-md">{item.name}</h3>
                                    <p className="text-sm text-gray-500">Size: {item.size} | Color: {item.color}</p>
                                </div>
                            </div>
                            <p className="text-md">${item.price * item.quantity}</p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between text-lg mb-4">
                    <span>Subtotal</span>
                    <span>${cart.totalPrice}</span>
                </div>
                <div className="flex justify-between text-lg mb-4">
                    <span>Shipping</span>
                    <span>Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-4">
                    <span>Total</span>
                    <span>${cart.totalPrice}</span>
                </div>
            </div>
        </div>
    );
};

export default Checkout;