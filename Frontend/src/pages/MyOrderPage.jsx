// import React, { useEffect, useState } from 'react'
// import { useNavigate } from "react-router-dom"

// const MyOrderPage = () => {
//     const [orders, setOrders] = useState("")
//     const navigate = useNavigate()
//     useEffect(() => {

//         setTimeout(() => {
//             const mockOrders = [
//                 {
//                     _id: "12345",
//                     createdAt: new Date(),
//                     shippingAddress: { city: "New York", country: "USA" },
//                     orderItems: [
//                         {
//                             name: "product1",
//                             image: "https://picsum.photos/500/500?random=1"
//                         }
//                     ],
//                     totalPrice: 100,
//                     isPaid: true
//                 },

//                 {
//                     _id: "34567",
//                     createdAt: new Date(),
//                     shippingAddress: { city: "New York", country: "USA" },
//                     orderItems: [
//                         {
//                             name: "product1",
//                             image: "https://picsum.photos/500/500?random=1"
//                         }
//                     ],
//                     totalPrice: 100,
//                     isPaid: false
//                 }

//             ]; setOrders(mockOrders)

//         },1000 );
//     },[])
//     const handleRowClick = (orderId) => {
//         navigate(`/order/${orderId}`)
//     }
//   return (
//       <div className="max-w-7xl mx-auto p-4 sm:p-6">
//           <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
//           <div className="relative shadow-md sm:rounded-lg overflow-hidden">
//               <table className="min-w-full text-left text-gray-500">
//                   <thead className="bg-gray-100 text-xs uppercase text-gray-700">
//                       <tr>
//                       <td className="py-2 px-4 sm:py-3">Image</td>
//                       <td className="py-2 px-4 sm:py-3">Order Id</td>
//                       <td className="py-2 px-4 sm:py-3">Created</td>
//                       <td className="py-2 px-4 sm:py-3">Shipping Address</td>
//                       <td className="py-2 px-4 sm:py-3">Items</td>
//                       <td className="py-2 px-4 sm:py-3">Price</td>
//                           <td className="py-2 px-4 sm:py-3">Status</td>
//                       </tr>
//                   </thead>
//                   <tbody>
//                       {orders.length > 0 ? (orders.map((order) => (
//                           <tr key={order._id} onClick={()=> handleRowClick(order._id)} className="border-b border-gray-200 cursor-pointer">
//                               <td className="py-2 px-2 sm:py-4 sm:px-4">
//                                   <img src={order.orderItems[0].image} alt={order.orderItems[0].name}
//                                   className="w-10 h-10 sm:h-12 sm:w-12 object-cover rouded-lg"
//                                   />
//                               </td>
//                               <td className="py-2 px-2 sm:py-4 sm:px-4 text-gray-900">#{order._id}</td>
//                               <td className="py-2 px-2 sm:py-4 sm:px-4">{new Date(order.createdAt).toLocaleDateString()}{"  " }{ new Date(order.createdAt).toLocaleTimeString()} </td>
//                               <td className="py-2 px-2 sm:py-4 sm:px-4">{order.shippingAddress.city}{"-"}{order.shippingAddress.country} </td>
//                               <td className="py-2 px-2 sm:py-4 sm:px-4" >{order.orderItems[0].name}</td>
//                               <td className="py-2 px-2 sm:py-4 sm:px-4">${order.totalPrice} </td>
//                               <td className="py-2 px-2 sm:py-4 sm:px-4">
//                                   <span className={`px-2 py-1 rounded-lg ${order.isPaid ? "bg-green-200 text-green-700":"bg-red-200 text-red-700"}`}>{order.isPaid ? "Paid" : "Pending"}</span></td>
//                           </tr>
//                       ))) : (
//                               <tr>
//                                   <td colSpan={7} className="px-4 py-4 text-center text-gray-700">You have no orders</td>
//                               </tr>
//                       )}
//                   </tbody>
//               </table>
//           </div>

//     </div>
//   )
// }

// export default MyOrderPage

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../redux/Slices/orderSlice";

const MyOrderPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Access orders, loading, and error states from the orders slice
    const { orders, loading, error } = useSelector((state) => state.orders);

    useEffect(() => {
        // Fetch all orders for the currently authenticated user
        dispatch(fetchUserOrders());
    }, [dispatch]);

    const handleRowClick = (orderId) => {
        // Navigate to the specific order details page
        navigate(`/order/${orderId}`);
    };

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
            <div className="relative shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full text-left text-gray-500">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                        <tr>
                            <th className="py-2 px-4">Image</th>
                            <th className="py-2 px-4">Order ID</th>
                            <th className="py-2 px-4">Created</th>
                            <th className="py-2 px-4">Shipping Address</th>
                            <th className="py-2 px-4">Items</th>
                            <th className="py-2 px-4">Price</th>
                            <th className="py-2 px-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.length > 0 ? (
                            orders.map((order) => (
                                <tr
                                    key={order._id}
                                    onClick={() => handleRowClick(order._id)}
                                    className="border-b hover:bg-gray-50 cursor-pointer"
                                >
                                    <td className="py-2 px-4">
                                        <img
                                            src={order.orderItems[0].image}
                                            alt={order.orderItems[0].name}
                                            className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                                        />
                                    </td>
                                    <td className="py-2 px-4 font-medium text-gray-900 whitespace-nowrap">
                                        #{order._id}
                                    </td>
                                    <td className="py-2 px-4">
                                        {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}
                                    </td>
                                    <td className="py-2 px-4">
                                        {order.shippingAddress ? `${order.shippingAddress.city}, ${order.shippingAddress.country}` : "N/A"}
                                    </td>
                                    <td className="py-2 px-4">{order.orderItems.length}</td>
                                    <td className="py-2 px-4">${order.totalPrice.toFixed(2)}</td>
                                    <td className="py-2 px-4">
                                        <span
                                            className={`${order.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                                } px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}
                                        >
                                            {order.isPaid ? "Paid" : "Pending"}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="py-4 text-center text-gray-500">
                                    You have no orders.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrderPage;