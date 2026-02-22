import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminProducts } from "../redux/Slices/adminProductSlice";
import { fetchAllOrders } from "../redux/Slices/adminOrderSlice";
import { Link } from "react-router-dom";

const AdminHomePage = () => {
    const dispatch = useDispatch();

    // Get products from adminProductSlice
    const { products, loading: productsLoading, error: productsError } = useSelector(
        (state) => state.adminProducts
    );

    // Get orders and stats from adminOrderSlice
    const { orders, totalOrders, totalSales, loading: ordersLoading, error: ordersError } = useSelector(
        (state) => state.adminOrders
    );

    useEffect(() => {
        // Fetch dashboard data on component mount
        dispatch(fetchAdminProducts());
        dispatch(fetchAllOrders());
    }, [dispatch]);

    // Loading state handling
    if (productsLoading || ordersLoading) return <p>Loading dashboard...</p>;

    // Error handling
    if (productsError) return <p className="text-red-500">Error fetching products: {productsError}</p>;
    if (ordersError) return <p className="text-red-500">Error fetching orders: {ordersError}</p>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            {/* Stats Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <div className="p-4 shadow rounded-lg bg-white border">
                    <h2 className="text-xl font-semibold">Revenue</h2>
                    <p className="text-2xl">${totalSales.toFixed(2)}</p>
                </div>
                <div className="p-4 shadow rounded-lg bg-white border">
                    <h2 className="text-xl font-semibold">Total Orders</h2>
                    <p className="text-2xl">{totalOrders}</p>
                    <Link to="/admin/orders" className="text-blue-500 hover:underline text-sm">
                        Manage Orders
                    </Link>
                </div>
                <div className="p-4 shadow rounded-lg bg-white border">
                    <h2 className="text-xl font-semibold">Total Products</h2>
                    <p className="text-2xl">{products.length}</p>
                    <Link to="/admin/products" className="text-blue-500 hover:underline text-sm">
                        Manage Products
                    </Link>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="mt-6">
                <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-gray-500 border">
                        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                            <tr>
                                <th className="py-3 px-4">Order ID</th>
                                <th className="py-3 px-4">User</th>
                                <th className="py-3 px-4">Total Price</th>
                                <th className="py-3 px-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders && orders.length > 0 ? (
                                orders.slice(0, 5).map((order) => (
                                    <tr key={order._id} className="border-b hover:bg-gray-50 cursor-pointer">
                                        <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap">
                                            #{order._id}
                                        </td>
                                        <td className="py-4 px-4">{order.user?.name || "Guest"}</td>
                                        <td className="py-4 px-4">${order.totalPrice.toFixed(2)}</td>
                                        <td className="py-4 px-4">{order.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-4 text-center text-gray-500">
                                        No recent orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;