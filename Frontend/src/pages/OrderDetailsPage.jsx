// import React, { useEffect, useState } from 'react'
// import { useParams, Link } from "react-router-dom"

// const OrderDetailsPage = () => {
//     const { id } = useParams()
//     const [orderDetails] = useState({
//         _id: id,
//         createdAt: new Date(),
//         isPaid: true,
//         isDelivered: true,
//         paymentMethod: "PayPal",
//         shippingMethod: "Standard",
//         shippingAddress: { city: "New York", country: "USA" },
//         orderItems: [
//             {
//                 productId: "1",
//                 name: "Jacket",
//                 price: 120,
//                 quantity: 1,
//                 image: "https://picsum.photos/150?random=1"

//             },
//             {
//                 productId: "2",
//                 name: "Jeans",
//                 price: 150,
//                 quantity: 2,
//                 image: "https://picsum.photos/150?random=2"

//             }
//         ]
//     })

//     useEffect(() => {
//         // Mock data initialized in state
//     }, [id])
//     return (
//         <div className="max-w-7xl mx-auto p-4 sm:p-6 ">
//             <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>
//             {!orderDetails ? (
//                 <p> No Order detail's found</p>
//             ) : (
//                 <div className="p-4 sm:p-6 rounded-lg border ">
//                     <div className="flex flex-col sm:flex-row justify-between mb-4">
//                         <div>
//                             <h3 className="text-lg md:text-xl font-semibold">Order Id: #{orderDetails._id}</h3>
//                             <p className="text-gray-700">{new Date(orderDetails.createdAt).toLocaleDateString()}</p>
//                         </div>
//                         <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0 ">
//                             <span className={`${orderDetails.isPaid ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"} px-3 py-1 rounded-full text-sm font-medium mb-2`}>{orderDetails.isPaid ? "Approved" : "Pending"}</span>
//                             <span className={`${orderDetails.isDelivered ? "bg-green-200 text-green-700" : "bg-yellow-200 text-yellow-700"} px-3 py-1 rounded-full text-sm font-medium mb-2`}>{orderDetails.isDelivered ? "Delivered" : "Delivery Pending"}</span>
//                         </div>
//                     </div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
//                         <div>
//                             <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
//                             <p className="">Payment method: {orderDetails.paymentMethod}</p>
//                             <p className="">Status: {orderDetails.isPaid ? "Paid" : "Pending"}</p>
//                         </div>
//                         <div>
//                             <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
//                             <p className="">Shipping method: {orderDetails.shippingMethod}</p>
//                             <p className="">Address: {`${orderDetails.shippingAddress.city} , ${orderDetails.shippingAddress.country}`}</p>
//                         </div>
//                     </div>
//                     <div className="overflow-x-auto ">
//                         <h4 className="text-lg font-semibold mb-4">Products</h4>
//                         <table className="min-w-full text-gray-700 mb-4 text-center ">
//                             <thead className="bg-gray-100 ">
//                                 <tr>
//                                     <th className="py-2 px-4  ">Image</th>
//                                     <th className="py-2 px-4">Name</th>
//                                     <th className="py-2 px-4">Unit Price</th>
//                                     <th className="py-2 px-4">Quantity</th>
//                                     <th className="py-2 px-4">Total</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="">
//                                 {orderDetails.orderItems.map((items) => (
//                                     <tr key={items.productId} className="border-b">
//                                         <td className="py-2 px-4 flex items-center">
//                                             <img src={items.image} alt={items.name} className="h-12 w-12 object-cover rounded-lg mr-4" />
//                                         </td>
//                                         <td><Link to={`/product/${items.productId}`} className="text-blue-700 hover:underline">{items.name}</Link></td>
//                                         <td className="py-2 px-4">${items.price}</td>
//                                         <td className="py-2 px-4">${items.quantity}</td>
//                                         <td className="py-2 px-4">${items.price * items.quantity}</td>


//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                     <Link to={"/my-orders"} className="text-blue-700 hover:underline">Back to my Orders</Link>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default OrderDetailsPage

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchOrderDetails } from "../redux/Slices/orderSlice";

const OrderDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { orderDetails, loading, error } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchOrderDetails(id));
    }, [dispatch, id]);

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>

            {!orderDetails ? (
                <p>No order details found.</p>
            ) : (
                <div className="p-4 sm:p-6 rounded-lg border">
                    {/* Order Header Info */}
                    <div className="flex flex-col sm:flex-row justify-between mb-8">
                        <div>
                            <h3 className="text-lg md:text-xl font-semibold">
                                Order ID: #{orderDetails._id}
                            </h3>
                            <p className="text-gray-500">
                                {new Date(orderDetails.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
                            {/* Payment Status Badge */}
                            <span
                                className={`${orderDetails.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                    } px-3 py-1 rounded-full text-sm mb-2 font-medium`}
                            >
                                {orderDetails.isPaid ? "Approved" : "Pending"}
                            </span>
                            {/* Delivery Status Badge */}
                            <span
                                className={`${orderDetails.isDelivered ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                                    } px-3 py-1 rounded-full text-sm font-medium`}
                            >
                                {orderDetails.isDelivered ? "Delivered" : "Pending"}
                            </span>
                        </div>
                    </div>

                    {/* Customer & Shipping Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
                            <p>Payment Method: {orderDetails.paymentMethod}</p>
                            <p>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
                            <p>Shipping Method: Standard</p>
                            <p>Address: {orderDetails.shippingAddress.address}</p>
                            <p>{orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.country}</p>
                        </div>
                    </div>

                    {/* Product List Table */}
                    <div className="overflow-x-auto">
                        <h4 className="text-lg font-semibold mb-4">Products</h4>
                        <table className="min-w-full text-gray-600 mb-4">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-2 px-4 text-left">Name</th>
                                    <th className="py-2 px-4 text-left">Unit Price</th>
                                    <th className="py-2 px-4 text-left">Quantity</th>
                                    <th className="py-2 px-4 text-left">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetails.orderItems.map((item) => (
                                    <tr key={item.productID} className="border-b">
                                        <td className="py-2 px-4 flex items-center">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-12 h-12 object-cover rounded-lg mr-4"
                                            />
                                            <Link
                                                to={`/product/${item.productID}`}
                                                className="text-blue-500 hover:underline"
                                            >
                                                {item.name}
                                            </Link>
                                        </td>
                                        <td className="py-2 px-4">${item.price}</td>
                                        <td className="py-2 px-4">{item.quantity}</td>
                                        <td className="py-2 px-4">${item.price * item.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Back Navigation */}
                    <Link to="/my-orders" className="text-blue-500 hover:underline">
                        Back to My Orders
                    </Link>
                </div>
            )}
        </div>
    );
};

export default OrderDetailsPage;